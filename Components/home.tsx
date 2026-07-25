"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";

export default function LiftingHome() {
  return (
    <div className="mt-16 grid w-full gap-6 lg:grid-cols-2 p-4">
      {/* Flash Deals */}
      <div className="group rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-[0_0_35px_rgba(250,204,21,.12)]">
        <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-medium text-red-400">
          🔥 Flash Deals
        </span>

        <h2 className="mt-5 text-2xl font-bold text-white">
          Electronics up to <span className="text-yellow-400">50% OFF</span>
        </h2>

        <p className="mt-3 text-zinc-400">
          Limited time offer. Grab your favorite gadgets before the deal ends.
        </p>

        <p className="mt-5 font-semibold text-red-400">Ends in 02 : 14 : 38</p>

        <Link
          href="/shop"
          className="mt-7 inline-flex rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-105 hover:bg-yellow-300"
        >
          Browse Products →
        </Link>
      </div>

      {/* Free Shipping */}
      <div className="group rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,.15)]">
        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-medium text-blue-400">
          🚚 Free Shipping
        </span>

        <h2 className="mt-5 text-2xl font-bold text-white">
          Orders over <span className="text-yellow-400">$50</span> ship free
        </h2>

        <p className="mt-3 text-zinc-400">
          Save on delivery costs and enjoy fast shipping on eligible orders.
        </p>

        <p className="mt-5 font-semibold text-blue-400">
          Coupon Code: <span className="text-white">FREESHIP</span>
        </p>

        <Link
          href="/shop"
          className="mt-7 inline-flex rounded-xl border border-blue-500 px-6 py-3 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
        >
          Shop Now →
        </Link>
      </div>
    </div>
  );
}
