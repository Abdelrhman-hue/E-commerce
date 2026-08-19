"use client";

import api from "@/api/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  FaRegUser,
  FaRegHeart,
  FaMapMarkerAlt,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import React from "react";

// type ApiOrder = {
//   _id: string;
//   items: ApiOrderItem[];
//   totalPrice: number;
//   status: string;
// };

type CartItem = {
  id: string;
  orderId: string;
  name: string;
  details: string;
  category: string;
  status: string;
  price: number;
  quantity: number;
  icon: "laptop" | "headphones" | "watch";
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [items, setItems] = useState<CartItem[]>([]);
  const [user, setUser] = React.useState<{
    fristname: string;
    email: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await api.get("/orders/me");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getOrders();
  }, []);

  useEffect(() => {
    // Perform any necessary side effects when the component mounts or updates
    api.get("/users/me").then((res) => {
      if (res.status === 200) {
        // Handle successful response
        const user = res.data.data;
        setUser(user);
      }
    });
  }, []);

  const itemCount = items.length;

  function logout() {
    api
      .post("/users/logout")
      .then((res) => {
        if (res.status === 200) {
          // Handle successful logout
          toast.success("Logged out successfully");
        }
        router.push("/Auth");
      })
      .catch((error) => {
        // Handle error
        toast.error("Failed to log out: " + (error.message || "Unknown error"));
      });
  }

  const isActive =
    "flex items-center gap-3 rounded-xl bg-[#333] px-4 py-3 text-blue-400 transition-all hover:bg-[#3d3d3d]";

  const isNotActive =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:bg-[#3d3d3d] hover:text-blue-400";
  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white lg:flex">
      {/* Sidebar */}
      <aside className="w-full border-b border-gray-700 bg-[#262626] p-4 lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
        {/* User */}
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700 sm:h-20 sm:w-20 sm:text-3xl">
            {user?.fristname?.slice(0, 2).toUpperCase()}
          </div>

          <h2 className="mt-3 text-lg font-semibold sm:text-xl">
            {user?.fristname}
          </h2>

          <p className="break-all text-center text-xs text-gray-400 sm:text-sm">
            {user?.email}
          </p>
        </div>

        {/* Menu */}
        <div className="mt-6 flex gap-2 overflow-x-auto lg:mt-8 lg:block lg:space-y-2">
          <Link
            href="/profile"
            className={`${pathname === "/profile" ? isActive : isNotActive} whitespace-nowrap`}
          >
            <FaRegUser />
            <span>Profile</span>
          </Link>

          <Link
            href="/profile/orders"
            className={`${pathname === "/profile/orders" ? isActive : isNotActive} flex justify-between whitespace-nowrap`}
          >
            <div className="flex items-center gap-3">
              <HiOutlineClipboardList />
              My Orders
            </div>

            <span className="rounded-full bg-red-200 px-2 text-xs text-red-700">
              {itemCount}
            </span>
          </Link>

          <Link
            href="/profile/wishlist"
            className={`${pathname === "/profile/wishlist" ? isActive : isNotActive} whitespace-nowrap`}
          >
            <FaRegHeart />
            Wishlist
          </Link>

          <Link
            href="/profile/addresses"
            className={`${pathname === "/profile/addresses" ? isActive : isNotActive} whitespace-nowrap`}
          >
            <FaMapMarkerAlt />
            Addresses
          </Link>

          <Link
            href="/profile/security"
            className={`${pathname === "/profile/security" ? isActive : isNotActive} whitespace-nowrap`}
          >
            <FaLock />
            Security
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-3 text-red-500 transition hover:bg-red-500/10 lg:mt-6 lg:w-full"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
