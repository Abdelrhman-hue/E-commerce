import Image from "next/image";
import baner from "../public/imges/modern-man-casual-outfit-showing-shopping-bag-okay-sign-winking-camera-recommending-shop_1258-300002.avif";
import Link from "next/link";
import LiftingHome from "@/Components/home";

export default async function Home() {
  // Simulate loading
  // await new Promise(res => setTimeout(res, 3000));

  const category = [ "All", "Electronics", "Fashion", "Home&Living", "Beauty", "Sports"];
  return (
    <>
      <div className="bg-[#30302E]">
        <div className=" container mx-auto flex flex-col items-center justify-center gap-8 py-12  ">
          {/* Hero Section */}
          <div className="hero flex flex-col md:flex-row items-center justify-between gap-6 w-full mt-10 px-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-semibold m-0 leading-tight">
                Shop Smarter, Live{" "}
                <span className="text-[#ffdc6aea] text-xl md:text-4xl drop-shadow-[0_2px_8px_rgba(212,175,55,0.9)]">
                  Better
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
          {/* Hero Section */}
          {/* category */}
          <div className="flex items-center justify-between w-full px-4 pb-4" style={{borderBottom: "2px solid white"}}>
            <div className="flex flex-wrap gap-4">
              {category.map((cat) => (
                <Link
                  key={cat}
                  href={`/shop?category=${cat}`}
                  className="text-sm text-blue-400 hover:text-blue-200"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          {/* category */}
          {/* Product Highlights */}
          <h1 className=" text-2xl font-semibold text-gray-200 self-start ml-4 -mb-17 mt-4">
            Product Highlights
          </h1>
          <Link
            href="/shop"
            className="self-end  text-sm text-blue-400 hover:text-blue-200 mt-4"
          >
            View All
          </Link>
          <div className="flex flex-wrap w-full gap-4  ml-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
              <div key={i} className="h-40 w-36 bg-gray-400 rounded hover:scale-105 transition-transform">
                <Link href={`/product/${i}`} className="block h-full w-full text-center leading-40 text-white font-semibold">
                  Product {i}
                </Link>
              </div>
            ))}
          </div>
          {/* Product Highlights */}
          <LiftingHome />
        </div>
      </div>
    </>
  );
}
