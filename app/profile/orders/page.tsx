/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/api/api";
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";

type OrderItem = {
  _id: string;
  quantity: number;
  price: number;
  product: {
    _id?: string;
    id?: number | string;
    title: string;
    category?: string;
    thumbnail?: string;
    images?: string[];
  };
};

type Order = {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: string;
  isPaid: boolean;
  createdAt: string;
  shippingAddress?: {
    city?: string;
    country?: string;
    street?: string;
    zipCode?: string;
  };
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await api.get("/orders/me");
        const list = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : [];
        setOrders(list);
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <FiCheckCircle size={13} /> Delivered
          </span>
        );
      case "Shipped":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
            <FiTruck size={13} /> Shipped
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
            <FiClock size={13} /> {status || "Processing"}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-[#262626] p-8 text-center sm:p-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800/80 text-zinc-400">
          <FiPackage size={32} />
        </div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          No orders placed yet
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
          Looks like you haven&apos;t ordered anything yet. Browse our store to
          find premium products!
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
        >
          <FiShoppingBag size={18} /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">My Orders</h1>
          <p className="text-sm text-zinc-400">
            Track and view history for {orders.length} order{orders.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          Continue Shopping <FiArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const formattedDate = order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recent";

          return (
            <div
              key={order._id}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#262626] transition hover:border-zinc-700"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 bg-zinc-900/60 p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-500">
                      Order ID
                    </span>
                    <p className="font-mono text-sm font-semibold text-white">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <div className="hidden h-8 w-px bg-zinc-800 sm:block" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-500">
                      Date
                    </span>
                    <p className="text-sm font-medium text-zinc-300">
                      {formattedDate}
                    </p>
                  </div>
                  <div className="hidden h-8 w-px bg-zinc-800 sm:block" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-500">
                      Payment
                    </span>
                    <p className="text-sm font-medium text-zinc-300 capitalize">
                      {order.paymentMethod || "Stripe"} &bull;{" "}
                      <span
                        className={
                          order.paymentStatus === "paid" || order.isPaid
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      >
                        {order.paymentStatus === "paid" || order.isPaid
                          ? "Paid"
                          : "Pending"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-zinc-800/50 p-4 sm:p-5">
                {order.items?.map((item, idx) => {
                  const prod = item.product || ({} as any);
                  const imageSrc =
                    prod.thumbnail ||
                    prod.images?.[0] ||
                    "/placeholder.png";

                  return (
                    <div
                      key={item._id || idx}
                      className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                        <Image
                          src={imageSrc}
                          alt={prod.title || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold text-white">
                          {prod.title || "Product"}
                        </h4>
                        <p className="text-xs text-zinc-400">
                          Qty: {item.quantity} &times; ${Number(item.price || 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-semibold text-white">
                          ${(Number(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 bg-zinc-900/40 p-4 sm:p-5">
                <div className="text-xs text-zinc-400">
                  {order.shippingAddress?.city && (
                    <span>
                      Ship to: {order.shippingAddress.city},{" "}
                      {order.shippingAddress.country}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400">Total:</span>
                  <span className="text-lg font-bold text-white">
                    ${Number(order.totalPrice || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
