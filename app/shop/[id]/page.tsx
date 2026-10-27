/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetails from "@/Components/productDetalis";
import api from "@/api/api";
import {
  FiStar,
  FiArrowLeft,
  FiBox,
  FiTruck,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        const prod = res.data;
        if (!prod || prod === "") {
          setProduct(null);
          return;
        }
        setProduct(prod);
        const initialImg =
          prod.images?.[0] || prod.thumbnail || "/placeholder.png";
        setSelectedImage(initialImg);

        // Fetch related products
        const relRes = await api.get("/products", {
          params: { category: prod.category, limit: 4 },
        });
        const prods = relRes.data?.products ?? [];
        setRelatedProducts(
          prods.filter(
            (p: any) => String(p._id || p.id) !== String(prod._id || prod.id)
          )
        );
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const galleryImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.thumbnail
      ? [product.thumbnail]
      : ["/placeholder.png"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb / Back Link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <FiArrowLeft /> Back to Shop
        </Link>
        {product.category && (
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
            {product.category}
          </span>
        )}
      </div>

      {/* Main Grid: Gallery on Left, Details on Right */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* ================= LEFT: IMAGE GALLERY ================= */}
        <div className="space-y-4">
          {/* Active Big Image */}
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-zinc-800 bg-[#1c1c1c] p-6 shadow-2xl">
            <Image
              src={selectedImage || galleryImages[0]}
              alt={product.title || "Product Image"}
              fill
              className="object-contain p-6 transition duration-300 hover:scale-105"
              priority
            />
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 rounded-xl bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                Save {Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-[#1c1c1c] p-2 transition ${
                    selectedImage === img
                      ? "border-blue-500 ring-2 ring-blue-500/20"
                      : "border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= RIGHT: PRODUCT DETAILS ================= */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {product.brand && (
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                {product.brand}
              </p>
            )}

            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              {product.title}
            </h1>

            {/* Rating and Stock */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-amber-400">
                <FiStar className="fill-amber-400" />
                <span className="font-bold text-white">
                  {product.rating ?? "4.8"}
                </span>
                <span className="text-zinc-500">
                  ({product.reviews?.length || 120} reviews)
                </span>
              </div>

              <span className="text-zinc-600">&bull;</span>

              <span className="inline-flex items-center gap-1 text-emerald-400">
                <FiCheckCircle size={14} />
                {product.availabilityStatus || "In Stock"}{" "}
                {product.stock != null && `(${product.stock} units)`}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-4xl font-black text-white">
                ${Number(product.price || 0).toFixed(2)}
              </span>

              {product.discountPercentage && product.discountPercentage > 0 && (
                <span className="text-lg text-zinc-500 line-through">
                  $
                  {(
                    Number(product.price || 0) *
                    (1 + product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-zinc-400">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Actions */}
          <div className="rounded-2xl border border-zinc-800 bg-[#222222] p-6 shadow-xl">
            <ProductDetails product={product} />
          </div>

          {/* Interactive Information Tabs */}
          <div className="rounded-2xl border border-zinc-800 bg-[#1e1e1e] p-5 shadow-lg">
            <div className="flex border-b border-zinc-800 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab("desc")}
                className={`pb-2 text-sm font-semibold transition ${
                  activeTab === "desc"
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "text-zinc-400 hover:text-white"
                } mr-6`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`pb-2 text-sm font-semibold transition ${
                  activeTab === "specs"
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "text-zinc-400 hover:text-white"
                } mr-6`}
              >
                Specifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`pb-2 text-sm font-semibold transition ${
                  activeTab === "reviews"
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Reviews ({product.reviews?.length || 0})
              </button>
            </div>

            <div className="pt-4 text-sm text-zinc-300">
              {activeTab === "desc" && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  {product.warrantyInformation && (
                    <p className="text-xs text-zinc-400">
                      <strong>Warranty:</strong> {product.warrantyInformation}
                    </p>
                  )}
                  {product.returnPolicy && (
                    <p className="text-xs text-zinc-400">
                      <strong>Return Policy:</strong> {product.returnPolicy}
                    </p>
                  )}
                </div>
              )}

              {activeTab === "specs" && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-zinc-900/60 p-3">
                    <span className="text-zinc-500">SKU</span>
                    <p className="font-semibold text-white">
                      {product.sku || "N/A"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-zinc-900/60 p-3">
                    <span className="text-zinc-500">Weight</span>
                    <p className="font-semibold text-white">
                      {product.weight ? `${product.weight} kg` : "N/A"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-zinc-900/60 p-3">
                    <span className="text-zinc-500">Category</span>
                    <p className="font-semibold text-white capitalize">
                      {product.category || "General"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-zinc-900/60 p-3">
                    <span className="text-zinc-500">Shipping</span>
                    <p className="font-semibold text-white">
                      {product.shippingInformation || "Standard Shipping"}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-3">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev: any, i: number) => (
                      <div
                        key={i}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">
                            {rev.reviewerName || "Verified Buyer"}
                          </span>
                          <span className="flex items-center text-xs text-amber-400">
                            ★ {rev.rating}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-zinc-400">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-500">
                      No customer reviews yet. Be the first to review!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-zinc-800 pt-10">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">You May Also Like</h3>
            <Link
              href="/shop"
              className="text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.slice(0, 4).map((rel: any) => {
              const relId = rel.id ?? rel._id;
              const relImage =
                rel.thumbnail || rel.images?.[0] || "/placeholder.png";

              return (
                <Link
                  key={String(relId)}
                  href={`/shop/${relId}`}
                  className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-950 p-2">
                    <Image
                      src={relImage}
                      alt={rel.title || "Product"}
                      fill
                      className="object-contain p-2 transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="mt-3 line-clamp-1 text-sm font-semibold text-white group-hover:text-blue-400">
                    {rel.title}
                  </h4>
                  <p className="mt-1 text-base font-bold text-white">
                    ${Number(rel.price || 0).toFixed(2)}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
