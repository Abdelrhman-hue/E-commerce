"use client";

import Link from "next/link";
import { FiAlertCircle, FiArrowLeft, FiHome } from "react-icons/fi";

export default function ProductError() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800 bg-[#202020] p-8 text-center shadow-2xl sm:p-12">
        {/* Glow Effects */}
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Icon */}
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
          <FiAlertCircle size={40} />
        </div>

        {/* Text */}
        <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
          404 Error
        </span>

        <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
          Product Not Found
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
          We are sorry, but the product you are looking for does not exist or
          may have been removed.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <FiArrowLeft size={16} />
            Back to Shop
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
          >
            <FiHome size={16} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
