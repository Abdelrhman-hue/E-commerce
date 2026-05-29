export default function ProductPage(params: { id: string }) {
    console.log(params.id);
  return (

    <div className="product-page">
        <h1 className="title">Product {params.id}</h1>
      <div className="product-card">
        <aside className="left-col">
          <div className="main-image">
            <svg viewBox="0 0 120 90" aria-hidden>
              <rect width="120" height="90" rx="6" fill="#222" />
              <g fill="#333" stroke="#2b2b2b">
                <rect x="18" y="22" width="84" height="46" rx="4" />
              </g>
              <text x="60" y="50" fill="#555" fontSize="9" textAnchor="middle" alignmentBaseline="middle">Product image</text>
            </svg>
          </div>

          <div className="thumbs">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="thumb">
                <svg viewBox="0 0 40 30" aria-hidden>
                  <rect width="40" height="30" rx="4" fill="#222" />
                </svg>
              </div>
            ))}
          </div>
        </aside>

        <section className="right-col">
          <div className="meta">
            <div className="brand">APPLE</div>
            <h1 className="title">MacBook Air 13 — M3 chip</h1>
            <div className="rating">★ ★ ★ ★ ★ <span className="muted">4.9 (1,284 reviews)</span></div>
          </div>

          <div className="price-row">
            <div className="price">$1,099</div>
            <div className="old-price">$1,299</div>
            <div className="badge">Save $200</div>
          </div>

          <div className="options">
            <div className="option-group">
              <div className="opt-label">Color:</div>
              <div className="swatches">
                <span className="swatch sw-midnight" />
                <span className="swatch sw-silver" />
                <span className="swatch sw-green" />
                <span className="swatch sw-blue" />
              </div>
            </div>

            <div className="option-group">
              <div className="opt-label">Storage:</div>
              <div className="chips">
                <button className="chip active">256GB</button>
                <button className="chip">512GB</button>
                <button className="chip">1TB</button>
              </div>
            </div>

            <div className="option-group">
              <div className="opt-label">RAM:</div>
              <div className="chips">
                <button className="chip active">16GB</button>
                <button className="chip">24GB</button>
              </div>
            </div>
          </div>

          <div className="buy-row">
            <div className="qty">
              <button className="qty-btn">−</button>
              <div className="qty-num">1</div>
              <button className="qty-btn">+</button>
            </div>

            <div className="actions">
              <button className="btn primary">Add to cart</button>
              <button className="btn ghost">Buy now</button>
            </div>
          </div>

          <div className="features">
            <div className="feat">Free delivery</div>
            <div className="feat">30-day return</div>
            <div className="feat">2yr warranty</div>
            <div className="feat">Secure pay</div>
          </div>

          <div className="tabs">
            <nav>
              <button className="tab active">Description</button>
              <button className="tab">Specifications</button>
              <button className="tab">Reviews (1,284)</button>
            </nav>

            <div className="tab-panel">
              <p className="desc">
                The MacBook Air M3 is Apples thinnest, lightest laptop — redesigned from the ground up with the M3 chip. Up to 18 hours of battery life, a stunning Liquid Retina display, and a completely fanless design that runs silently no matter the task.
              </p>
              <p className="desc muted">
                With up to 24GB unified memory and blazing-fast storage, it handles everything from everyday tasks to demanding creative work with ease. Available in four beautiful finishes.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="related">
        <h3>You may also like</h3>
        <div className="related-list">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="related-card">
              <div className="r-img" />
              <div className="r-title">Product {i + 1}</div>
              <div className="r-price">$1,299</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .product-page{ background:#0f0f0f; min-height:100vh; padding:28px; color:#e6e6e6; font-family:Inter,Arial,Helvetica,sans-serif; }
        .product-card{ max-width:1100px; margin:0 auto; display:grid; grid-template-columns:320px 1fr; gap:24px; align-items:start; }
        .left-col{ background:transparent; }
        .main-image{ background:#141414; border-radius:8px; padding:18px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(255,255,255,0.03); }
        .thumbs{ display:flex; gap:10px; margin-top:12px; }
        .thumb{ width:64px; height:48px; background:#141414; border-radius:6px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(255,255,255,0.02); }

        .right-col{ padding:8px 0; }
        .brand{ font-size:12px; color:#6fb0ff; font-weight:700; letter-spacing:0.08em; margin-bottom:6px; }
        .title{ font-size:20px; margin:0 0 8px; color:#fff; }
        .rating{ color:#f5b334; font-size:13px; margin-bottom:12px; }
        .muted{ color:#9b9b9b; font-size:13px; margin-left:8px; display:inline-block; }

        .price-row{ display:flex; align-items:center; gap:12px; margin-bottom:14px; }
        .price{ font-size:20px; color:#39c0ff; font-weight:700; }
        .old-price{ color:#777; text-decoration:line-through; font-size:13px; }
        .badge{ background:#3b2; color:#1b1; padding:4px 8px; border-radius:8px; font-size:12px; opacity:0.95; }

        .options{ margin:14px 0 18px; display:flex; flex-direction:column; gap:12px; }
        .option-group{ display:flex; align-items:center; gap:12px; }
        .opt-label{ width:76px; color:#9b9b9b; font-size:13px; }
        .swatches{ display:flex; gap:8px; align-items:center; }
        .swatch{ width:18px; height:18px; border-radius:50%; border:1px solid rgba(255,255,255,0.04); display:inline-block; }
        .sw-midnight{ background:#0b1220 }
        .sw-silver{ background:#d6d6d6 }
        .sw-green{ background:#bfe6c6 }
        .sw-blue{ background:#c7e6ff }

        .chips{ display:flex; gap:8px; }
        .chip{ background:#171717; border:1px solid rgba(255,255,255,0.03); color:#ddd; padding:6px 10px; border-radius:8px; cursor:default; }
        .chip.active{ background:#0f6bd4; color:#fff; }

        .buy-row{ display:flex; gap:16px; align-items:center; margin:18px 0; }
        .qty{ display:flex; align-items:center; gap:8px; background:#171717; padding:6px; border-radius:8px; }
        .qty-btn{ width:34px; height:34px; background:#161616; border:1px solid rgba(255,255,255,0.03); color:#ddd; border-radius:6px; cursor:default; }
        .qty-num{ min-width:28px; text-align:center; color:#fff; }

        .actions{ display:flex; gap:8px; flex:1; }
        .btn{ flex:1; padding:10px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.04); cursor:default; font-weight:700; }
        .btn.primary{ background:#2b6b3a; color:#fff; }
        .btn.ghost{ background:transparent; color:#ddd; }

        .features{ display:flex; gap:12px; margin-top:12px; flex-wrap:wrap; color:#9b9b9b; font-size:13px; }
        .feat{ background:#141414; padding:8px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.02); }

        .tabs{ margin-top:20px; }
        .tabs nav{ display:flex; gap:12px; margin-bottom:12px; }
        .tab{ background:transparent; color:#9b9b9b; border:0; padding:8px 6px; cursor:default; border-bottom:2px solid transparent; }
        .tab.active{ color:#fff; border-bottom-color:#0f6bd4; }

        .tab-panel .desc{ color:#bdbdbd; line-height:1.5; font-size:14px; margin:0 0 8px; }

        .related{ max-width:1100px; margin:26px auto 0; padding-top:18px; }
        .related h3{ color:#dcdcdc; margin:0 0 12px; font-size:16px; }
        .related-list{ display:flex; gap:12px; }
        .related-card{ background:#141414; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.02); width:220px; }
        .r-img{ height:96px; background:#222; border-radius:6px; margin-bottom:8px; }
        .r-title{ font-size:13px; color:#e6e6e6; margin-bottom:6px; }
        .r-price{ color:#39c0ff; font-weight:700; }

        @media (max-width:880px){
          .product-card{ grid-template-columns:1fr; }
          .left-col{ order:2 }
          .right-col{ order:1 }
        }
      `}</style>
    </div>
  );
}


