"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiHeadphones,
  FiLock,
  FiMinus,
  FiMonitor,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
  FiTruck,
  FiWatch,
} from "react-icons/fi";
import { usePathname } from "next/navigation";

import api from "@/api/api";

type CartItem = {
  id: string;
  orderId: string;
  name: string;
  details: string;
  category: string;
  status: string;
  price: number;
  quantity: number;
  icon: "laptop" | "headphones" | "watch";
};

type ApiProduct = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
};

type ApiOrderItem = {
  _id: string;
  product: ApiProduct;
  quantity: number;
  price: number;
};

type ApiOrder = {
  _id: string;
  items: ApiOrderItem[];
  totalPrice: number;
  status: string;
};

const checkoutSteps = ["Cart", "Address", "Payment", "Review"];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatPrice(value: number) {
  return currency.format(value);
}

function getIconByCategory(category: string): CartItem["icon"] {
  if (category.toLowerCase().includes("groceries")) {
    return "watch";
  }

  if (category.toLowerCase().includes("furniture")) {
    return "laptop";
  }

  return "headphones";
}

function mapOrdersToCartItems(orders: ApiOrder[]): CartItem[] {
  return orders.flatMap((order) =>
    order.items.map((item) => ({
      id: item._id,
      orderId: order._id,
      name: item.product.title,
      details: item.product.description,
      category: item.product.category,
      status: order.status,
      price: item.price ?? item.product.price,
      quantity: item.quantity,
      icon: getIconByCategory(item.product.category),
    })),
  );
}

function ProductIcon({ type }: { type: CartItem["icon"] }) {
  const className = "h-5 w-5 text-zinc-400";

  if (type === "headphones") {
    return <FiHeadphones className={className} />;
  }

  if (type === "watch") {
    return <FiWatch className={className} />;
  }

  return <FiMonitor className={className} />;
}

function CheckoutStepper() {
  const pathname = usePathname();
  return (
    <div>
      {pathname === "/cart" ? (
        <div className="grid grid-cols-2 gap-4 border-b border-zinc-700 px-4 py-4 text-xs text-zinc-400 sm:grid-cols-4 md:px-6">
          {checkoutSteps.map((step, index) => {
            const isActive = index === 0;

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
      ) : (
        ""
      )}
    </div>
  );
}

function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex h-8 items-center overflow-hidden rounded-md border border-zinc-600 bg-[#232321]">
      <button
        type="button"
        onClick={onDecrease}
        className="flex h-full w-8 items-center justify-center text-zinc-300 transition hover:bg-zinc-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <FiMinus className="h-3.5 w-3.5" />
      </button>
      <span className="flex h-full w-8 items-center justify-center border-x border-zinc-600 text-sm font-bold text-white">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="flex h-full w-8 items-center justify-center text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
        aria-label="Increase quantity"
      >
        <FiPlus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function CartRow({
  item,
  onDecrease,
  onIncrease,
}: {
  item: CartItem;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  const itemTotal = item.price * item.quantity;

  return (
    <article className="grid gap-4 border-b border-zinc-700 py-4 sm:grid-cols-[1fr_auto] sm:items-start">
      <div className="flex gap-3 sm:gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-[#242422]">
          <ProductIcon type={item.icon} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-white sm:text-base">
            {item.name}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-xs font-medium text-zinc-400">
            {item.details}
          </p>
          <p className="mt-1 text-xs font-bold capitalize text-zinc-500">
            {item.category} - {item.status} - Order #{item.orderId.slice(-6)}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <QuantityControl
              quantity={item.quantity}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
            />
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
              aria-label={`Remove ${item.name}`}
            >
              <FiTrash2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="text-xs font-semibold text-blue-500 transition hover:text-blue-300"
            >
              Save for later
            </button>
          </div>
        </div>
      </div>

      <div className="text-left sm:text-right">
        <p className="text-xs font-bold text-zinc-500">
          {formatPrice(item.price)} each
        </p>
        <p className="text-base font-extrabold text-white">
          {formatPrice(itemTotal)}
        </p>
      </div>
    </article>
  );
}

function CouponForm() {
  return (
    <form className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
      <label className="sr-only" htmlFor="coupon-code">
        Coupon code
      </label>
      <input
        id="coupon-code"
        type="text"
        placeholder="Coupon code"
        className="h-12 rounded-md border border-zinc-700 bg-[#2b2b29] px-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
      />
      <button
        type="submit"
        className="h-12 rounded-md border border-zinc-600 px-5 text-base font-extrabold text-white transition hover:bg-zinc-700"
      >
        Apply
      </button>
    </form>
  );
}

function OrderSummary({
  subtotal,
  itemCount,
}: {
  subtotal: number;
  itemCount: number;
}) {
  const tax = Math.round(subtotal * 0.14);
  const total = subtotal + tax;

  return (
    <aside className="border-zinc-700 p-4 md:border-l md:p-6">
      <h2 className="mb-4 text-base font-extrabold text-white">
        Order summary
      </h2>

      <div className="rounded-lg bg-[#232321] p-4">
        <div className="space-y-3 border-b border-zinc-700 pb-4 text-sm">
          <SummaryLine
            label={`Subtotal (${itemCount} items)`}
            value={subtotal}
          />
          <div className="flex items-center justify-between gap-4">
            <span className="font-bold text-zinc-300">Shipping</span>
            <span className="font-bold text-emerald-500">Free</span>
          </div>
          <SummaryLine label="Tax (14%)" value={tax} />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-base font-extrabold text-white">Total</span>
          <span className="text-lg font-extrabold text-white">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md border border-zinc-600 text-base font-extrabold text-white transition hover:bg-zinc-700"
      >
        Proceed to checkout
        <FiArrowRight className="h-4 w-4" />
      </button>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold leading-tight text-zinc-500">
        <span className="flex items-center justify-center gap-1">
          <FiLock className="h-3 w-3" />
          Secure
        </span>
        <span className="flex items-center justify-center gap-1">
          <FiRefreshCw className="h-3 w-3" />
          Easy returns
        </span>
        <span className="flex items-center justify-center gap-1">
          <FiTruck className="h-3 w-3" />
          Fast delivery
        </span>
      </div>
    </aside>
  );
}

function SummaryLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-bold text-zinc-300">{label}</span>
      <span className="font-extrabold text-zinc-200">{formatPrice(value)}</span>
    </div>
  );
}

export default function CartContent() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function getOrders() {
      try {
        setIsLoading(true);
        setError("");

        const response = await api.get<ApiOrder[]>("/orders/me");

        if (!ignore) {
          setItems(mapOrdersToCartItems(response.data));
        }
      } catch {
        if (!ignore) {
          setError("Could not load your cart orders.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    getOrders();

    return () => {
      ignore = true;
    };
  }, []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const updateQuantity = (id: string, direction: "increase" | "decrease") => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const nextQuantity =
          direction === "increase"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);

        return { ...item, quantity: nextQuantity };
      }),
    );
  };

  return (
    <main className="flex min-h-[calc(100vh-120px)] items-start justify-center bg-[#1f201e] px-3 py-6 text-white sm:px-5 lg:px-8">
      <section className="w-full max-w-5xl overflow-hidden rounded-lg border border-zinc-700 bg-[#2d2e2b] shadow-2xl shadow-black/30">
        <CheckoutStepper />

        <div className="grid md:grid-cols-[1fr_320px]">
          <div className="p-4 md:p-6">
            <h1 className="text-base font-extrabold text-white">
              Shopping cart{" "}
              <span className="text-sm font-semibold text-zinc-400">
                ({itemCount} items)
              </span>
            </h1>

            <div className="mt-3">
              {isLoading && (
                <div className="rounded-md border border-zinc-700 bg-[#232321] p-4 text-sm font-semibold text-zinc-300">
                  Loading your cart...
                </div>
              )}

              {!isLoading && error && (
                <div className="rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm font-semibold text-red-200">
                  {error}
                </div>
              )}

              {!isLoading && !error && items.length === 0 && (
                <div className="rounded-md border border-zinc-700 bg-[#232321] p-4 text-sm font-semibold text-zinc-300">
                  Your cart is empty.
                </div>
              )}

              {!isLoading &&
                !error &&
                items.map((item) => (
                  <CartRow
                    key={item.id}
                    item={item}
                    onDecrease={() => updateQuantity(item.id, "decrease")}
                    onIncrease={() => updateQuantity(item.id, "increase")}
                  />
                ))}
            </div>

            <CouponForm />
          </div>

          <OrderSummary subtotal={subtotal} itemCount={itemCount} />
        </div>
      </section>
    </main>
  );
}
