/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  FiArrowLeft,
  FiSave,
  FiTrash2,
  FiPlus,
  FiBox,
  FiDollarSign,
  FiTruck,
  FiShield,
  FiInfo,
} from "react-icons/fi";
import api from "@/api/api";

interface ProductFormData {
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  thumbnail: string;
  images: string[];
  discountPercentage: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    barcode: string;
  };
}

export default function AddProductPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newTag, setNewTag] = useState("");

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: 0,
    description: "",
    category: "",
    brand: "",
    thumbnail: "",
    images: [],
    discountPercentage: 0,
    stock: 10,
    tags: [],
    sku: "",
    weight: 1,
    dimensions: { width: 10, height: 10, depth: 10 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 2-4 business days",
    availabilityStatus: "In Stock",
    returnPolicy: "30-day return policy",
    minimumOrderQuantity: 1,
    meta: { barcode: "" },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: [
        "price",
        "discountPercentage",
        "stock",
        "weight",
        "minimumOrderQuantity",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [name]: Number(value),
      },
    }));
  };

  const addImage = () => {
    if (!newImage.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImage.trim()],
    }));
    if (!formData.thumbnail) {
      setFormData((prev) => ({ ...prev, thumbnail: newImage.trim() }));
    }
    setNewImage("");
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (!newTag.trim() || formData.tags.includes(newTag.trim())) return;
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag.trim()],
    }));
    setNewTag("");
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || formData.price <= 0) {
      toast.error("Please fill required fields (Title, Category, Price)");
      return;
    }

    setSaving(true);
    try {
      await api.post("/products/add", formData);
      toast.success("Product created successfully");
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-6xl space-y-8 pb-16">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-[#202020] text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Product</h1>
            <p className="text-xs text-zinc-400">
              Create a new item in your inventory
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 disabled:opacity-50"
        >
          <FiSave size={16} />
          {saving ? "Creating Product..." : "Create Product"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* General Information */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
              <FiInfo className="text-blue-500" /> General Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-zinc-400">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    required
                    placeholder="e.g. electronics, beauty, fashion"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-zinc-400">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="e.g. Apple, Sony, Nike"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Detailed product description..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
              <FiDollarSign className="text-green-500" /> Pricing & Inventory
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Discount (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Stock Units
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Product Media */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
              <FiBox className="text-purple-500" /> Images
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Thumbnail Image URL
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  placeholder="https://example.com/image.jpg"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Gallery Images
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter image URL and click Add"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="inline-flex items-center gap-1 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
                  >
                    <FiPlus /> Add
                  </button>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-2">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900"
                    >
                      <Image
                        src={img}
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute right-2 top-2 rounded-lg bg-red-600/80 p-1.5 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Logistics & Meta */}
        <div className="space-y-6">
          {/* Shipping & Policy */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
              <FiTruck className="text-orange-500" /> Shipping & Logistics
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Availability Status
                </label>
                <select
                  name="availabilityStatus"
                  value={formData.availabilityStatus}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  placeholder="e.g. ELE-SON-001"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Shipping Info
                </label>
                <input
                  type="text"
                  name="shippingInformation"
                  value={formData.shippingInformation}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Return Policy
                </label>
                <input
                  type="text"
                  name="returnPolicy"
                  value={formData.returnPolicy}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
              <FiShield className="text-cyan-500" /> Tags
            </h3>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="rounded-xl bg-zinc-800 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-700"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-xs text-zinc-300"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-zinc-400 hover:text-red-400"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
