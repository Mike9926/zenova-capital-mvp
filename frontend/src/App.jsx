import { useEffect, useState } from "react";
import TopNav from "./components/TopNav.jsx";
import Portfolio from "./components/Portfolio.jsx";
import UploadDealNote from "./components/UploadDealNote.jsx";
import AddTradeForm from "./components/AddTradeForm.jsx";
import Securities from "./components/Securities.jsx";
import Home from "./pages/Home.jsx";

const TABS = ["home","portfolio","upload","add","securities"];

export default function App() {
  const [tab, setTab] = useState("home");

  // support links like #portfolio or #upload
  useEffect(() => {
    const fromHash = (location.hash || "#home").replace("#","");
    if (TABS.includes(fromHash)) setTab(fromHash);
    const onHash = () => {
      const next = (location.hash || "#home").replace("#","");
      if (TABS.includes(next)) setTab(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="min-h-screen bg-zc-bg">
      <TopNav />
      <nav className="mx-auto max-w-6xl px-4 pt-4 flex gap-2">
        {TABS.map(t => (
          <a key={t} href={`#${t}`}
             className={`px-4 py-2 rounded-full border ${tab===t ? "bg-zc-sand" : "bg-white"} text-zc-navy`}>
            {t==="home" ? "Home" :
             t==="portfolio" ? "Portfolio" :
             t==="upload" ? "Upload Deal Note" :
             t==="add" ? "Add Trade" : "Securities"}
          </a>
        ))}
        <div className="ml-auto">
          <a href="#portfolio"
             className="px-3 py-2 rounded-lg border text-sm"
             onClick={(e)=>{ /* optional: keep default anchor */ }}>
            Go to Portfolio
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {tab==="home" && <Home />}
        {tab==="portfolio" && <Portfolio />}
        {tab==="upload" && <UploadDealNote onAdd={()=>location.hash="#portfolio"} />}
        {tab==="add" && <AddTradeForm onSaved={()=>location.hash="#portfolio"} />}
        {tab==="securities" && <Securities />}
      </main>
    </div>
  );
}
