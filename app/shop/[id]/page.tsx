import { notFound } from "next/navigation";
import Image from "next/image";
import ProductDetails from "@/Components/productDetalis";
import Link from "next/link";
import { FiImage } from "react-icons/fi";
import api from "@/api/api";

type product = {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  thumbnail?: string | undefined;
  category?: string;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `https://back-end-production-28f2.up.railway.app/products/${id}`,
  );
  if (!res.ok) {
    return notFound();
  }

  const response = await api.get("/products");
  const products = response.data.products;

  const product = await res.json();
  console.log(products);

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
              <button className="tab">Reviews ({product.rating}🌟)</button>
            </nav>

            <div className="tab-panel">
              <p className="desc">{product.description}</p>
              <p className="desc muted">
                in stock {product.stock}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="related">
        <h3 className="mb-6 text-2xl font-bold">You may also like</h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product: product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 transition hover:scale-105 hover:border-orange-500"
            >
              <div className="mb-4 flex aspect-square items-center justify-center rounded-lg bg-zinc-800">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                ) : (
                  <FiImage className="text-6xl text-zinc-600" />
                )}
              </div>

              <h4 className="line-clamp-1 text-lg font-semibold">
                {product.title}
              </h4>

              <p className="mt-2 text-xl font-bold text-orange-500">
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
