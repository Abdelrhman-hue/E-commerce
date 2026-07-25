"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1f1f1d] px-6">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-700 bg-[#2b2b2b] p-10 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
          <span className="text-5xl">⚠️</span>
        </div>

        <h1 className="mb-3 text-4xl font-bold text-white">Oops!</h1>

        <p className="mb-2 text-lg text-zinc-300">Something went wrong.</p>

        <p className="mb-8 text-sm text-zinc-500">
          An unexpected error occurred while loading this page. Please try again
          or return to the homepage.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => reset()}
            className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            🔄 Try Again
          </button>

          <Link
            href="/"
            className="flex-1 rounded-xl border border-zinc-600 py-3 font-semibold text-white transition hover:bg-zinc-800"
          >
            🏠 Back Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-xl bg-black/30 p-4 text-left">
            <p className="mb-2 text-xs font-semibold text-red-400">
              Error Details
            </p>

            <pre className="overflow-auto text-xs text-zinc-400">
              {error.message}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
