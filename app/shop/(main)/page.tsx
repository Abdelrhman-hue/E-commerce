/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import api from "@/api/api";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { FiStar, FiFilter, FiPackage } from "react-icons/fi";

type Product = {
  id?: string | number;
  _id?: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  rating?: number;
  thumbnail?: string;
  images?: string[];
  category?: string;
};

export default function Shop() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("featured");

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);

  const categories = searchParams.getAll("category");
  const brands = searchParams.getAll("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const rating = searchParams.get("rating");
  const inStock = searchParams.get("inStock");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/products", {
          params: {
            page,
            limit,
            category: categories.length ? categories.join(",") : undefined,
            brand: brands.length ? brands.join(",") : undefined,
            minPrice,
            maxPrice,
            rating,
            inStock,
          },
        });

        setProducts(data?.products || []);
      } catch (err) {
        console.error("Shop fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "price-low") {
      return list.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
    if (sortBy === "price-high") {
      return list.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return list;
  }, [products, sortBy]);

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-[#202020] p-4 text-sm">
        <div className="text-zinc-400">
          Showing <span className="font-semibold text-white">{sortedProducts.length}</span>{" "}
          products
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sortSelect" className="text-xs text-zinc-400">
            Sort by:
          </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-medium text-white outline-none focus:border-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-12 text-center text-zinc-400">
          <FiPackage size={40} className="mx-auto mb-3 text-zinc-600" />
          <h3 className="text-lg font-bold text-white">No products match your filters</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Try adjusting your search criteria or price range.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => {
            const prodId = product.id ?? product._id;
            const imageSrc =
              product.thumbnail ||
              product.images?.[0] ||
              "/placeholder.png";

            return (
              <Link
                key={String(prodId)}
                href={`/shop/${prodId}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#202020] transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-zinc-950 p-4">
                  <Image
                    src={imageSrc}
                    alt={product.title}
                    fill
                    className="object-contain p-4 transition duration-300 group-hover:scale-105"
                  />

                  {product.discountPercentage && product.discountPercentage > 0 ? (
                    <span className="absolute left-3 top-3 rounded-md bg-red-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  ) : (
                    <span className="absolute left-3 top-3 rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                      New
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div className="space-y-1.5">
                    {product.category && (
                      <span className="text-[11px] font-medium uppercase tracking-wider text-blue-400">
                        {product.category}
                      </span>
                    )}

                    <h3 className="line-clamp-1 text-base font-semibold text-white group-hover:text-blue-400">
                      {product.title}
                    </h3>

                    <p className="line-clamp-2 text-xs text-zinc-400">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-white">
                          ${Number(product.price || 0).toFixed(2)}
                        </span>
                        {product.discountPercentage && product.discountPercentage > 0 && (
                          <span className="text-xs text-zinc-500 line-through">
                            $
                            {(
                              Number(product.price || 0) *
                              (1 + product.discountPercentage / 100)
                            ).toFixed(2)}
                          </span>
                        )}
                      </div>

                      {product.rating && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-400">
                          <FiStar className="fill-amber-400" size={11} />
                          <span>{product.rating}</span>
                        </div>
                      )}
                    </div>

                    <span className="rounded-xl border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-xs font-medium text-zinc-200 transition group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
