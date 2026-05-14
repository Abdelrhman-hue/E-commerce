"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/imges/2.png";

export default function Footer() {
  return (
    <footer className="w-full ">
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Image src={logo} alt="Shop Bog logo" width={80} height={60} />
          {/* <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Shop Bog</span> */}
        </div>

        <nav aria-label="Footer Navigation">
          <ul className="flex flex-wrap gap-4 text-sm list-none p-0 m-0">
            <li>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="/privacy"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="/terms"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="/contact"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                href="/support"
              >
                Support
              </Link>
            </li>
          </ul>
        </nav>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Shop Bog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
