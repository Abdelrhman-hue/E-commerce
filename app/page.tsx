/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import baner from "../public/imges/modern-man-casual-outfit-showing-shopping-bag-okay-sign-winking-camera-recommending-shop_1258-300002.avif";
import Link from "next/link";
import LiftingHome from "@/Components/home";
import api from "@/api/api";
import {
  FiTruck,
  FiShield,
  FiClock,
  FiRefreshCw,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";

export const dynamic = "force-dynamic";

type Product = {
  id?: string | number;
  _id?: string;
  thumbnail?: string;
  images?: string[];
  title?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
};

export default async function Home() {
  let products: Product[] = [];

  try {
    const { data } = await api.get("/products");
    products = (data?.products ?? []) as Product[];
  } catch (error) {
    console.error("Home: Failed to fetch products from backend:", error);
  }

  const categories = [
    { label: "All Items", query: "" },
    { label: "Beauty", query: "beauty" },
    { label: "Fragrances", query: "fragrances" },
    { label: "Furniture", query: "furniture" },
    { label: "Groceries", query: "groceries" },
  ];

  const features = [
    {
      icon: <FiTruck className="text-2xl text-blue-400" />,
      title: "Free Express Shipping",
      desc: "On all orders above $50",
    },
    {
      icon: <FiShield className="text-2xl text-emerald-400" />,
      title: "Secure Checkout",
      desc: "Guaranteed SSL & Stripe security",
    },
    {
      icon: <FiRefreshCw className="text-2xl text-yellow-400" />,
      title: "30-Day Easy Returns",
      desc: "Hassle-free return policy",
    },
    {
      icon: <FiClock className="text-2xl text-purple-400" />,
      title: "24/7 Customer Care",
      desc: "Dedicated support team",
    },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#101010] text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#171717] via-[#202020] to-[#0f0f0f]">
        <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 left-10 h-72 w-72 rounded-full bg-yellow-500/10 blur-[120px] pointer-events-none" />

        <div className="mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-12 lg:px-8 xl:gap-16">
          <div className="min-w-0 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300 sm:text-sm">
              ✨ Premium Collection 2026
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Shop Smarter, <br />
              Live{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Better
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg lg:mx-0 lg:leading-8">
              Discover curated tech, beauty, home essentials, and lifestyle
              products designed for quality, comfort, and everyday excellence.
            </p>

            <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:mx-0 lg:justify-start">
              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 hover:scale-[1.02]"
              >
                Shop Now <FiArrowRight />
              </Link>

              <Link
                href="/offers"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/60 px-6 py-3 text-base font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800"
              >
                View Offers
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-zinc-800/80 pt-8">
              <div>
                <p className="text-2xl font-black text-yellow-400 sm:text-3xl">
                  12K+
                </p>
                <p className="text-xs text-zinc-400 sm:text-sm">Products</p>
              </div>
              <div>
                <p className="text-2xl font-black text-yellow-400 sm:text-3xl">
                  99%
                </p>
                <p className="text-xs text-zinc-400 sm:text-sm">Happy Shoppers</p>
              </div>
              <div>
                <p className="text-2xl font-black text-yellow-400 sm:text-3xl">
                  24h
                </p>
                <p className="text-xs text-zinc-400 sm:text-sm">Fast Dispatch</p>
              </div>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[36px] border border-zinc-700/80 bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 p-4 shadow-[0_30px_90px_rgba(0,0,0,.7)] backdrop-blur-md">
              <Image
                src={baner}
                alt="Online Shopping Experience"
                width={600}
                height={600}
                className="rounded-2xl object-cover transition duration-700 hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST FEATURES ================= */}
      <section className="border-y border-zinc-800/80 bg-zinc-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-4 transition hover:border-zinc-700"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800/80">
                {feat.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                <p className="text-xs text-zinc-400">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CATEGORY FILTER CHIPS ================= */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.query ? `/shop?category=${cat.query}` : "/shop"}
              className="rounded-full border border-zinc-800 bg-zinc-900/70 px-5 py-2.5 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ================= PRODUCT HIGHLIGHTS ================= */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-400 sm:text-sm">
              Featured Items
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Product Highlights
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
          >
            Explore All <FiArrowRight size={14} />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
            {products.slice(0, 10).map((product) => {
              const productId = product.id ?? product._id;
              const imageSrc =
                product.thumbnail ||
                product.images?.[0] ||
                "/placeholder.png";

              return (
                <Link
                  key={String(productId)}
                  href={`/shop/${productId}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500 hover:shadow-[0_12px_30px_rgba(59,130,246,.15)]"
                >
                  <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-950 p-3">
                    <Image
                      src={imageSrc}
                      alt={product.title ?? "Product"}
                      fill
                      className="object-contain p-2 transition duration-500 group-hover:scale-105"
                    />

                    {product.discountPercentage && product.discountPercentage > 0 && (
                      <span className="absolute top-2 left-2 rounded-md bg-red-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex flex-1 flex-col justify-between">
                    <div>
                      {product.category && (
                        <p className="text-[11px] font-medium uppercase tracking-wider text-blue-400">
                          {product.category}
                        </p>
                      )}
                      <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-white group-hover:text-blue-400">
                        {product.title}
                      </h3>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-base font-bold text-white">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>

                      {product.rating && (
                        <span className="flex items-center gap-1 text-xs text-amber-400">
                          <FiStar className="fill-amber-400 text-amber-400" size={12} />
                          {product.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center text-zinc-400">
            <p>Connect your database to load live catalog products.</p>
            <Link
              href="/shop"
              className="mt-4 inline-block text-sm text-blue-400 hover:underline"
            >
              Browse Shop &rarr;
            </Link>
          </div>
        )}
      </section>

      {/* Promo Banner Cards */}
      <LiftingHome />
    </main>
  );
}
