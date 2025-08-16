# Minimal OCR parser (images or raw text). PDF handling can be added later.
import pytesseract
from PIL import Image
import io, re

def parse_deal_note(file_bytes: bytes):
    """
    Very simple OCR-based parser that returns a list of trades.
    Expected line pattern: SYMBOL  QTY  PRICE  YYYY-MM-DD
    Example: NBM  100  3500.00  2025-08-01
    """
    text = None
    # Try image path
    try:
        img = Image.open(io.BytesIO(file_bytes))
        text = pytesseract.image_to_string(img)
    except Exception:
        # Fallback: assume it's already text-like (txt export)
        try:
            text = file_bytes.decode('utf-8', errors='ignore')
        except Exception:
            text = ""

    trades = []
    for line in (text or "").splitlines():
        m = re.search(r'(?P<symbol>[A-Z]{2,7})\s+(?P<qty>\d[\d,]*)\s+(?P<price>\d+(?:\.\d+)?)\s+(?P<date>\d{4}-\d{2}-\d{2})', line.strip())
        if m:
            d = m.groupdict()
            d['qty'] = float(d['qty'].replace(',', ''))
            d['price'] = float(d['price'])
            trades.append(d)
    return trades
