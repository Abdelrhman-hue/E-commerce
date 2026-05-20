export default function Loading() {
  return (
    <div className="skeleton-page">
      <main className="s-main">
        <div className="s-toolbar">
          <div className="s-heading" />
          {/* <div className="s-select"  */}
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
      `}</style>
    </div>
  );
}
