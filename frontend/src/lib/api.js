
const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function jfetch(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const Api = {
  securities: () => jfetch("/api/securities/"),
  portfolio:  () => jfetch("/api/portfolio/summary/"),
  addTrade:   (body) => jfetch("/api/trades/", { method: "POST", body: JSON.stringify(body) }),
  fetchPrices: () => jfetch("/api/fetch-prices/", { method: "POST" }),
  uploadDealNote: async (file) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API}/api/upload-deal-note/`, { method: "POST", body: form });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },
};
