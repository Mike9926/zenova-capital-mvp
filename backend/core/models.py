from django.db import models
from django.contrib.auth.models import User

class Security(models.Model):
    symbol = models.CharField(max_length=16, unique=True)
    name = models.CharField(max_length=128)
    sector = models.CharField(max_length=64, blank=True)
    def __str__(self): return self.symbol

class Price(models.Model):
    security = models.ForeignKey(Security, on_delete=models.CASCADE, related_name='prices')
    date = models.DateField()
    close = models.DecimalField(max_digits=16, decimal_places=4)
    volume = models.BigIntegerField(default=0)
    class Meta:
        unique_together = ('security','date')
        ordering = ['-date']

class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=64, default='Default')
    currency = models.CharField(max_length=8, default='MWK')

class Position(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='positions')
    security = models.ForeignKey(Security, on_delete=models.CASCADE)
    def __str__(self): return f"{self.account}-{self.security}"

class Transaction(models.Model):
    BUY, SELL, DIV, FEE, SPLIT = 'BUY','SELL','DIV','FEE','SPLIT'
    TYPES = [(BUY,'BUY'),(SELL,'SELL'),(DIV,'DIVIDEND'),(FEE,'FEE'),(SPLIT,'SPLIT')]
    position = models.ForeignKey(Position, on_delete=models.CASCADE, related_name='transactions')
    ttype = models.CharField(max_length=8, choices=TYPES, default=BUY)
    qty = models.DecimalField(max_digits=16, decimal_places=4, default=0)
    price = models.DecimalField(max_digits=16, decimal_places=4, default=0)
    fees = models.DecimalField(max_digits=16, decimal_places=4, default=0)
    date = models.DateField()
    note = models.TextField(blank=True)

class CorporateAction(models.Model):
    security = models.ForeignKey(Security, on_delete=models.CASCADE)
    ctype = models.CharField(max_length=16)  # DIV, SPLIT, BONUS
    ex_date = models.DateField(null=True, blank=True)
    pay_date = models.DateField(null=True, blank=True)
    ratio = models.DecimalField(max_digits=16, decimal_places=6, null=True, blank=True)
    amount = models.DecimalField(max_digits=16, decimal_places=4, null=True, blank=True)
