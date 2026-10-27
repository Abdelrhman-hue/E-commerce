"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FiFilter,
  FiX,
  FiRotateCcw,
  FiCheck,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function ShopPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [ { name: "beauty", count: 98 }, { name: "fragrances", count: 45 }, { name: "furniture", count: 289 }, { name: "groceries", count: 195 } ];

  const brands = [
    { name: "Apple", count: 54 },
    { name: "Samsung", count: 47 },
    { name: "Sony", count: 31 },
    { name: "Nike", count: 28 },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCats = searchParams.getAll("category");
  const selectedBrands = searchParams.getAll("brand");

  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 5000);

  const rating = Number(searchParams.get("rating")) || null;
  const inStock = searchParams.get("inStock");

  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = 12;

  const updateQuery = (
    key: string,
    value: string | number | boolean | string[] | null,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);

    if (value === null) {
      // Deleting key
    } else if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, String(value));
    }

    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
  };

  function getDisplayedPages(curr: number, total: number) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (curr <= 3) return [1, 2, 3, 4, "...", total];
    if (curr >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", curr - 1, curr, curr + 1, "...", total];
  }

  const pagesToShow = getDisplayedPages(currentPage, totalPages);

  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="border-b border-zinc-800 pb-5">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Categories
        </h4>
        <div className="space-y-2">
          {categories.map((c) => {
            const isChecked = selectedCats.includes(c.name);
            return (
              <label
                key={c.name}
                className="flex cursor-pointer items-center justify-between rounded-xl px-2 py-1.5 transition hover:bg-zinc-800/60"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      const next = isChecked
                        ? selectedCats.filter((item) => item !== c.name)
                        : [...selectedCats, c.name];
                      updateQuery("category", next);
                    }}
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-amber-500 transition focus:ring-0"
                  />
                  <span className="text-sm capitalize text-zinc-300">
                    {c.name}
                  </span>
                </div>
                <span className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-500">
                  {c.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="border-b border-zinc-800 pb-5">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Brands
        </h4>
        <div className="space-y-2">
          {brands.map((b) => {
            const isChecked = selectedBrands.includes(b.name);
            return (
              <label
                key={b.name}
                className="flex cursor-pointer items-center justify-between rounded-xl px-2 py-1.5 transition hover:bg-zinc-800/60"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      const next = isChecked
                        ? selectedBrands.filter((item) => item !== b.name)
                        : [...selectedBrands, b.name];
                      updateQuery("brand", next);
                    }}
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-amber-500 transition focus:ring-0"
                  />
                  <span className="text-sm text-zinc-300">{b.name}</span>
                </div>
                <span className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-500">
                  {b.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b border-zinc-800 pb-5">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Price Range
        </h4>
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={maxPrice}
          onChange={(e) => updateQuery("maxPrice", Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-amber-500"
        />
        <div className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-xs text-zinc-500">$</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => updateQuery("minPrice", Number(e.target.value))}
              placeholder="Min"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 py-2 pl-7 pr-2 text-xs text-zinc-200 outline-none focus:border-amber-500"
            />
          </div>
          <span className="text-zinc-600">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-2.5 text-xs text-zinc-500">$</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => updateQuery("maxPrice", Number(e.target.value))}
              placeholder="Max"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 py-2 pl-7 pr-2 text-xs text-zinc-200 outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="border-b border-zinc-800 pb-5">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Minimum Rating
        </h4>
        <div className="space-y-1.5">
          {[5, 4, 3].map((r) => (
            <label
              key={r}
              className="flex cursor-pointer items-center justify-between rounded-xl px-2 py-1.5 transition hover:bg-zinc-800/60"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="rating"
                  checked={rating === r}
                  onChange={() => updateQuery("rating", r)}
                  className="h-4 w-4 border-zinc-700 bg-zinc-900 text-amber-500 accent-amber-500 focus:ring-0"
                />
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={14}
                      className={i < r ? "fill-amber-400 text-amber-400" : "text-zinc-600"}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-zinc-400">{r}.0+</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="pb-2">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Availability
        </h4>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-zinc-800/60">
            <input
              type="radio"
              name="stock"
              checked={inStock === "true"}
              onChange={() => updateQuery("inStock", "true")}
              className="h-4 w-4 border-zinc-700 bg-zinc-900 text-amber-500 accent-amber-500"
            />
            <span className="text-sm text-zinc-300">In Stock</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-zinc-800/60">
            <input
              type="radio"
              name="stock"
              checked={inStock === "false"}
              onChange={() => updateQuery("inStock", "false")}
              className="h-4 w-4 border-zinc-700 bg-zinc-900 text-amber-500 accent-amber-500"
            />
            <span className="text-sm text-zinc-300">Out of Stock</span>
          </label>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => router.push("/shop")}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 py-2.5 text-xs font-medium text-zinc-400 transition hover:border-zinc-500 hover:text-white"
      >
        <FiRotateCcw size={13} />
        Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Shop Catalog
            </h1>
            <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
              Explore our tech, gadgets and lifestyle categories
            </p>
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 lg:hidden"
          >
            <FiFilter size={16} />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-20 rounded-2xl border border-zinc-800 bg-[#1e1e1e] p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="flex items-center gap-2 font-semibold text-zinc-200">
                  <FiFilter size={16} className="text-amber-400" /> Filter Results
                </span>
              </div>
              {renderFilterContent()}
            </div>
          </aside>

          {/* Main Area */}
          <main className="min-w-0 flex-1">
            <div className="min-h-[500px]">{children}</div>

            {/* Pagination Controls */}
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex items-center gap-1.5 rounded-2xl border border-zinc-800 bg-[#1e1e1e] p-2 shadow-lg">
                <Link
                  href={`/shop?page=${Math.max(1, currentPage - 1)}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    currentPage === 1
                      ? "pointer-events-none text-zinc-600"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <FiChevronLeft size={16} />
                </Link>

                {pagesToShow.map((p, idx) => {
                  if (p === "...") {
                    return (
                      <span
                        key={"ellipsis-" + idx}
                        className="flex h-9 w-9 items-center justify-center text-xs text-zinc-500"
                      >
                        …
                      </span>
                    );
                  }

                  const page = p as number;
                  const isActive = page === currentPage;
                  const pageParams = new URLSearchParams(searchParams.toString());
                  pageParams.set("page", String(page));

                  return (
                    <Link
                      key={page}
                      href={`/shop?${pageParams.toString()}`}
                      className={`flex h-9 min-w-[36px] items-center justify-center rounded-xl px-3 text-xs font-semibold transition ${
                        isActive
                          ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      {page}
                    </Link>
                  );
                })}

                <Link
                  href={`/shop?page=${Math.min(totalPages, currentPage + 1)}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    currentPage === totalPages
                      ? "pointer-events-none text-zinc-600"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <FiChevronRight size={16} />
                </Link>
              </nav>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-[#1a1a1a] p-6 shadow-2xl border-l border-zinc-800">
            <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
              <span className="font-semibold text-white">Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>
            {renderFilterContent()}
          </div>
        </div>
      )}
    </div>
  );
}