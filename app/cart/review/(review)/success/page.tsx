"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      localStorage.removeItem("shippingAddress");
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-[#252525] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 size={54} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
          Order Confirmed!
        </h1>

        <p className="mt-3 text-sm text-zinc-400">
          Thank you for your purchase. Your order has been placed and is now
          being processed by our fulfillment team.
        </p>

        <div className="mt-8 space-y-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Status</span>
            <span className="font-semibold text-emerald-400">Confirmed</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Estimated Delivery</span>
            <span className="font-semibold text-white">2 &ndash; 4 Business Days</span>
          </div>
        </div>

        <button
          onClick={() => router.push("/profile/orders")}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
        >
          View My Orders
        </button>

        <button
          onClick={() => router.push("/shop")}
          className="mt-3 w-full rounded-xl border border-zinc-700 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
