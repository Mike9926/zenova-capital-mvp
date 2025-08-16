from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Sum, F
from django.contrib.auth.models import User
from django.utils import timezone
from decimal import Decimal

from .models import Security, Price, Account, Position, Transaction
from .serializers import SecuritySerializer
from .ocr import parse_deal_note
from .price import fetch_latest_prices

@api_view(['GET'])
@permission_classes([AllowAny])
def list_securities(request):
    qs = Security.objects.all().order_by('symbol')
    return Response(SecuritySerializer(qs, many=True).data)

@api_view(['POST'])
@permission_classes([AllowAny])
def upload_deal_note(request):
    f = request.FILES.get('file')
    if not f:
        return Response({'error': 'file required'}, status=400)
    trades = parse_deal_note(f.read())
    return Response({'trades': trades})

@api_view(['POST'])
@permission_classes([AllowAny])
def add_trade(request):
    data = request.data
    # TODO: replace demo auth with real auth (JWT, Session)
    user, _ = User.objects.get_or_create(username='demo')
    account, _ = Account.objects.get_or_create(user=user, name='Default')

    symbol = data.get('symbol')
    try:
        sec = Security.objects.get(symbol=symbol)
    except Security.DoesNotExist:
        return Response({'error': f'Unknown symbol: {symbol}'}, status=400)

    pos, _ = Position.objects.get_or_create(account=account, security=sec)
    t = Transaction.objects.create(
        position=pos,
        ttype=data.get('ttype', 'BUY'),
        qty=Decimal(str(data.get('qty', 0))),
        price=Decimal(str(data.get('price', 0))),
        fees=Decimal(str(data.get('fees', 0))),
        date=data.get('date', str(timezone.now().date())),
        note=data.get('note', '')
    )
    return Response({'id': t.id, 'message': 'trade saved'})

@api_view(['GET'])
@permission_classes([AllowAny])
def portfolio_summary(request):
    user, _ = User.objects.get_or_create(username='demo')
    accounts = Account.objects.filter(user=user)

    positions = []
    total_mv = Decimal('0')
    total_cost = Decimal('0')

    for acc in accounts:
        for pos in acc.positions.select_related('security').all():
            qty_buy = pos.transactions.filter(ttype='BUY').aggregate(s=Sum('qty'))['s'] or Decimal('0')
            qty_sell = pos.transactions.filter(ttype='SELL').aggregate(s=Sum('qty'))['s'] or Decimal('0')
            qty = qty_buy - qty_sell
            if qty <= 0:
                continue

            last_price = pos.security.prices.order_by('-date').first()
            price = last_price.close if last_price else Decimal('0')
            mv = qty * price

            cost_agg = pos.transactions.filter(ttype='BUY').aggregate(s=Sum(F('qty') * F('price')))['s'] or Decimal('0')
            avg_cost = (cost_agg / qty) if qty else Decimal('0')

            positions.append({
                'symbol': pos.security.symbol,
                'qty': float(qty),
                'last_price': float(price),
                'market_value': float(mv),
                'avg_cost': float(avg_cost),
            })
            total_mv += mv
            total_cost += cost_agg

    return Response({
        'total_market_value': float(total_mv),
        'total_cost': float(total_cost),
        'total_unrealized': float(total_mv - total_cost),
        'positions': positions
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def fetch_prices(request):
    rows = fetch_latest_prices()
    inserted = 0
    for r in rows:
        sec, _ = Security.objects.get_or_create(symbol=r['symbol'], defaults={'name': r['symbol']})
        obj, created = Price.objects.update_or_create(
            security=sec, date=r['date'],
            defaults={'close': r['close'], 'volume': r.get('volume', 0)}
        )
        if created:
            inserted += 1
    return Response({'received': len(rows), 'inserted': inserted})
