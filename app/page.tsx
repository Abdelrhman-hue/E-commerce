import Image from "next/image";
import baner from "../public/imges/modern-man-casual-outfit-showing-shopping-bag-okay-sign-winking-camera-recommending-shop_1258-300002.avif";
import Link from "next/link";
import LiftingHome from "@/Components/home";
import api from "@/api/api";

export default async function Home() {
  // Simulate loading
  await new Promise((res) => setTimeout(res, 3000));

  const { data } = await api.get("/products");
  const products = data.products;

  const category = [
    "All",
    "Electronics",
    "Fashion",
    "Home&Living",
    "Beauty",
    "Sports",
  ];
  return (
    <>
      <div className="bg-gradient-to-br from-[#171717] via-[#202020] to-[#0f0f0f]">
        <div className=" relative min-h-screen overflow-hidden ">
          {/* Hero Section */}
          <section className="relative min-h-auto overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#171717] via-[#202020] to-[#0f0f0f]" />

            <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px] animate-pulse" />
            <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[180px]" />

            <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-16 px-8">
              {/* LEFT */}

              <div className="max-w-2xl animate-[fadeIn_1s_ease]">
                <span className="inline-flex rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
                  🛍️ New Collection 2026
                </span>

                <h1 className="mt-8 text-6xl font-black leading-tight lg:text-7xl">
                  Shop Smarter
                  <br />
                  Live{" "}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                    Better
                  </span>
                </h1>

                <p className="mt-8 max-w-xl text-xl leading-9 text-zinc-400">
                  Discover thousands of premium products across electronics,
                  fashion, furniture and more.
                </p>

                <div className="mt-10 flex gap-5">
                  <Link
                    href="/shop"
                    className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
                  >
                    Shop Now
                  </Link>

                  <Link
                    href="/offers"
                    className="rounded-xl border border-zinc-600 px-8 py-4 font-semibold transition hover:bg-zinc-800"
                  >
                    View Offers
                  </Link>
                </div>
              </div>

              {/* RIGHT */}

              <div className="relative animate-[float_5s_ease-in-out_infinite]">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-[120px]" />

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

            {/* Stats */}

            <div className="absolute bottom-12 left-1/2 w-full max-w-6xl -translate-x-1/2 px-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="rounded-3xl border border-zinc-700 bg-zinc-900/70 p-7 backdrop-blur">
                  <h2 className="text-5xl font-black text-yellow-400">12K+</h2>
                  <p className="mt-3 text-zinc-400">Products</p>
                </div>

                <div className="rounded-3xl border border-zinc-700 bg-zinc-900/70 p-7 backdrop-blur">
                  <h2 className="text-5xl font-black text-yellow-400">98%</h2>
                  <p className="mt-3 text-zinc-400">Happy Customers</p>
                </div>

                <div className="rounded-3xl border border-zinc-700 bg-zinc-900/70 p-7 backdrop-blur">
                  <h2 className="text-5xl font-black text-yellow-400">24h</h2>
                  <p className="mt-3 text-zinc-400">Fast Delivery</p>
                </div>
              </div>
            </div>
          </section>
          {/* Hero Section */}
          {/* category */}
          <div className="w-full pb-1 border-zinc-800 pt-5 ">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {category.map((cat) => (
                <Link
                  key={cat}
                  href={`/shop?category=${cat}`}
                  className="
          rounded-full
          border border-zinc-700
          bg-zinc-900/70
          px-5 py-2
          text-sm
          font-medium
          text-zinc-300
          backdrop-blur-md
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-yellow-400
          hover:bg-yellow-400/10
          hover:text-yellow-400
          hover:shadow-[0_0_20px_rgba(250,204,21,0.25)]
        "
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          {/* category */}
          {/* Product Highlights */}
          <div className="mt-16 w-full p-2 ">
            <div className="mb-8 flex items-center justify-between ">
              <div className=" p-1.5">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Featured Collection
                </p>

                <h2 className="mt-2 text-4xl font-bold text-white">
                  Product Highlights
                </h2>
              </div>

              <Link
                href="/shop"
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-400"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              {products.map((i: { id: number; thumbnail: string }) => (
                <Link key={i.id} href={`/shop/${i.id}`} className="group">
                  <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,.15)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <Image
                      src={i.thumbnail}
                      alt="Product"
                      width={180}
                      height={180}
                      className="mx-auto h-36 w-36 object-contain transition duration-500 group-hover:scale-110 group-hover:rotate-2"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Product Highlights */}
          <LiftingHome />
        </div>
      </div>
    </>
  );
}
