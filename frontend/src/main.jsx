import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Runtime sanity: confirm Tailwind compiled (checks a known class)
if (import.meta.env.MODE !== 'production') {
  const probe = document.createElement('div');
  probe.className = 'w-[13px] hidden';
  document.documentElement.appendChild(probe);
  const applied = getComputedStyle(probe).width === '13px';
  document.documentElement.dataset.tailwindOk = applied ? 'true' : 'false';
  if (!applied) {
    console.warn('[Tailwind] utilities not applied. Check: tailwind.config.cjs, postcss.config.js, versions.');
    document.body.classList.add('css-debug-outline');
  }
  probe.remove();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);