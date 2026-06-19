"use client";
import { useState } from "react";
import Link from "next/link";

export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="buy-row">
        <div className="qty">
          <button className="qty-btn" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
          <div className="qty-num">{quantity}</div>
          <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <div className="actions">
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
