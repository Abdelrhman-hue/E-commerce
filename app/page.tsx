import Image from "next/image";
import baner from "../public/imges/modern-man-casual-outfit-showing-shopping-bag-okay-sign-winking-camera-recommending-shop_1258-300002.avif";
import Link from "next/link";
import LiftingHome from "@/Components/home";
import api from "@/api/api";

type Product = {
  id?: string | number;
  _id?: string;
  thumbnail?: string;
  title?: string;
};

export default async function Home() {
  const { data } = await api.get("/products");
  const products = (data.products ?? []) as Product[];

  const category = [
    "All",
    "Electronics",
    "Fashion",
    "Home&Living",
    "Beauty",
    "Sports",
  ];
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#101010] text-white">
      <section className="bg-gradient-to-br from-[#171717] via-[#202020] to-[#0f0f0f]">
        <div className="mx-auto grid min-h-[calc(100svh-64px)] w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:gap-12 lg:px-8 xl:gap-16">
          <div className="min-w-0 animate-[fadeIn_1s_ease] text-center lg:text-left">
            <span className="inline-flex max-w-full rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300 sm:text-sm">
              New Collection 2026
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Shop Smarter
              <br />
              Live{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Better
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg lg:mx-0 lg:leading-8">
              Discover thousands of premium products across electronics,
              fashion, furniture and more.
            </p>

            <div className="mx-auto mt-8 grid max-w-sm grid-cols-1 gap-3 sm:max-w-none sm:grid-cols-2 lg:mx-0 lg:max-w-md">
              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] sm:text-base"
              >
                Shop Now
              </Link>

              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-800 sm:text-base"
              >
                View Offers
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none">
            <div className="rounded-[40px] border border-zinc-700 bg-zinc-900 p-6 shadow-[0_30px_80px_rgba(0,0,0,.6)]">
              <Image
                src={baner}
                alt="Shopping"
                width={600}
                height={600}
                className="rounded-3xl object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {[
              ["12K+", "Products"],
              ["98%", "Happy Customers"],
              ["24h", "Fast Delivery"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-zinc-700 bg-zinc-900/75 p-5 text-center backdrop-blur sm:text-left lg:p-7"
              >
                <h2 className="text-3xl font-black text-yellow-400 lg:text-5xl">
                  {value}
                </h2>
                <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {category.map((cat) => (
            <Link
              key={cat}
              href={`/shop?category=${cat}`}
              className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-400 sm:px-5"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 sm:text-sm sm:tracking-[0.25em]">
              Featured Collection
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Product Highlights
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex w-fit rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-400"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {products.slice(0, 10).map((product) => {
            const productId = product.id;

            return (
              <Link
                key={productId}
                href={`/shop/${productId}`}
                className="group min-w-0"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,.15)] sm:p-5">
                  {product.thumbnail && (
                    <Image
                      src={product.thumbnail}
                      alt={product.title ?? "Product"}
                      width={180}
                      height={180}
                      className="h-full max-h-32 w-full object-contain transition duration-500 group-hover:scale-105 sm:max-h-36"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <LiftingHome />
    </main>
  );
}
