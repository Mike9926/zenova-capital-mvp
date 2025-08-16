from django.contrib import admin
from .models import Security, Price, Account, Position, Transaction, CorporateAction

admin.site.register([Security, Price, Account, Position, Transaction, CorporateAction])
