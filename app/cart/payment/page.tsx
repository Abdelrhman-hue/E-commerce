"use client";

import { FaCcVisa, FaCcMastercard, FaLock } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import { useEffect, useState } from "react";
import api from "@/api/api";
import Link from "next/link";

type CartItemProps = {
  item: {
    _id: string;
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    quantity: number;
  };
};

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItemProps["item"][]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderID, setorderID] = useState();
  const tax = 0.03 * totalPrice;

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await api.get("/Mycart");
      //   console.log("Cart items:", response.data.data);
      setCartItems(response.data.data.items);
      setTotalPrice(response.data.data.totalPrice);
    };

    const GetMyOrder = async () => {
      const order = await api.get("/orders/me");
      console.log(order.data.data[0]._id);
      setorderID(order.data.data[0]._id);
    };

    fetchCartItems();
    GetMyOrder();
  }, []);

  async function handlecheckout() {
    setLoading(true);
    const response = await api.post("/payment/checkout", {
      orderId: orderID,
    });

    console.log("url", response.data.url);
    window.location.href = response.data.url;
  }

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="mb-8 text-3xl font-bold text-white">Payment</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left */}

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-zinc-700 bg-[#252525] p-6">
            <h2 className="mb-5 text-xl font-semibold">Payment Method</h2>

            <div className="rounded-xl border border-blue-500 bg-[#303030] p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-white p-2">
                    <SiStripe className="text-4xl text-indigo-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Credit / Debit Card</h3>

                    <p className="text-sm text-gray-400">
                      Secure payment powered by Stripe
                    </p>
                  </div>
                </div>

                <input type="radio" checked readOnly className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-[#252525] p-6">
            <div className="flex items-center gap-3">
              <FaLock className="text-green-500 text-xl" />

              <span className="text-gray-300">
                Your payment is encrypted and processed securely by Stripe.
              </span>
            </div>
          </div>
          <Link
            className="p-2.5 rounded-[10px] bg-red-700 transition hover:bg-red-400"
            href={"/cart/address"}
          >
            Back
          </Link>
        </div>

        {/* Right */}

        <div className="sticky top-5 h-fit rounded-2xl border border-zinc-700 bg-[#252525] p-6">
          <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>

              <span>${totalPrice.toFixed()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Shipping</span>

              <span className="text-green-500">Free</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Tax</span>

              <span>${tax.toFixed()}</span>
            </div>

            <hr className="border-zinc-700" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span>${(totalPrice + tax).toFixed()}</span>
            </div>
          </div>

          <button
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-500"
            disabled={loading}
            onClick={handlecheckout}
          >
            <SiStripe className="text-2xl" />
            {loading ? "Redirecting..." : "Pay with Stripe"}
          </button>

          <div className="mt-8 flex justify-center gap-5 text-4xl text-gray-400">
            <FaCcVisa />

            <FaCcMastercard />
          </div>
        </div>
      </div>
    </div>
  );
}
