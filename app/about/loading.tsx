export default function OffersLoading() {
  return (
    <div className="min-h-screen bg-[#141414] text-white animate-pulse">
      {/* Hero Banner Skeleton */}
      <section className="border-b border-zinc-800 bg-gradient-to-b from-[#202020] to-[#141414] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          {/* Badge */}
          <div className="h-6 w-44 rounded-full bg-zinc-800" />

          {/* Heading */}
          <div className="mt-5 h-10 w-3/4 max-w-md rounded-2xl bg-zinc-800 sm:h-12" />

          {/* Subtitle */}
          <div className="mt-4 h-4 w-full max-w-lg rounded-lg bg-zinc-800/80" />
          <div className="mt-2 h-4 w-2/3 max-w-sm rounded-lg bg-zinc-800/60" />

          {/* Countdown Clock Skeleton */}
          <div className="mt-8 h-12 w-64 rounded-2xl border border-zinc-800 bg-[#1e1e1e]" />
        </div>
      </section>

      {/* Main Content Skeleton */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Coupons Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="h-7 w-48 rounded-xl bg-zinc-800" />
          <div className="h-4 w-28 rounded-lg bg-zinc-800/60" />
        </div>

        {/* Coupons Cards */}
        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-dashed border-zinc-800 bg-[#1c1c1c] p-6 h-48"
            >
              <div className="space-y-3">
                <div className="h-4 w-20 rounded bg-zinc-800" />
                <div className="h-5 w-40 rounded-lg bg-zinc-800" />
                <div className="h-3 w-full rounded bg-zinc-800/60" />
                <div className="h-3 w-4/5 rounded bg-zinc-800/40" />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
                <div className="h-3 w-20 rounded bg-zinc-800/50" />
                <div className="h-8 w-24 rounded-xl bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>

        {/* Flash Deals Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-7 w-56 rounded-xl bg-zinc-800" />
            <div className="h-4 w-40 rounded-lg bg-zinc-800/60" />
          </div>
          <div className="h-4 w-24 rounded-lg bg-zinc-800" />
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#1c1c1c] p-4 h-[420px]"
            >
              <div>
                {/* Image Placeholder */}
                <div className="relative mb-4 h-48 w-full rounded-xl bg-zinc-900" />

                {/* Category & Title */}
                <div className="h-3 w-16 rounded bg-zinc-800" />
                <div className="mt-2.5 h-4 w-full rounded-lg bg-zinc-800" />
                <div className="mt-1.5 h-4 w-3/4 rounded-lg bg-zinc-800" />
              </div>

              {/* Price & Button Placeholder */}
              <div className="mt-5 space-y-4">
                <div className="flex items-baseline gap-2">
                  <div className="h-6 w-20 rounded-lg bg-zinc-800" />
                  <div className="h-4 w-12 rounded bg-zinc-800/60" />
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="h-3 w-12 rounded bg-zinc-800/60" />
                    <div className="h-3 w-8 rounded bg-zinc-800/60" />
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-800" />
                </div>

                {/* Action button */}
                <div className="h-9 w-full rounded-xl bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
