"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import Image from "next/image";
import logo from "../public/imges/2-Photoroom.png";
import Link from "next/link";
import api from "@/api/api";
import { useEffect, useState } from "react";
import Logout from "@/Components/Logout";
import { useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

interface User {
  id: string;
  email: string;
  fristname: string;
  lastname: string;
  roles: string[];
}

export default function Nav() {
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get("/users/me").then((res) => {
          setUser(res.data.data);
        });

        await api.get("/Mycart").then((res) => {
          setOrders(res.data.data.items);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    router.refresh();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/search?q=${encodeURIComponent(search)}`);
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-[#1b1b1b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-8xl items-center justify-between px-4 sm:px-6 lg:h-25">
        {/* Left */}
        <div className="flex items-center gap-6 lg:gap-10">
          <Link
            href="/"
            className="transition hover:scale-105"
            onClick={closeMenu}
          >
            <Image
              src={logo}
              alt="Logo"
              width={90}
              className="sm:w-[110px]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <Link
                href="/"
                className="text-zinc-300 transition hover:text-white"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/shop?limit=10&page=1"
                className="text-zinc-300 transition hover:text-blue-400"
              >
                Shop
              </Link>
            </li>

            <li>
              <Link
                href="/offers"
                className="text-zinc-300 transition hover:text-blue-400"
              >
                Offers
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="text-zinc-300 transition hover:text-blue-400"
              >
                About
              </Link>
            </li>

            {user?.roles?.includes("admin") && (
              <li>
                <Link
                  href="/admin"
                  className="text-zinc-300 transition hover:text-blue-400 font-medium"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 justify-center px-10 lg:flex"
        >
          <div className="flex w-full max-w-xl overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-5 py-3 text-white outline-none placeholder:text-zinc-500"
            />

            <button
              type="submit"
              className="bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-500"
            >
              Search
            </button>
          </div>
        </form>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-5">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative rounded-xl p-2 transition hover:bg-zinc-800"
          >
            <LocalGroceryStoreRoundedIcon
              sx={{ fontSize: 30 }}
              className="text-white"
            />

            {orders.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                {orders.length}
              </span>
            )}
          </Link>

          {/* Profile */}
          <div className="group relative">
            <Link
              href={user ? "/profile" : "/Auth"}
              className="flex items-center gap-2 rounded-xl p-2 transition hover:bg-zinc-800"
            >
              <AccountCircleIcon sx={{ fontSize: 34 }} className="text-white" />

              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold text-white">
                  {user?.fristname ?? "Guest"}
                </p>

                <p className="text-xs text-zinc-400">
                  {user ? "My Account" : "Sign In"}
                </p>
              </div>
            </Link>

            {/* Desktop Dropdown */}
            <div className="pointer-events-none absolute right-0 mt-4 hidden w-72 translate-y-3 rounded-2xl border border-zinc-700 bg-[#242424] p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 md:block">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white">
                  {user?.fristname?.charAt(0).toUpperCase() ?? "G"}
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {user ? `${user.fristname} ${user.lastname}` : "Guest User"}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {user?.email ?? "Login to access your account"}
                  </p>
                </div>
              </div>

              <div className="my-4 border-t border-zinc-700" />

              <div>
                <p className="text-xs text-zinc-500">Role</p>

                <p className="mt-1 text-white capitalize">
                  {user?.roles?.join(", ") ?? "Visitor"}
                </p>
              </div>

              {!user ? (
                <Link
                  href="/Auth"
                  className="mt-5 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
                >
                  Sign In
                </Link>
              ) : (
                <div className="mt-5">
                  <Logout
                    onLogout={() => {
                      setUser(null);
                      router.refresh();
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Burger Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-xl p-2 text-white transition hover:bg-zinc-800 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-zinc-800 bg-[#1b1b1b] transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-5 sm:px-6">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-5">
            <div className="flex overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full min-w-0 bg-transparent px-4 py-3 text-white outline-none placeholder:text-zinc-500"
              />

              <button
                type="submit"
                className="flex shrink-0 items-center justify-center bg-blue-600 px-4 text-white transition hover:bg-blue-500"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/shop?limit=10&page=1"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-blue-400"
            >
              Shop
            </Link>

            <Link
              href="/offers"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-blue-400"
            >
              Offers
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-blue-400"
            >
              About
            </Link>

            {user?.roles?.includes("admin") && (
              <Link
                href="/admin"
                className="text-zinc-300 transition hover:text-blue-400 font-medium"
              >
                Admin Dashboard
              </Link>
            )}

            <Link
              href={user ? "/profile" : "/Auth"}
              onClick={closeMenu}
              className="mt-2 flex items-center gap-3 rounded-xl border border-zinc-700 px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              <AccountCircleIcon sx={{ fontSize: 26 }} />

              <div>
                <p className="text-sm font-semibold text-white">
                  {user ? `${user.fristname} ${user.lastname}` : "Guest"}
                </p>

                <p className="text-xs text-zinc-400">
                  {user ? "My Account" : "Sign In"}
                </p>
              </div>
            </Link>

            {/* Logout */}
            {user && (
              <div className="mt-2">
                <Logout
                  onLogout={() => {
                    setUser(null);
                    setIsMenuOpen(false);
                    router.refresh();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
