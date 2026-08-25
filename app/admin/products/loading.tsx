export default function ProductsSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-8 w-32 animate-pulse rounded-lg bg-zinc-800" />

            <div className="mt-2 h-4 w-52 animate-pulse rounded bg-zinc-900" />
          </div>

          <div className="h-12 w-36 animate-pulse rounded-xl bg-zinc-800" />
        </div>

        {/* Filters */}

        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="h-12 flex-1 animate-pulse rounded-xl bg-zinc-800" />

            <div className="h-12 w-full animate-pulse rounded-xl bg-zinc-800 lg:w-52" />
          </div>
        </div>

        {/* Table */}

        <div className="hidden overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 md:block">
          <div className="h-14 animate-pulse border-b border-zinc-800 bg-zinc-900" />

          <div className="divide-y divide-zinc-800">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex h-24 items-center gap-6 px-6">
                <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-zinc-800" />

                <div className="w-56 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
                  <div className="h-3 w-28 animate-pulse rounded bg-zinc-900" />
                </div>

                <div className="h-7 w-24 animate-pulse rounded-lg bg-zinc-800" />

                <div className="h-4 w-16 animate-pulse rounded bg-zinc-800" />

                <div className="h-7 w-24 animate-pulse rounded-full bg-zinc-800" />

                <div className="ml-auto h-9 w-20 animate-pulse rounded-lg bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Skeleton */}

        <div className="space-y-4 md:hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
            >
              <div className="flex gap-4">
                <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-zinc-800" />

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />

                  <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-900" />

                  <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />
                </div>
              </div>

              <div className="mt-4 h-12 animate-pulse rounded-xl bg-zinc-800" />

              <div className="mt-4 h-10 animate-pulse rounded-xl bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
