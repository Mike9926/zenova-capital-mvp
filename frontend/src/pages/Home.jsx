import React from 'react';

export default function Home() {
  return (
    <main className="container-app min-h-screen py-10 md:py-14">
      <section className="hero fade-in">
        <h1>Zenova Capital</h1>
        <p>Smarter Insights for Better Returns.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#get-started" className="btn btn-accent">Get Started</a>
          <a href="#portfolio" className="btn">View Portfolio</a>
        </div>
      </section>

      <section className="flow">
        <h2 className="text-xl font-semibold text-zc-navy/90">Quick Actions</h2>
        <div className="grid-cards">
          <a href="#portfolio" className="card">
            <div className="text-lg font-semibold">Portfolio</div>
            <p className="text-sm text-zc-navy/70">View totals and positions.</p>
          </a>
          <a href="#upload" className="card">
            <div className="text-lg font-semibold">Upload Deal Note</div>
            <p className="text-sm text-zc-navy/70">OCR your broker note into trades.</p>
          </a>
          <a href="#reports" className="card">
            <div className="text-lg font-semibold">Reports</div>
            <p className="text-sm text-zc-navy/70">Performance & risk analytics.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
