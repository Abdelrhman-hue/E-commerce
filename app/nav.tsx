"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import Image from "next/image";
import logo from "../public/imges/2-Photoroom.png";
import Link from "next/link";
import api from "@/api/api";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  fristname: string;
  lastname: string;
  roles: string[];
}

export default function Nav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users/me").then(
          (res) => {
            console.log(res.data);
            setUser(res.data.data);
          }
        );

        // setUser(response.data); // أو response.data حسب شكل الـ API
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);
  
  console.log("user", user)
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
        <Link href="/Auth">
          <AccountCircleIcon className="icon" style={{ fontSize: "32px" }} />
          <span className="username mr-2">{user?.fristname ?? "Guest"}</span>
        </Link>
      </div>

      <style jsx>{``}</style>
    </nav>
  );
}
