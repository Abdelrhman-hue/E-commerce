"use client";
import { usePathname } from "next/navigation";

const checkoutSteps = ["Cart", "Address", "Payment", "Review"];

export default function CheckoutStepper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep = (() => {
    switch (pathname) {
      case "/cart":
        return 0;
      case "/cart/address":
        return 1;
      case "/cart/payment":
        return 2;
      case "/cart/review":
        return 3;
      default:
        return 0;
    }
  })();
  return (
    <main className="flex min-h-[calc(100vh-120px)] items-start justify-center bg-[#1f201e] px-3 py-6 text-white sm:px-5 lg:px-8">
      <section className="w-full max-w-5xl overflow-hidden rounded-lg border border-zinc-700 bg-[#2d2e2b] shadow-2xl shadow-black/30">
        <div>
          {pathname === "/profile/orders" ? (
            ""
          ) : (
            <div className="grid grid-cols-2 gap-4 border-b border-zinc-700 px-4 py-4 text-xs text-zinc-400 sm:grid-cols-4 md:px-6">
              {checkoutSteps.map((step, index) => {
                const isActive = index === currentStep;

                return (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm ${
                        isActive
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-zinc-500 text-zinc-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`font-semibold ${isActive ? "text-white" : "text-zinc-400"}`}
                    >
                      {step}
                    </span>
                    {index < checkoutSteps.length - 1 && (
                      <span className="hidden h-px flex-1 bg-zinc-700 lg:block" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {children}
      </section>
    </main>
  );
}
