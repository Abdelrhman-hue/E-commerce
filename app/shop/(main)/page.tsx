"use client";

import Link from "next/link";
import Image from "next/image";
import api from "@/api/api";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type product = {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  thumbnail?: string | undefined;
  category?: string;
};

export default function Shop() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const categories = searchParams.getAll("category");
  const brands = searchParams.getAll("brand");

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const rating = searchParams.get("rating");
  const inStock = searchParams.get("inStock");
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get("/products", {
        params: {
          page,
          limit,
          category: categories,
          brand: brands,
          minPrice,
          maxPrice,
          rating,
          inStock,
        },
      });

      setProducts(data.products);
      // setTotalPages(data.totalPages);
    };

    fetchProducts();
  }, [searchParams]);
  return (
    <div className="container mx-auto py-5">
      <div style={styles.controls}>
        <select style={styles.select}>
          <option>Sort: Featured</option>
          <option>Price: Low to High</option>
        </select>
      </div>
      <Suspense
        key={page}
        fallback={
          <div className="text-center text-gray-500">Loading products...</div>
        }
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product: product) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group overflow-hidden rounded-2xl border border-zinc-700 bg-[#2b2b2b] transition hover:border-blue-500 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#222] p-6">
                <Image
                  src={product.thumbnail || "/images/placeholder.png"}
                  alt={product.title}
                  width={180}
                  height={180}
                  className="object-contain transition duration-300 group-hover:scale-105"
                />

                {/* Badge */}
                <span className="absolute left-3 top-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  New
                </span>
              </div>

              {/* Product Info */}
              <div className="space-y-2 p-4">
                <h3 className="line-clamp-1 text-lg font-semibold text-white">
                  {product.title}
                </h3>

                <p className="text-sm text-zinc-400">{product.category}</p>

                <p className="line-clamp-2 text-sm text-zinc-500">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-blue-500">
                      ${product.price}
                    </span>

                    {product.oldPrice && (
                      <span className="text-sm text-zinc-500 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/shop/${product.id}`}
                    className="flex p-2 items-center justify-center rounded-xl border border-zinc-600 text-xl text-white transition hover:bg-white hover:text-black"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  );
}

const styles: { [k: string]: React.CSSProperties } = {
  controls: {
    marginBottom: 30,
  },
  select: {
    padding: "6px 8px",
    borderRadius: 6,
    background: "#2a2a2a",
    color: "#eee",
    border: "1px solid #333",
  },
};
