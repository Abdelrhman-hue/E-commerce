/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FaCcVisa, FaCcMastercard, FaLock, FaMoneyBillWave } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import { FiArrowLeft, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import api from "@/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CartItemProps = {
  item: {
    _id: string;
    product?: {
      title?: string;
      price?: number;
      thumbnail?: string;
    };
    title?: string;
    description?: string;
    price: number;
    quantity: number;
  };
};

export default function PaymentPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemProps["item"][]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderID, setOrderID] = useState<string | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "cash">("stripe");
  const [shippingAddress, setShippingAddress] = useState<any>(null);

  const tax = 0.03 * totalPrice;
  const finalTotal = totalPrice + tax;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shippingAddress");
      if (saved) {
        setShippingAddress(JSON.parse(saved));
      }
    } catch {
      // ignore
    }

    const fetchCartItems = async () => {
      try {
        const response = await api.get("/Mycart");
        if (response.data?.data) {
          setCartItems(response.data.data.items || []);
          setTotalPrice(response.data.data.totalPrice || 0);
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    const getMyOrder = async () => {
      try {
        const order = await api.get("/orders/me");
        if (order.data?.data?.[0]?._id) {
          setOrderID(order.data.data[0]._id);
        }
      } catch (err) {
        console.error("Order fetch error:", err);
      }
    };

    fetchCartItems();
    getMyOrder();
  }, []);

  async function handleCheckout() {
    setLoading(true);

    try {
      if (paymentMethod === "cash") {
        // Cash on delivery
        if (orderID) {
          await api.patch(`/orders/${orderID}`, {
            paymentMethod: "cash",
            shippingAddress,
          }).catch(() => {});
        }
        toast.success("Order placed successfully with Cash on Delivery!");
        router.push("/cart/review/success");
        return;
      }

      // Stripe Payment
      const response = await api.post("/payment/checkout", {
        orderId: orderID,
        shippingAddress,
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        toast.error("Stripe session could not be created");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Checkout error. You can also select Cash on Delivery."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/cart/address"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <FiArrowLeft /> Back to Address
        </Link>
        <span className="text-xs text-zinc-500">Step 3 of 3</span>
      </div>

      <h1 className="mb-8 text-3xl font-bold text-white">Select Payment</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Payment Options & Address Preview */}
        <div className="space-y-6 lg:col-span-2">
          {/* Shipping Address Summary */}
          {shippingAddress && (
            <div className="rounded-2xl border border-zinc-800 bg-[#252525] p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-blue-400" size={18} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Delivering to: {shippingAddress.firstName} {shippingAddress.lastName}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.country} ({shippingAddress.phone})
                    </p>
                  </div>
                </div>
                <Link
                  href="/cart/address"
                  className="text-xs font-medium text-blue-400 hover:text-blue-300"
                >
                  Change
                </Link>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          <div className="rounded-2xl border border-zinc-800 bg-[#252525] p-6 shadow-xl">
            <h2 className="mb-5 text-xl font-semibold text-white">
              Choose Payment Method
            </h2>

            <div className="space-y-4">
              {/* Option 1: Stripe Card */}
              <div
                onClick={() => setPaymentMethod("stripe")}
                className={`cursor-pointer rounded-2xl border p-5 transition ${
                  paymentMethod === "stripe"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-zinc-700 bg-zinc-900/60 hover:border-zinc-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                      <SiStripe className="text-2xl" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        Credit / Debit Card (Stripe)
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Secure instant online checkout
                      </p>
                    </div>
                  </div>

                  <input
                    type="radio"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                    className="h-5 w-5 accent-blue-500"
                  />
                </div>
              </div>

              {/* Option 2: Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod("cash")}
                className={`cursor-pointer rounded-2xl border p-5 transition ${
                  paymentMethod === "cash"
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-zinc-700 bg-zinc-900/60 hover:border-zinc-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                      <FaMoneyBillWave className="text-xl" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        Cash on Delivery (COD)
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Pay with cash upon package receipt
                      </p>
                    </div>
                  </div>

                  <input
                    type="radio"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="h-5 w-5 accent-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-[#252525] p-5 text-sm text-zinc-400">
            <FaLock className="shrink-0 text-emerald-400" />
            <span>
              All transactions are secured, encrypted, and backed by buyer protection.
            </span>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="sticky top-24 h-fit rounded-2xl border border-zinc-800 bg-[#252525] p-6 shadow-xl">
          <h2 className="mb-6 text-xl font-bold text-white">Order Summary</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="font-medium text-white">${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-zinc-400">
              <span>Estimated Shipping</span>
              <span className="font-medium text-emerald-400">Free</span>
            </div>

            <div className="flex justify-between text-zinc-400">
              <span>Estimated Tax (3%)</span>
              <span className="font-medium text-white">${tax.toFixed(2)}</span>
            </div>

            <hr className="border-zinc-800" />

            <div className="flex justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span className="text-xl text-blue-400">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            className={`mt-8 flex w-full items-center justify-center gap-3 rounded-xl py-3.5 text-base font-semibold text-white shadow-lg transition disabled:opacity-50 ${
              paymentMethod === "stripe"
                ? "bg-indigo-600 shadow-indigo-600/30 hover:bg-indigo-500"
                : "bg-emerald-600 shadow-emerald-600/30 hover:bg-emerald-500"
            }`}
            disabled={loading}
            onClick={handleCheckout}
          >
            {paymentMethod === "stripe" ? (
              <SiStripe className="text-2xl" />
            ) : (
              <FiCheckCircle className="text-xl" />
            )}
            {loading
              ? "Processing..."
              : paymentMethod === "stripe"
                ? "Proceed to Stripe Checkout"
                : "Confirm Cash on Delivery"}
          </button>

          <div className="mt-6 flex justify-center gap-4 text-3xl text-zinc-500">
            <FaCcVisa />
            <FaCcMastercard />
          </div>
        </div>
      </div>
    </div>
  );
}
