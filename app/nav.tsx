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

interface User {
  id: string;
  email: string;
  fristname: string;
  lastname: string;
  roles: string[];
}

export default function Nav() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users/me").then((res) => {
          // console.log(res.data);
          setUser(res.data.data);

        });

        // setUser(response.data); // أو response.data حسب شكل الـ API
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    router.refresh();
  }, []);

  // console.log("user", user);
  return (
    <nav className="navbar  ">
      <div className="left">
        <div className="logoWrap">
          <Link href="/">
            <Image src={logo} alt="Logo" width={100} height={100} />
          </Link>
        </div>
        <ul className="navLinks">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop?limit=10&page=1">Shop</Link>
          </li>
          <li>
            <Link href="/about">Offers</Link>
          </li>
          <li>
            <Link href="/contact">About</Link>
          </li>
        </ul>
      </div>

      <div className="center">
        <input className="search" type="text" placeholder="Search..." />
      </div>

      <div className="right">
        <Link href="/cart">
          <LocalGroceryStoreRoundedIcon
            className="icon"
            style={{ fontSize: "32px" }}
          />
        </Link>
        <div className="group relative">
          <Link href={user ? "/profile" : "/Auth"} className="flex items-center gap-1">
            <AccountCircleIcon className="icon" style={{ fontSize: "32px" }} />
            <span className="username mr-2">{user?.fristname ?? "Guest"}</span>
          </Link>

          <div className="pointer-events-none absolute right-0 top-full z-[100] mt-3 w-64 translate-y-2 rounded-lg border border-white/10 bg-[#2d2d2b] p-4 text-left text-white opacity-0 shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <div className="absolute -top-2 right-5 h-4 w-4 rotate-45 border-l border-t border-white/10 bg-[#2d2d2b]" />

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1682ee]/50 bg-[#1682ee]/15 text-sm font-bold text-[#8cc9ff]">
                {user?.fristname?.charAt(0)?.toUpperCase() ?? "G"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  {user ? `${user.fristname} ${user.lastname}` : "Guest user"}
                </p>
                <p className="truncate text-xs font-normal text-[#b9b9b4]">
                  {user?.email ?? "Sign in to view your account"}
                </p>
              </div>
            </div>

            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="text-xs font-normal text-[#b9b9b4]">Role</p>
              <p className="mt-1 text-sm font-semibold text-white capitalize">
                {user?.roles?.join(", ") ?? "Visitor"}
              </p>
            </div>

            {!user ? (
              <Link
                href="/Auth"
                className="mt-4 block rounded-md border border-white/15 px-3 py-2 text-center text-sm font-bold text-white transition hover:border-[#1682ee] hover:text-[#1682ee]"
              >
                Sign in
              </Link>
            ) : null}
          </div>
        </div>
        {user?.fristname ? (
          <Logout
            onLogout={() => {
              setUser(null);
              router.refresh();
            }}
          />
        ) : null}
      </div>

      <style jsx>{``}</style>
    </nav>
  );
}
