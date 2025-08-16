
import { useState } from "react";
import Card from "./Card.jsx";
import { Api } from "../lib/api.js";

export default function AddTradeForm({ onSaved }) {
  const [form, setForm] = useState({ symbol:"", ttype:"BUY", qty:"", price:"", fees:"0", date: new Date().toISOString().slice(0,10) });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const change = (k,v)=>setForm(s=>({...s,[k]:v}));

  const submit = async () => {
    setBusy(true); setMsg("");
    try {
      await Api.addTrade({ ...form, qty:Number(form.qty), price:Number(form.price), fees:Number(form.fees) });
      setMsg("Saved.");
      onSaved?.();
    } catch (e) {
      setMsg(`Error: ${e.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title="Add Trade Manually">
      <div className="grid md:grid-cols-6 gap-2">
        <input className="border rounded-lg px-2 py-2 md:col-span-1" placeholder="Symbol (NBM)" value={form.symbol} onChange={e=>change("symbol",e.target.value.toUpperCase())}/>
        <select className="border rounded-lg px-2 py-2 md:col-span-1" value={form.ttype} onChange={e=>change("ttype",e.target.value)}>
          <option>BUY</option><option>SELL</option>
        </select>
        <input className="border rounded-lg px-2 py-2 md:col-span-1" placeholder="Qty" type="number" value={form.qty} onChange={e=>change("qty",e.target.value)}/>
        <input className="border rounded-lg px-2 py-2 md:col-span-1" placeholder="Price" type="number" value={form.price} onChange={e=>change("price",e.target.value)}/>
        <input className="border rounded-lg px-2 py-2 md:col-span-1" placeholder="Fees" type="number" value={form.fees} onChange={e=>change("fees",e.target.value)}/>
        <input className="border rounded-lg px-2 py-2 md:col-span-1" type="date" value={form.date} onChange={e=>change("date",e.target.value)}/>
      </div>
      <div className="mt-3 flex gap-2 items-center">
        <button onClick={submit} disabled={busy} className="px-3 py-2 rounded-lg bg-zc-navy text-white disabled:opacity-50">
          {busy? "Saving..." : "Save Trade"}
        </button>
        {msg && <span className="text-sm">{msg}</span>}
      </div>
    </Card>
  );
}
