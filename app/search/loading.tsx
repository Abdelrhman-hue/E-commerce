export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-10">
      {/* Title */}
      <div className="mb-8 h-10 w-72 animate-pulse rounded-lg bg-zinc-800" />

      {/* Search Bar */}
      <div className="mb-10 h-12 w-full animate-pulse rounded-xl bg-zinc-800" />

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-zinc-700 bg-[#2b2b2b]"
          >
            <div className="aspect-square animate-pulse bg-zinc-800" />

            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-700" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-700" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-700" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-700" />

              <div className="mt-4 h-8 w-24 animate-pulse rounded bg-zinc-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
