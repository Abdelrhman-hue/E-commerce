"use client";
import { useState } from "react";
import Link from "next/link";
import api from "@/api/api";

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);

  async function handleAddToCart() {
    try {
      await api.post("/orders", {
        items: [
          {
            product: product._id,
            quantity: quantity,
          },
        ],
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <>
      <div className="buy-row">
        <div className="qty">
          <button
            className="qty-btn"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <div className="qty-num">{quantity}</div>
          <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
            +
          </button>
        </div>

        <div className="actions" onClick={handleAddToCart}>
          <Link href="/cart" className="btn primary">
            Add to cart
          </Link>
          <Link href="/checkout" className="btn ghost">
            Buy now
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feat">Free delivery</div>
        <div className="feat">30-day return</div>
        <div className="feat">2yr warranty</div>
        <div className="feat">Secure pay</div>
      </div>
    </>
  );
}
