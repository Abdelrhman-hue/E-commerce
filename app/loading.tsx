export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#30302E]">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Hero */}
        <section className="rounded-3xl bg-[#1a1a1a] border border-zinc-800 p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="h-8 w-40 rounded-full bg-zinc-700 mb-8" />

              <div className="space-y-4">
                <div className="h-14 w-[90%] rounded bg-zinc-700" />
                <div className="h-14 w-[70%] rounded bg-zinc-700" />
              </div>

              <div className="mt-8 space-y-3">
                <div className="h-5 w-full rounded bg-zinc-800" />
                <div className="h-5 w-5/6 rounded bg-zinc-800" />
                <div className="h-5 w-2/3 rounded bg-zinc-800" />
              </div>

              <div className="mt-10 flex gap-4">
                <div className="h-12 w-36 rounded-xl bg-zinc-700" />
                <div className="h-12 w-36 rounded-xl bg-zinc-800" />
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="h-[360px] w-full max-w-[520px] rounded-3xl bg-zinc-800" />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
              >
                <div className="mx-auto h-10 w-24 rounded bg-zinc-700" />
                <div className="mx-auto mt-4 h-4 w-28 rounded bg-zinc-800" />
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-10 w-28 rounded-full bg-zinc-700"
            />
          ))}
        </div>

        {/* Products Header */}
        <div className="mt-14 flex items-center justify-between">
          <div className="h-8 w-56 rounded bg-zinc-700" />
          <div className="h-6 w-20 rounded bg-zinc-700" />
        </div>

        {/* Products */}
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800 bg-[#1d1d1d] p-4"
            >
              <div className="h-40 rounded-xl bg-zinc-700" />

              <div className="mt-4 h-5 rounded bg-zinc-700" />
              <div className="mt-2 h-4 w-2/3 rounded bg-zinc-800" />
              <div className="mt-4 h-6 w-1/3 rounded bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}