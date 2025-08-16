cat > src/components/UploadDealNote.jsx <<'EOF'
import { useState } from "react";
import { Card } from "./Card.jsx";
import { Api } from "../lib/api.js";

export default function UploadDealNote({ onAdd }) {
  const [file, setFile] = useState(null);
  const [trades, setTrades] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setBusy(true); setErr(""); setTrades([]);
    try {
      const data = await Api.uploadDealNote(file);
      setTrades(data.trades || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title="Upload Deal Note">
      <div className="flex gap-2 items-center">
        <input type="file" accept="image/*,.txt,.pdf" onChange={e=>setFile(e.target.files[0])}/>
        <button
          onClick={handleUpload}
          disabled={!file || busy}
          className="px-3 py-2 rounded-lg bg-zc-navy text-white disabled:opacity-50"
        >
          {busy ? "Parsing..." : "Parse"}
        </button>
      </div>
      {err && <div className="text-red-600 text-sm mt-2">{err}</div>}

      {trades?.length > 0 && (
        <div className="mt-4">
          <div className="text-sm mb-2 text-zc-navy/80">Detected trades</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="[&>th]:text-left [&>th]:py-2">
                  <th>Symbol</th><th>Qty</th><th>Price</th><th>Date</th><th></th>
                </tr>
              </thead>
              <tbody>
              {trades.map((t, i) => (
                <tr key={i} className="[&>td]:py-2 border-t">
                  <td>{t.symbol}</td><td>{t.qty}</td><td>{t.price}</td><td>{t.date}</td>
                  <td>
                    <button
                      onClick={() => onAdd?.({ symbol: t.symbol, ttype: "BUY", qty: t.qty, price: t.price, fees: 0, date: t.date })}
                      className="px-2 py-1 text-xs rounded bg-zc-sand text-zc-ink"
                    >
                      Add to Portfolio
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}
EOF