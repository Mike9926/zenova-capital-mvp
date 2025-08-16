
import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { Api } from "../lib/api.js";

export default function Portfolio() {
  const [data, setData] = useState({ positions: [], total_market_value: 0, total_cost: 0, total_unrealized: 0 });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setBusy(true);
    try {
      setData(await Api.portfolio());
    } finally {
      setBusy(false);
    }
  };

  useEffect(()=>{ load() }, []);

  const fmt = v => new Intl.NumberFormat("en-MW", { maximumFractionDigits: 2 }).format(v);

  return (
    <Card title="Portfolio Overview" footer={busy ? "Refreshing..." : ""}>
      <div className="grid md:grid-cols-3 gap-3 mb-3">
        <div className="rounded-xl p-4 border bg-zc-sand/30">
          <div className="text-xs text-zc-navy/70">Market Value</div>
          <div className="text-2xl font-semibold">MWK {fmt(data.total_market_value)}</div>
        </div>
        <div className="rounded-xl p-4 border">
          <div className="text-xs text-zc-navy/70">Total Cost</div>
          <div className="text-2xl font-semibold">MWK {fmt(data.total_cost)}</div>
        </div>
        <div className="rounded-xl p-4 border">
          <div className={`text-xs text-zc-navy/70`}>Unrealized P/L</div>
          <div className={`text-2xl font-semibold ${data.total_unrealized>=0?'text-green-700':'text-red-700'}`}>
            MWK {fmt(data.total_unrealized)}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="[&>th]:text-left [&>th]:py-2 border-b">
              <th>Symbol</th><th>Qty</th><th>Last Price</th><th>Market Value</th><th>Avg Cost</th>
            </tr>
          </thead>
          <tbody>
            {data.positions.map((p, i)=>(
              <tr key={i} className="[&>td]:py-2 border-b">
                <td>{p.symbol}</td>
                <td>{p.qty}</td>
                <td>{p.last_price}</td>
                <td>{fmt(p.market_value)}</td>
                <td>{p.avg_cost}</td>
              </tr>
            ))}
            {data.positions.length===0 && (
              <tr><td colSpan="5" className="py-6 text-center text-zc-navy/60">No positions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        <button onClick={load} className="px-3 py-2 rounded-lg bg-zc-navy text-white">Refresh</button>
      </div>
    </Card>
  );
}
