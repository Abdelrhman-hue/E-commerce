"use client";

import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useState, useEffect, use } from "react";
import ProductCard from "@/Components/ProductCard";
import api from "@/api/api";

type Product = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [count, setcount] = useState(0);
  const q = searchParams.get("q");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!q) {
        return notFound;
      }

      const { data } = await api.get("/products", {
        params: {
          q,
        },
      });

      setProducts(data.products);
      setcount(data.count);
    };

    fetchProducts();
  }, [q]);

  return (
    <>
      <h1 className=" m-4 p-1 ">Search: {q}</h1>
      <h3 className="m-4 ">Results: {count}</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ml-6 mb-6 mr-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              title: product.title,
              description: product.description,
              price: product.price,
              oldPrice: product.oldPrice,
              category: product.category,
            }}
          />
        ))}
      </div>
    </>
  );
}
