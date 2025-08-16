export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Zenova Capital</h1>
      <p className="mt-2 text-zc-navy/80">Smarter Insights for Better Returns.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <a href="#portfolio" className="block border rounded-2xl p-4 hover:shadow-soft">
          <div className="font-semibold">Portfolio</div>
          <div className="text-sm text-zc-navy/70">View totals and positions.</div>
        </a>
        <a href="#upload" className="block border rounded-2xl p-4 hover:shadow-soft">
          <div className="font-semibold">Upload Deal Note</div>
          <div className="text-sm text-zc-navy/70">OCR your broker note into trades.</div>
        </a>
      </div>
    </div>
  );
}
