"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import api from "@/api/api";
import { FiImage } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CartItemProps = {
  item: {
    _id: string;
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    quantity: number;
  };

  onDelete: () => void;
};
function CartItem({ item, onDelete }: CartItemProps) {
  return (
    <div className="flex items-center justify-between border-b border-t mb-3 border-gray-700 py-6 rounded-3xl mr-1">
      {/* Left */}
      <div className="flex items-center gap-5">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-zinc-800">
          <FiImage className="text-4xl text-zinc-500" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">{item.title}</h2>

          <p className="text-sm text-gray-400 w-[90%]">{item.description}</p>

          <p className="mt-2 text-sm text-gray-300">
            Quantity: {item.quantity}
          </p>

          <button
            onClick={onDelete}
            className="mt-3 flex items-center gap-2 text-sm text-red-500 hover:text-red-400"
          >
            <FiTrash2 />
            Remove
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="text-right">
        <h2 className="text-xl font-bold text-white mr-2">${item.price}</h2>

        {item.oldPrice && (
          <p className="text-gray-500 line-through">${item.oldPrice}</p>
        )}
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
  const [cartItems, setCartItems] = useState<CartItemProps["item"][]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await api.get("/Mycart");
      console.log("Cart items:", response.data.data);
      setCartItems(response.data.data.items);
      setTotalPrice(response.data.data.totalPrice);
    };

    fetchCartItems();
  }, []);

  console.log("cartItems", cartItems);
  console.log("totalPrice", totalPrice);

  return (
    <>
      <h1 className="mt-3 ml-2 text-2xl font-bold text-white">Shopping Cart</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 p-4">
        <div className="lg:col-span-2 ">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={{
                _id: item._id,
                title: item.product.title,
                description: item.product.description,
                price: item.product.price,
                oldPrice: item.product.oldPrice,
                quantity: item.quantity,
              }}
              onDelete={() => {}}
            />
          ))}
        </div>

        <div className="lg:col-span-1 border-l border-zinc-700 pl-1">
          <div className="sticky top-6">
            <OrderSummary subtotal={totalPrice} shipping={0} tax={0} />
          </div>
        </div>
      </div>
    </>
  );
}
