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
    "flex items-center gap-3 rounded-lg bg-[#333] px-4 py-3 text-blue-500 transition hover:bg-[#3d3d3d]";
  const isNotActive =
    "flex items-center gap-3 rounded-lg px-4 py-3 text-blue-500 transition hover:bg-[#3d3d3d]";

  return (
    <div className="flex min-h-screen bg-[#1f1f1f] text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-700 bg-[#262626] p-6">
        {/* User */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
            {user?.fristname.charAt(0).toUpperCase()}
            {user?.fristname.charAt(1).toUpperCase()}
          </div>

          <h2 className="mt-4 text-xl font-semibold">{user?.fristname}</h2>

          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>

        {/* Menu */}
        <div className="mt-8 space-y-2">
          <Link
            href="/profile"
            className={pathname === "/profile" ? isActive : isNotActive}
          >
            <FaRegUser />
            Profile
          </Link>

          <Link
            href="/profile/orders"
            className={pathname === "/profile/orders" ? isActive : isNotActive}
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
            className={
              pathname === "/profile/wishlist" ? isActive : isNotActive
            }
          >
            <FaRegHeart />
            Wishlist
          </Link>

          <Link
            href="/profile/addresses"
            className={
              pathname === "/profile/addresses" ? isActive : isNotActive
            }
          >
            <FaMapMarkerAlt />
            Addresses
          </Link>

          <hr className="my-4 border-gray-700" />

          <Link
            href="/profile/security"
            className={
              pathname === "/profile/security" ? isActive : isNotActive
            }
          >
            <FaLock />
            Security
          </Link>

          <button
            onClick={logout}
            className="mt-6 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 transition hover:bg-red-500/10"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
