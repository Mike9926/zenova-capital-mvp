cat > src/components/Card.jsx <<'EOF'
export default function Card({ title, children, footer }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border p-4">
      {title && <div className="font-semibold mb-3 text-zc-navy">{title}</div>}
      <div>{children}</div>
      {footer && <div className="pt-3 text-sm text-zc-navy/70">{footer}</div>}
    </div>
  );
}
EOF