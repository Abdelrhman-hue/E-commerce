"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiZap,
  FiClock,
  FiTag,
  FiShoppingBag,
  FiCopy,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";

const COUPONS = [
  {
    code: "FLASH50",
    discount: "50% OFF",
    title: "Electronics Flash Sale",
    desc: "Valid on all audio and smart accessories over $100.",
    expires: "Ends in 2 days",
  },
  {
    code: "FREESHIP",
    discount: "FREE SHIPPING",
    title: "Zero Delivery Fees",
    desc: "Applicable on orders above $50 anywhere in the country.",
    expires: "Limited spots",
  },
  {
    code: "TECH20",
    discount: "20% OFF",
    title: "Laptops & Tablets",
    desc: "Instant savings applied directly at checkout on select brands.",
    expires: "Ends this week",
  },
];

const DEALS = [
  {
    id: "d1",
    title: "Sony WH-1000XM5 Wireless Headphones",
    category: "Audio",
    originalPrice: 399.99,
    salePrice: 279.99,
    discount: 30,
    image: "/placeholder.png",
    claimed: 78,
  },
  {
    id: "d2",
    title: 'MacBook Air M2 13" 256GB - Midnight',
    category: "Laptops",
    originalPrice: 1099.0,
    salePrice: 899.0,
    discount: 18,
    image: "/placeholder.png",
    claimed: 62,
  },
  {
    id: "d3",
    title: "Apple Watch Series 9 GPS 45mm",
    category: "Wearables",
    originalPrice: 429.0,
    salePrice: 329.0,
    discount: 23,
    image: "/placeholder.png",
    claimed: 91,
  },
  {
    id: "d4",
    title: "Mechanical Gaming Keyboard RGB",
    category: "Accessories",
    originalPrice: 129.99,
    salePrice: 69.99,
    discount: 46,
    image: "/placeholder.png",
    claimed: 45,
  },
];

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Simple countdown timer for flash deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Banner with Countdown */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-[#202020] to-[#141414] px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <FiZap size={14} /> Flash Deals & Vouchers
          </span>

          <h1 className="mt-4 text-3xl font-black sm:text-5xl">
            Exclusive Deals,{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Unbeatable Prices
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
            Grab limited-time promo vouchers and heavy discounts on best-selling
            tech and essentials before stocks run out.
          </p>

          {/* Flash Clock */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-zinc-800 bg-[#1e1e1e] px-6 py-3 shadow-xl">
            <FiClock className="text-amber-400" size={18} />
            <span className="text-xs font-medium uppercase text-zinc-400">
              Ends in:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-lg font-bold text-white">
              <span className="rounded-lg bg-zinc-800 px-2.5 py-1">
                {String(timeLeft.hours).padStart(2, "0")}h
              </span>
              <span>:</span>
              <span className="rounded-lg bg-zinc-800 px-2.5 py-1">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </span>
              <span>:</span>
              <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-amber-400">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Active Promo Codes Section */}
        <div className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiTag className="text-amber-400" size={20} />
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Active Promo Codes
              </h2>
            </div>
            <span className="text-xs text-zinc-500">Click code to copy</span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {COUPONS.map((coupon) => {
              const isCopied = copiedCode === coupon.code;
              return (
                <div
                  key={coupon.code}
                  className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-zinc-700 bg-[#1c1c1c] p-6 transition hover:border-amber-500/60"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      {coupon.discount}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-white">
                      {coupon.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                      {coupon.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
                    <span className="text-xs text-zinc-500">
                      {coupon.expires}
                    </span>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                      }`}
                    >
                      {isCopied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                      {coupon.code}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Flash Deals Section */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Hot Discount Deals
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                Products marked down up to 50% off MSRP
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 transition hover:text-amber-300"
            >
              View all products <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEALS.map((deal) => (
              <div
                key={deal.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-[#1c1c1c] p-4 transition hover:border-zinc-700 hover:shadow-xl"
              >
                {/* Discount Badge */}
                <div className="absolute left-3 top-3 z-10 rounded-xl bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                  -{deal.discount}%
                </div>

                {/* Product Image */}
                <div>
                  <div className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-900">
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      width={180}
                      height={180}
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <span className="text-xs uppercase tracking-wider text-zinc-500">
                    {deal.category}
                  </span>

                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-white group-hover:text-amber-400">
                    {deal.title}
                  </h3>
                </div>

                {/* Price & Progress */}
                <div className="mt-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-white">
                      ${deal.salePrice}
                    </span>
                    <span className="text-xs text-zinc-500 line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>

                  {/* Stock progress */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] text-zinc-400">
                      <span>Claimed</span>
                      <span className="font-semibold text-amber-400">
                        {deal.claimed}%
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                        style={{ width: `${deal.claimed}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/shop`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 py-2.5 text-xs font-semibold text-zinc-200 transition hover:bg-amber-500 hover:text-black"
                  >
                    <FiShoppingBag size={14} /> Claim Deal
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
