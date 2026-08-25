const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-800 ${className}`}
    />
  );
};

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#151515] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-[270px] border-r border-zinc-800 bg-[#1d1d1d] lg:block">
        {/* Logo */}
        <div className="border-b border-zinc-800 px-4 py-7">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="mt-3 h-4 w-28" />
        </div>

        {/* Navigation */}
        <div className="space-y-3 px-3 py-5">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-[270px]">
        {/* Top Header */}
        <header className="flex h-[67px] items-center justify-between border-b border-zinc-800 bg-[#171717] px-6">
          <Skeleton className="h-6 w-36" />

          <Skeleton className="h-10 w-10 rounded-full" />
        </header>

        <div className="p-6">
          {/* Heading */}
          <div className="mb-7">
            <Skeleton className="h-9 w-36" />
            <Skeleton className="mt-3 h-5 w-80" />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex h-[115px] items-center justify-between rounded-2xl border border-zinc-800 bg-[#1e1e1e] p-6"
              >
                <div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-4 h-8 w-20" />
                </div>

                <Skeleton className="h-14 w-14 rounded-xl" />
              </div>
            ))}
          </div>

          {/* Top Orders */}
          <section className="mt-6 rounded-2xl border border-zinc-800 bg-[#1e1e1e] p-6">
            <Skeleton className="h-7 w-32" />

            {/* Table Header */}
            <div className="mt-7 grid grid-cols-5 gap-4 border-b border-zinc-700 pb-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Rows */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="grid grid-cols-5 items-center gap-4 border-b border-zinc-800 py-5 last:border-b-0"
              >
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </section>

          {/* Latest Orders */}
          <section className="mt-6 rounded-2xl border border-zinc-800 bg-[#1e1e1e] p-6">
            <Skeleton className="h-7 w-40" />

            <div className="mt-7">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-zinc-800 py-5 last:border-b-0"
                >
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>

                  <Skeleton className="h-6 w-20 rounded-full" />

                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}