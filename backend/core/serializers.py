from rest_framework import serializers
from .models import Security, Transaction, Position, Account

class SecuritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Security
        fields = ['id','symbol','name','sector']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['id','account','security']

class PortfolioSummarySerializer(serializers.Serializer):
    total_market_value = serializers.DecimalField(max_digits=18, decimal_places=2)
    total_cost = serializers.DecimalField(max_digits=18, decimal_places=2)
    total_unrealized = serializers.DecimalField(max_digits=18, decimal_places=2)
    positions = serializers.ListField()
