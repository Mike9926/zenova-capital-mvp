from django.core.management.base import BaseCommand
from core.models import Security
import csv

class Command(BaseCommand):
    help = 'Load MSE symbols from CSV with columns: symbol,name,sector'

    def add_arguments(self, parser):
        parser.add_argument('csv_path')

    def handle(self, *args, **opts):
        path = opts['csv_path']
        with open(path, newline='', encoding='utf-8') as f:
            for row in csv.DictReader(f):
                Security.objects.update_or_create(
                    symbol=row['symbol'].strip(),
                    defaults={
                        'name': row.get('name', row['symbol']).strip(),
                        'sector': row.get('sector','').strip()
                    }
                )
        self.stdout.write(self.style.SUCCESS('Loaded symbols'))
