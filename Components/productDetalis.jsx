"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import {
  FiShoppingCart,
  FiZap,
  FiTruck,
  FiRotateCcw,
  FiShield,
  FiCreditCard,
} from "react-icons/fi";

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const productId = product?._id || product?.id;

  async function handleAddToCart(redirect = false) {
    if (!productId) {
      toast.error("Product information is missing");
      return;
    }

    try {
      setLoading(true);
      await api.post("/cart", {
        product: productId,
        quantity: quantity,
      });

      toast.success(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart!`);

      if (redirect) {
        router.push("/cart");
      } else {
        router.refresh();
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Please sign in to add items to your cart");
        router.push("/Auth");
      } else {
        toast.error(error?.response?.data?.message || "Failed to add to cart");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleOpenAIChat() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-ai-chat", {
          detail: { product },
        })
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Quantity & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Quantity Controller */}
        <div className="flex h-12 w-36 items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900 px-3">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="font-semibold text-white">{quantity}</span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleAddToCart(false)}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 disabled:opacity-50"
          >
            <FiShoppingCart size={18} />
            {loading ? "Adding..." : "Add to Cart"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleAddToCart(true)}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-6 font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-700 disabled:opacity-50"
          >
            <FiZap size={18} className="text-yellow-400" />
            Buy Now
          </button>
        </div>
      </div>

      {/* AI Assistant Quick Compare Button */}
      <button
        type="button"
        onClick={handleOpenAIChat}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 py-3 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-white"
      >
        <Sparkles className="text-yellow-400" size={15} />
        <span>Compare or Ask AI About This Item / مقارنة بالذكاء الاصطناعي</span>
      </button>

      {/* Trust Mini Badges */}
      <div className="grid grid-cols-2 gap-3 border-t border-zinc-800 pt-6 sm:grid-cols-4">
        <div className="flex items-center gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5 text-xs text-zinc-300">
          <FiTruck className="text-blue-400" size={16} />
          <span>Fast Shipping</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5 text-xs text-zinc-300">
          <FiRotateCcw className="text-emerald-400" size={16} />
          <span>30-Day Return</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5 text-xs text-zinc-300">
          <FiShield className="text-yellow-400" size={16} />
          <span>1-Yr Warranty</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5 text-xs text-zinc-300">
          <FiCreditCard className="text-purple-400" size={16} />
          <span>Secure Pay</span>
        </div>
      </div>
    </div>
  );
}
