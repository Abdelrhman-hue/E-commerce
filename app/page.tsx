import Image from "next/image";
import baner from "../public/imges/modern-man-casual-outfit-showing-shopping-bag-okay-sign-winking-camera-recommending-shop_1258-300002.avif";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" container mx-auto flex flex-col items-center justify-center gap-8 py-12 ">
        <div className="hero flex flex-col md:flex-row items-center justify-between gap-6 w-full mt-10 px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-semibold m-0 leading-tight">
              Shop smarter, live{" "}
              <span className="text-[#ffc403c6] text-xl md:text-4xl drop-shadow-[0_2px_8px_rgba(212,175,55,0.9)]">
                better
              </span>
            </h1>
            <p className="mt-3 text-gray-400 max-w-xl">
              Thousands of products across electronics, fashion, home & more.
              Fast delivery, easy returns.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="ring-4 ring-white p-1 rounded-md bg-transparent">
              <Image
                src={baner}
                alt="Man holding shopping bag"
                style={{
                  display: "block",
                  width: 320,
                  height: "auto",
                  borderRadius: 8,
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center self-start ml-6 gap-6 mb-5 -mt-2">
          <Link
            href="/shop"
            className="inline-block ring-2 ring-white px-4 py-2 rounded-md bg-transparent text-white hover:bg-white/10"
          >
            Shop Now
          </Link>
          <Link
            href="/offers"
            className="inline-block ring-2 ring-white px-4 py-2 rounded-md bg-transparent text-white hover:bg-white/10"
          >
            View Offers
          </Link>
        </div>
        <div className="ml-6 flex gap-3 self-start">
          <div className="flex flex-col mr-4">
            <h2 className="text-white m-0 flex flex-col items-start">
              <span className="text-[#D4AF37] font-extrabold text-4xl md:text-5xl drop-shadow-[0_2px_8px_rgba(212,175,55,0.9)]">
                12k+
              </span>
              <span className="text-2xl md:text-3xl font-semibold text-gray-200">
                Products
              </span>
            </h2>
          </div>

          <div className="flex flex-col mr-4">
            <h2 className="text-white m-0 flex flex-col items-start">
              <span className="text-[#D4AF37] font-extrabold text-4xl md:text-5xl drop-shadow-[0_2px_8px_rgba(212,175,55,0.9)]">
                98%
              </span>
              <span className="text-2xl md:text-3xl font-semibold text-gray-200">
                Happy buyers
              </span>
            </h2>
          </div>

          <div className="flex flex-col mr-4">
            <h2 className="text-white m-0 flex flex-col items-start">
              <span className="text-[#D4AF37] font-extrabold text-4xl md:text-5xl drop-shadow-[0_2px_8px_rgba(212,175,55,0.9)]">
                24h
              </span>
              <span className="text-2xl md:text-3xl font-semibold text-gray-200">
                Fast delivery
              </span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
