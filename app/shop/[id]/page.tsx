import { notFound } from "next/navigation";
import Image from "next/image";
import ProductDetails from "@/Components/productDetalis";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/products/${id}`);
  if (!res.ok) {
    return notFound();
  }

  const product = await res.json();

  

  
  return (
    <div className="product-page">
      <h1 className="title">Product {product.category}</h1>
      <div className="product-card">
        <aside className="left-col">
          <div className="main-image">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={300}
              height={300}
              priority
            />
          </div>

          <div className="thumbs">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="thumb">
                <Image
                  src={product.thumbnail}
                  alt={`${product.title}  ${i + 1}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </aside>

        <section className="right-col">
          <div className="meta">
            <div className="brand">{product.brand}</div>
            <h1 className="title">{product.title}</h1>
            <div className="rating">
              ★ ★ ★ ★ ★{" "}
              <span className="muted">{product.rating} (1,284 reviews)</span>
            </div>
          </div>

          <div className="price-row">
            <div className="price">${product.price}</div>
          </div>

          {product.category === "electronics" && (
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
          )}
          <div className="product-details">
            <ProductDetails product={product} />
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
