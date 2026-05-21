"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import Image from "next/image";
import logo from "../public/imges/2-Photoroom.png";
import Link from "next/link";

export default function Nav() {
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
            <Link href="/shop">Shop</Link>
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
        <Link href="/cart"><LocalGroceryStoreRoundedIcon className="icon" style={{ fontSize: '32px' }} /></Link>
        <Link href="/Auth"><AccountCircleIcon className="icon" style={{ fontSize: '32px' }} /></Link>
      </div>

      <style jsx>{``}</style>
    </nav>
  );
}
