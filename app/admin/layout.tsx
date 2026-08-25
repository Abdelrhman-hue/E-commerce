"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiGrid,
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <FiGrid size={20} />,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: <FiBox size={20} />,
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: <FiUsers size={20} />,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <FiShoppingCart size={20} />,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#171717] text-white">
      {/* ================= Desktop Sidebar ================= */}
      <aside className="hidden w-72 shrink-0 border-r border-zinc-800 bg-[#202020] lg:flex lg:flex-col">
        {/* Logo */}
        <div className="border-b border-zinc-800 p-6">
          <h1 className="text-2xl font-bold">
            Admin
            <span className="text-blue-500"> Panel</span>
          </h1>

          <p className="mt-2 text-sm text-zinc-500">Manage your store</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {item.icon}

              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-5">
          <p className="text-sm text-zinc-500">E-Commerce Admin</p>
        </div>
      </aside>

      {/* ================= Mobile Sidebar Overlay ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= Mobile Sidebar ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-zinc-800 bg-[#202020] transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <div>
            <h1 className="text-xl font-bold">
              Admin
              <span className="text-blue-500"> Panel</span>
            </h1>

            <p className="mt-1 text-xs text-zinc-500">Manage your store</p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {item.icon}

              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-5">
          <p className="text-sm text-zinc-500">E-Commerce Admin</p>
        </div>
      </aside>

      {/* ================= Main Content ================= */}
      <main className="min-w-0 flex-1">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#202020]/90 px-4 backdrop-blur sm:px-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <FiMenu size={24} />
          </button>

          {/* Title */}
          <h2 className="hidden text-lg font-semibold sm:text-xl lg:block">
            Admin Dashboard
          </h2>

          {/* Mobile title */}
          <h2 className="text-lg font-semibold lg:hidden">Admin</h2>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold sm:h-10 sm:w-10 sm:text-base">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
