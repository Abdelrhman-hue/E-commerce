import Link from "next/link";
import {
  FiShield,
  FiTruck,
  FiHeadphones,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";

const FEATURES = [
  {
    icon: <FiTruck className="h-6 w-6 text-blue-400" />,
    title: "Next-Day Delivery",
    desc: "Lightning-fast shipping options to make sure your items arrive right on time.",
  },
  {
    icon: <FiShield className="h-6 w-6 text-emerald-400" />,
    title: "Guaranteed Security",
    desc: "End-to-end encrypted checkout powered by verified payment gateways like Stripe.",
  },
  {
    icon: <FiAward className="h-6 w-6 text-yellow-400" />,
    title: "Curated Quality",
    desc: "Every single tech gadget, fashion item, and home essential meets strict standards.",
  },
  {
    icon: <FiHeadphones className="h-6 w-6 text-purple-400" />,
    title: "24/7 Support",
    desc: "Our customer success team is always online to assist with orders and returns.",
  },
];

const STATS = [
  { value: "12K+", label: "Products Listed" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50K+", label: "Happy Shoppers" },
  { value: "24/7", label: "Active Tracking" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-[#202020] to-[#171717] py-20 px-6 sm:py-28">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
            Our Mission
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
            Redefining Your Everyday{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Shopping Experience
            </span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-xl">
            We started with a single purpose: connecting modern consumers with
            premium, reliable products without the friction. Built with
            performance, security, and elegance in mind.
          </p>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="border-b border-zinc-800 bg-[#1a1a1a]/60 py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-zinc-800 bg-[#202020] p-6 text-center"
              >
                <div className="text-3xl font-black text-yellow-400 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-medium text-zinc-400 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="py-20 px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Shop With Us?
            </h2>
            <p className="mt-4 text-zinc-400">
              Designed from ground up to prioritize seamless browsing, rapid
              logistics, and customer peace of mind.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-zinc-800 bg-[#202020] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-700/60 transition group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-24 px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-[#222] to-zinc-900 p-8 text-center sm:p-14">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-500/10 blur-3xl" />

          <h2 className="text-2xl font-bold sm:text-4xl">
            Ready to explore the collection?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Browse through hundreds of updated products across electronics,
            fashion, and everyday gear.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:scale-105"
            >
              Start Shopping <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
