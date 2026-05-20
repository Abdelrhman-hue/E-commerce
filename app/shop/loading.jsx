export default function Loading() {
  return (
    <div className="skeleton-page">
      <main className="s-main">
        <div className="s-toolbar">
          <div className="s-heading" />
          <div className="s-select" />
        </div>

        <div className="s-grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="s-card" key={i}>
              <div className="s-img" />
              <div className="s-card-lines">
                <div className="s-line full" />
                <div className="s-line medium" />
              </div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        .skeleton-page { padding: 24px; background:#111; min-height:100vh; color:#ddd; font-family:Inter,Arial,sans-serif; }
        .s-main { max-width:1100px; margin:0 auto; }
        .s-toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
        .s-heading { height:28px; width:180px; background:linear-gradient(90deg,#2a2a2a,#3a3a3a); border-radius:6px; animation:shimmer 1.2s infinite; }
        .s-select { width:140px; height:36px; background:#2a2a2a; border-radius:6px; animation:shimmer 1.2s infinite; }
        .s-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:12px; background:#0f0f0f; border-radius:8px; padding:16px; min-height:320px; }
        .s-card { background:rgba(255,255,255,0.02); border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:8px; }
        .s-img { height:110px; border-radius:6px; background:linear-gradient(90deg,#2a2a2a,#3a3a3a); animation:shimmer 1.2s infinite; }
        .s-card-lines { display:flex; flex-direction:column; gap:6px; }
        .s-line { height:12px; background:linear-gradient(90deg,#2a2a2a,#3a3a3a); border-radius:6px; animation:shimmer 1.2s infinite; }
        .s-line.full { width:100%; }
        .s-line.medium { width:50%; }
        .s-page { width:36px; height:36px; border-radius:8px; background:#1b1b1b; animation:shimmer 1.2s infinite; }
        .s-page.small { width:28px; }
        .s-page.active { background:#1266d4; box-shadow:0 0 0 2px rgba(18,102,212,0.12); animation:none; }
        .s-ellipsis { width:24px; height:12px; border-radius:6px; background:linear-gradient(90deg,#232323,#2f2f2f); animation:shimmer 1.2s infinite; display:inline-block; }
        @keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }
        .s-heading, .s-select, .s-img, .s-line, .s-ellipsis, .s-page { background-size: 400px 100%; }
      `}</style>
    </div>
  );
}
