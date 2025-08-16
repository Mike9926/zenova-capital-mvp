# Replace this stub with your real MSE market data integration later.
import datetime

def fetch_latest_prices():
    """
    Return a list of dicts:
      {'symbol':'NBM','date': date,'close': 3500.00,'volume': 1000}
    """
    today = datetime.date.today()
    # Demo only:
    return [
        {'symbol':'NBM','date': today,'close': 3500.00,'volume': 1000},
        {'symbol':'NBS','date': today,'close': 120.00, 'volume':  500},
        {'symbol':'TNM','date': today,'close':  40.00, 'volume': 2000},
    ]
