/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
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

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newTag, setNewTag] = useState("");

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: 0,
    description: "",
    category: "",
    thumbnail: "",
    images: [],
    discountPercentage: 0,
    stock: 0,
    tags: [],
    sku: "",
    weight: 0,
    dimensions: { width: 0, height: 0, depth: 0 },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "In Stock",
    returnPolicy: "",
    minimumOrderQuantity: 1,
    meta: { barcode: "" },
  });

  // جلب بيانات المنتج الحالية
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data?.data || res.data;
        console.log(res)
        console.log(data)
        if (data) {
          setFormData({
            title: data.title || "",
            price: data.price || 0,
            description: data.description || "",
            category: data.category || "",
            thumbnail: data.thumbnail || "",
            images: data.images || [],
            discountPercentage: data.discountPercentage || 0,
            stock: data.stock || 0,
            tags: data.tags || [],
            sku: data.sku || "",
            weight: data.weight || 0,
            dimensions: {
              width: data.dimensions?.width || 0,
              height: data.dimensions?.height || 0,
              depth: data.dimensions?.depth || 0,
            },
            warrantyInformation: data.warrantyInformation || "",
            shippingInformation: data.shippingInformation || "",
            availabilityStatus: data.availabilityStatus || "In Stock",
            returnPolicy: data.returnPolicy || "",
            minimumOrderQuantity: data.minimumOrderQuantity || 1,
            meta: { barcode: data.meta?.barcode || "" },
          });
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
    
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "discountPercentage", "stock", "weight", "minimumOrderQuantity"].includes(name)
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
    setSaving(true);
    try {
      await api.put(`/api/products/${id}`, formData);
      toast.success("Product updated successfully");
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-white">Edit Product</h1>
            <p className="text-xs text-zinc-400">ID: {id}</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 disabled:opacity-50"
        >
          <FiSave size={16} />
          {saving ? "Saving Changes..." : "Save Product"}
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
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
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
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-zinc-400">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
              <FiDollarSign className="text-emerald-500" /> Pricing & Inventory
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
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
                  name="discountPercentage"
                  step="0.01"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Stock Units *
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  Min. Order Quantity
                </label>
                <input
                  type="number"
                  name="minimumOrderQuantity"
                  value={formData.minimumOrderQuantity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Logistics & Warranty */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
              <FiTruck className="text-amber-500" /> Shipping & Logistics
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Width (cm)
                </label>
                <input
                  type="number"
                  name="width"
                  value={formData.dimensions.width}
                  onChange={handleDimensionChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.dimensions.height}
                  onChange={handleDimensionChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Depth (cm)
                </label>
                <input
                  type="number"
                  name="depth"
                  value={formData.dimensions.depth}
                  onChange={handleDimensionChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  step="0.1"
                  value={formData.weight}
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
                  placeholder="e.g. Ships in 1-2 business days"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Warranty Information
                </label>
                <input
                  type="text"
                  name="warrantyInformation"
                  value={formData.warrantyInformation}
                  onChange={handleChange}
                  placeholder="e.g. 1 year warranty"
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
                  placeholder="e.g. 30 days return policy"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Media, Tags & Meta */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-4 text-base font-semibold text-white">Thumbnail</h3>
            <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
              {formData.thumbnail ? (
                <Image
                  src={formData.thumbnail}
                  alt="Thumbnail"
                  width={150}
                  height={150}
                  className="h-full w-full object-contain"
                />
              ) : (
                <FiBox size={40} className="text-zinc-600" />
              )}
            </div>
            <input
              type="text"
              name="thumbnail"
              placeholder="Thumbnail Image URL"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Product Images Gallery */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-4 text-base font-semibold text-white">Gallery Images</h3>

            <div className="mb-3 flex gap-2">
              <input
                type="text"
                placeholder="Image URL"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addImage}
                className="flex items-center justify-center rounded-xl bg-zinc-800 px-3 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                <FiPlus size={16} />
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {formData.images.map((img, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-xs"
                >
                  <span className="truncate text-zinc-400 max-w-[180px]">{img}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-4 text-base font-semibold text-white">Tags</h3>
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                placeholder="Add tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addTag}
                className="flex items-center justify-center rounded-xl bg-zinc-800 px-3 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                <FiPlus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-400"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Barcode & Meta */}
          <div className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 shadow-xl">
            <h3 className="mb-4 text-base font-semibold text-white">Metadata</h3>
            <label className="mb-2 block text-xs font-medium text-zinc-400">
              Barcode
            </label>
            <input
              type="text"
              value={formData.meta.barcode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  meta: { ...prev.meta, barcode: e.target.value },
                }))
              }
              placeholder="e.g. 597463984628"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
}