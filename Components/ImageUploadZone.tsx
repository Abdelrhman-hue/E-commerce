/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  FiUploadCloud,
  FiTrash2,
  FiPlus,
  FiLink,
  FiCheckCircle,
  FiStar,
  FiImage,
} from "react-icons/fi";

interface ImageUploadZoneProps {
  images: string[];
  thumbnail: string;
  onChangeImages: (images: string[]) => void;
  onChangeThumbnail: (thumb: string) => void;
  maxFiles?: number;
}

// Client-side image compression helper to keep storage fast and lightweight
async function compressImageFile(
  file: File,
  maxWidth = 1200,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/webp", quality);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export default function ImageUploadZone({
  images,
  thumbnail,
  onChangeImages,
  onChangeThumbnail,
  maxFiles = 8,
}: ImageUploadZoneProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed per product.`);
      return;
    }

    setCompressing(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File "${file.name}" is not an image.`);
          continue;
        }

        const dataUrl = await compressImageFile(file);
        newImages.push(dataUrl);
      }

      if (newImages.length > 0) {
        const updated = [...images, ...newImages];
        onChangeImages(updated);

        // If no thumbnail set yet, use the first image
        if (!thumbnail) {
          onChangeThumbnail(newImages[0]);
        }

        toast.success(`Successfully uploaded ${newImages.length} image(s)!`);
      }
    } catch (err) {
      console.error("Compression error:", err);
      toast.error("Failed to process image files.");
    } finally {
      setCompressing(false);
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    if (images.includes(urlInput.trim())) {
      toast.error("This image URL is already added.");
      return;
    }

    const updated = [...images, urlInput.trim()];
    onChangeImages(updated);
    if (!thumbnail) {
      onChangeThumbnail(urlInput.trim());
    }

    setUrlInput("");
    toast.success("Image URL added to gallery!");
  };

  const handleRemoveImage = (index: number) => {
    const target = images[index];
    const updated = images.filter((_, i) => i !== index);
    onChangeImages(updated);

    if (thumbnail === target) {
      onChangeThumbnail(updated[0] || "");
    }

    toast.info("Image removed.");
  };

  const handleSetThumbnail = (img: string) => {
    onChangeThumbnail(img);
    toast.success("Set as main product thumbnail!");
  };

  return (
    <div className="space-y-4">
      {/* Upload Mode Tabs */}
      <div className="flex border-b border-zinc-800 pb-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex items-center gap-1.5 pb-2 transition ${
            activeTab === "upload"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-zinc-400 hover:text-white"
          } mr-6`}
        >
          <FiUploadCloud size={16} /> Device Upload (رفع من الجهاز)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`flex items-center gap-1.5 pb-2 transition ${
            activeTab === "url"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <FiLink size={15} /> Paste Image URL (إضافة برابط)
        </button>
      </div>

      {/* ================= TAB 1: DRAG & DROP ZONE ================= */}
      {activeTab === "upload" && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
              isDragging
                ? "border-blue-500 bg-blue-500/10 scale-[0.99]"
                : "border-zinc-700 bg-zinc-900/60 hover:border-zinc-500 hover:bg-zinc-900"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-blue-400 shadow-md transition group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
              <FiUploadCloud size={28} />
            </div>

            <h4 className="mt-4 text-sm font-bold text-white">
              {compressing
                ? "Optimizing & Compressing Images..."
                : "Click or Drag & Drop Product Images"}
            </h4>

            <p className="mt-1 text-xs text-zinc-400">
              Supports PNG, JPG, WebP, AVIF up to 10MB (Automatically compressed)
            </p>

            <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-[11px] text-zinc-300">
              <FiPlus /> Browse Device (اختر من جهازك)
            </span>
          </div>
        </div>
      )}

      {/* ================= TAB 2: URL INPUT ================= */}
      {activeTab === "url" && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste public image URL (https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <FiPlus /> Add
          </button>
        </div>
      )}

      {/* ================= PREVIEW GALLERY ================= */}
      {images.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>
              Gallery Preview ({images.length} / {maxFiles} images)
            </span>
            <span className="text-[11px] text-zinc-500">
              Click ⭐ to set as Main Thumbnail
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {images.map((img, idx) => {
              const isThumb = thumbnail === img;

              return (
                <div
                  key={idx}
                  className={`group relative aspect-square overflow-hidden rounded-2xl border-2 bg-zinc-950 p-1 shadow-md transition ${
                    isThumb
                      ? "border-amber-400 ring-2 ring-amber-400/20"
                      : "border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    fill
                    className="object-contain p-2"
                  />

                  {/* Thumbnail Star Badge */}
                  {isThumb && (
                    <span className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-lg bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black shadow">
                      <FiStar size={10} className="fill-black" /> Thumbnail
                    </span>
                  )}

                  {/* Hover Overlay Controls */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/70 opacity-0 backdrop-blur-xs transition group-hover:opacity-100">
                    {!isThumb && (
                      <button
                        type="button"
                        onClick={() => handleSetThumbnail(img)}
                        title="Set as Thumbnail"
                        className="rounded-xl bg-amber-500/90 p-2 text-black transition hover:bg-amber-400"
                      >
                        <FiStar size={16} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      title="Delete Image"
                      className="rounded-xl bg-red-600/90 p-2 text-white transition hover:bg-red-500"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
