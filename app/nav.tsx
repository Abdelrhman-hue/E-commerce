"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import Image from "next/image";
import logo from "../public/imges/2.png";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="navbar container ml-auto mr-auto">
      <div className="left">
        <div className="logoWrap">
          <Image src={logo} alt="Logo" width={70} height={70} />
        </div>
        <ul className="navLinks">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="center">
        <input className="search" type="text" placeholder="Search..." />
      </div>

      <div className="right">
        <LocalGroceryStoreRoundedIcon className="icon" />
        <AccountCircleIcon className="icon" />
      </div>

      <style jsx>{``}</style>
    </nav>
  );
}
