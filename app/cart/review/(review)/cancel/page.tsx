"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-700 bg-[#262626] p-8 text-center shadow-xl">
        <XCircle size={90} className="mx-auto text-red-500" />

        <h1 className="mt-6 text-4xl font-bold text-white">
          Payment Cancelled
        </h1>

        <p className="mt-4 text-gray-400">
          Your payment was not completed.
          <br />
          Don{"'"}t worry, your order has not been charged.
        </p>

        <div className="mt-8 rounded-xl bg-[#303030] p-5">
          <p className="text-gray-300">
            You can return to your cart and try again whenever you{"'"}re ready.
          </p>
        </div>

        <button
          onClick={() => router.push("/cart")}
          className="mt-8 w-full rounded-xl bg-white py-3 text-lg font-semibold text-black transition hover:bg-gray-200"
        >
          Return to Cart
        </button>

        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full rounded-xl border border-zinc-600 py-3 text-white transition hover:bg-zinc-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
