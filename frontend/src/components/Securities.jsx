cat > src/components/Securities.jsx <<'EOF'
import { useEffect, useState } from "react";
import { Card } from "./Card.jsx";
import { Api } from "../lib/api.js";

export default function Securities() {
  const [rows, setRows] = useState([]);
  useEffect(()=>{ Api.securities().then(setRows) }, []);
  return (
    <Card title="MSE Securities">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="[&>th]:text-left [&>th]:py-2 border-b">
            <th>Symbol</th><th>Name</th><th>Sector</th>
          </tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id} className="[&>td]:py-2 border-b">
                <td>{r.symbol}</td><td>{r.name}</td><td>{r.sector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
EOF