import Link from "next/link";

export default function LiftingHome() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8">
      {/* Flash Deals */}
      <div className="group rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-[0_0_35px_rgba(250,204,21,.12)] sm:p-8">
        <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-400 sm:text-sm">
          Flash Deals
        </span>

        <h2 className="mt-5 text-xl font-bold text-white sm:text-2xl">
          Electronics up to <span className="text-yellow-400">50% OFF</span>
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
          Limited time offer. Grab your favorite gadgets before the deal ends.
        </p>

        <p className="mt-5 text-sm font-semibold text-red-400 sm:text-base">
          Ends in 02 : 14 : 38
        </p>

        <Link
          href="/shop"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-yellow-300 sm:px-6 sm:text-base"
        >
          Browse Products
        </Link>
      </div>

      {/* Free Shipping */}
      <div className="group rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,.15)] sm:p-8">
        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-400 sm:text-sm">
          Free Shipping
        </span>

        <h2 className="mt-5 text-xl font-bold text-white sm:text-2xl">
          Orders over <span className="text-yellow-400">$50</span> ship free
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
          Save on delivery costs and enjoy fast shipping on eligible orders.
        </p>

        <p className="mt-5 text-sm font-semibold text-blue-400 sm:text-base">
          Coupon Code: <span className="text-white">FREESHIP</span>
        </p>

        <Link
          href="/shop"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl border border-blue-500 px-5 py-3 text-sm font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white sm:px-6 sm:text-base"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
