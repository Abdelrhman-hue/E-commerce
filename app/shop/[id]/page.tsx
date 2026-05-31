import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const paramss = await params;
  console.log(paramss.id);
  console.log("lol");
  if (paramss.id == "10") {
    return notFound();
  }
  return (
    <div className="product-page">
      <h1 className="title">Product {paramss.id}</h1>
      <div className="product-card">
        <aside className="left-col">
          <div className="main-image">
            <svg viewBox="0 0 120 90" aria-hidden>
              <rect width="120" height="90" rx="6" fill="#222" />
              <g fill="#333" stroke="#2b2b2b">
                <rect x="18" y="22" width="84" height="46" rx="4" />
              </g>
              <text
                x="60"
                y="50"
                fill="#555"
                fontSize="9"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                Product image
              </text>
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
            <div className="rating">
              ★ ★ ★ ★ ★ <span className="muted">4.9 (1,284 reviews)</span>
            </div>
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
                The MacBook Air M3 is Apples thinnest, lightest laptop —
                redesigned from the ground up with the M3 chip. Up to 18 hours
                of battery life, a stunning Liquid Retina display, and a
                completely fanless design that runs silently no matter the task.
              </p>
              <p className="desc muted">
                With up to 24GB unified memory and blazing-fast storage, it
                handles everything from everyday tasks to demanding creative
                work with ease. Available in four beautiful finishes.
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
    </div>
  );
}
