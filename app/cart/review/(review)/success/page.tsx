"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-700 bg-[#262626] p-8 text-center shadow-xl">
        <CheckCircle2 size={90} className="mx-auto text-green-500" />

        <h1 className="mt-6 text-4xl font-bold text-white">
          Payment Successful
        </h1>

        <p className="mt-4 text-gray-400">
          Thank you for your purchase.
          <br />
          Your order has been placed successfully.
        </p>

        <div className="mt-8 space-y-4 rounded-xl bg-[#303030] p-5">
          <div className="flex justify-between">
            <span className="text-gray-400">Order Number</span>

            <span className="font-semibold text-white">#ORD-10258</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Payment Status</span>

            <span className="font-semibold text-green-500">Paid</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Estimated Delivery</span>

            <span className="font-semibold text-white">3 - 5 Days</span>
          </div>
        </div>

        <button
          onClick={() => router.push("/cart")}
          className="mt-8 w-full rounded-xl bg-white py-3 text-lg font-semibold text-black transition hover:bg-gray-200"
        >
          View My Orders
        </button>

        <button
          onClick={() => router.push("/shop")}
          className="mt-4 w-full rounded-xl border border-zinc-600 py-3 text-white transition hover:bg-zinc-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
