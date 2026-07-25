"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/imges/2.png";

export default function Footer() {
  return (
    <footer className=" border-t border-zinc-800 bg-[#0f0f10]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo & Description */}
          <div>
            <Image
              src={logo}
              alt="Shop Bog"
              width={90}
              height={90}
              className="mb-4"
            />

            <p className="max-w-sm leading-7 text-zinc-400">
              Shop smarter with thousands of premium products, secure payments,
              fast shipping, and an effortless shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="text-zinc-400 transition hover:text-yellow-400"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="/offers"
                  className="text-zinc-400 transition hover:text-yellow-400"
                >
                  Offers
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-zinc-400 transition hover:text-yellow-400"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-zinc-400 transition hover:text-yellow-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Support</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-zinc-400 transition hover:text-yellow-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-zinc-400 transition hover:text-yellow-400"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/support"
                  className="text-zinc-400 transition hover:text-yellow-400"
                >
                  Customer Support
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-zinc-400 transition hover:text-yellow-400"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-zinc-800" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-yellow-400">Shop Bog</span>. All
            rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="#"
              className="text-zinc-500 transition hover:text-yellow-400"
            >
              Facebook
            </Link>

            <Link
              href="#"
              className="text-zinc-500 transition hover:text-yellow-400"
            >
              Instagram
            </Link>

            <Link
              href="#"
              className="text-zinc-500 transition hover:text-yellow-400"
            >
              Twitter
            </Link>

            <Link
              href="#"
              className="text-zinc-500 transition hover:text-yellow-400"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
