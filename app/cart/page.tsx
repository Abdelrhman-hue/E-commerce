"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import api from "@/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PackageX } from "lucide-react";

type CartItem = {
  _id: string;
  quantity: number;
  product: {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    oldPrice?: number;
    images?: string[];
  };
};

type CartItemProps = {
  item: CartItem;
};
function CartItem({ item }: CartItemProps) {
  return (
    <div className="mb-5 mr-1 flex items-center justify-between rounded-2xl border border-zinc-700 bg-[#1f1f1f] p-5 transition hover:border-blue-500 hover:shadow-lg">
      {/* Left */}
      <div className="flex items-center gap-5">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-900">
          <Image
            src={item.product.images?.[0] || "/placeholder.png"}
            width={100}
            height={100}
            alt={item.product.title}
            className="object-contain transition duration-300 hover:scale-105"
          />
        </div>

        <div className="max-w-lg">
          <h2 className="text-xl font-semibold text-white">
            {item.product.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
            {item.product.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
              {item.product.category}
            </span>

            <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-400">
              Quantity: {item.quantity}
            </span>
          </div>

          <button className="mt-5 flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-400">
            <FiTrash2 size={18} />
            Remove
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="text-right">
        <h2 className="mt-15 text-3xl font-bold text-white">
          ${(item.product.price * item.quantity).toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  tax: number;
};

function OrderSummary({ subtotal, shipping, tax }: OrderSummaryProps) {
  const router = useRouter();
  const total = subtotal + shipping + tax;

  async function handleSubmit() {
    await api.post("/orders").then(() => {
      router.push("/cart/address");
    });
  }

  return (
    <div className=" w-full rounded-2xl border border-gray-700 bg-[#222] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Shipping</span>

          {shipping === 0 ? (
            <span className="font-medium text-green-500">Free</span>
          ) : (
            <span>${shipping.toFixed(2)}</span>
          )}
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <hr className="border-gray-700" />

        <div className="flex justify-between text-xl font-bold text-white">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        disabled={subtotal === 0}
        onClick={handleSubmit}
        className={`mt-8 w-full rounded-xl py-3 text-lg font-semibold transition ${
          subtotal === 0
            ? "cursor-not-allowed bg-gray-500 text-gray-300"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        Proceed to Checkout
      </button>
      <div className="mt-6 flex justify-between text-sm text-gray-400">
        <div className="flex flex-col items-center">
          <span>🔒</span>
          <span>Secure</span>
        </div>

        <div className="flex flex-col items-center">
          <span>↩️</span>
          <span>Easy Returns</span>
        </div>

        <div className="flex flex-col items-center">
          <span>🚚</span>
          <span>Fast Delivery</span>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await api.get("/Mycart");

        setCartItems(data.data.items);
        setTotalPrice(data.data.totalPrice);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  console.log("cartItems", cartItems);
  console.log("totalPrice", totalPrice);

  return (
    <>
      <h1 className="mt-3 ml-2 text-2xl font-bold text-white">Shopping Cart</h1>
      {cartItems.length < 1 ? (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <div className="rounded-full bg-zinc-800 p-6">
            <PackageX size={70} className="text-zinc-400" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-white">
            No Orders Found
          </h1>

          <p className="mt-3 max-w-md text-zinc-400">
            Looks like you haven{"'"}t placed any orders yet. Start shopping and
            your orders will appear here.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/shop"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
            >
              Start Shopping
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-zinc-700 px-6 py-3 text-white transition hover:bg-zinc-800"
            >
              Back Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 p-4">
          <div className="lg:col-span-2 ">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1 border-l border-zinc-700 pl-1">
            <div className="sticky top-6">
              <OrderSummary subtotal={totalPrice} shipping={0} tax={0} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
