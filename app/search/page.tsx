/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "@/Components/ProductCard";
import api from "@/api/api";
import Notfound from "@/Components/NotFound";
import Link from "next/link";
import { FiSearch, FiArrowLeft } from "react-icons/fi";

export const dynamic = "force-dynamic";

type Product = {
  _id?: string;
  id?: string | number;
  title: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
  images?: string[];
  thumbnail?: string;
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

async function getSearchResults(q: string | undefined) {
  if (!q) {
    return { products: [], count: 0 };
  }

  try {
    const { data } = await api.get("/products", {
      params: { q },
    });

    return {
      products: (data?.products ?? []) as Product[],
      count: data?.count ?? 0,
    };
  } catch (error) {
    console.error("Search API error:", error);
    return {
      products: [],
      count: 0,
    };
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: searchQuery } = await searchParams;
  const q = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;
  const { products, count } = await getSearchResults(q);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/shop"
            className="mb-2 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
          >
            <FiArrowLeft /> Back to Shop
          </Link>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Search Results for &ldquo;{q || ""}&rdquo;
          </h1>
          <p className="text-xs text-zinc-400">
            Found {count} matching item{count !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {count > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            const prodId = String(product._id || product.id);
            return (
              <ProductCard
                key={prodId}
                product={{
                  id: prodId,
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  oldPrice: product.oldPrice,
                  category: product.category,
                  images: product.images?.length
                    ? product.images
                    : product.thumbnail
                      ? [product.thumbnail]
                      : [],
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-12 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-500">
            <FiSearch size={32} />
          </div>
          <h3 className="text-xl font-bold text-white">No products found</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
            We couldn&apos;t find any products matching &ldquo;{q}&rdquo;. Try
            checking for typos or searching for a broader term.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
