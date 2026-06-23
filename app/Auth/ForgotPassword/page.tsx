"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/imges/2-Photoroom.png";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="auth-page">
      <div className="card">
        <div className="brand">
          <Image src={logo} alt="logo" width={120} height={70} />
        </div>

        <h2 className="title">Forgot password?</h2>
        <p className="subtitle">
          Enter your email and well send you a reset link
        </p>

        <label className="field">
          <div className="label-text">Email address</div>
          <div className="input">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 6.5v11A2.5 2.5 0 0 0 5.5 20h13A2.5 2.5 0 0 0 21 17.5v-11A2.5 2.5 0 0 0 18.5 4h-13A2.5 2.5 0 0 0 3 6.5z"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
              <path
                d="M4 7.5l8 5 8-5"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
            </svg>
            <input
              type="email"
              placeholder="ahmed@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="right-icon" />
          </div>
        </label>

        <div className={email ? "primary" : "opacity-50 cursor-not-allowed"}>
          {email ? (
            <Link href="/Auth/ForgotPassword/verify-code">Send reset Code</Link>
          ) : (
            <span className="opacity-50 cursor-not-allowed">Send reset Code</span>
          )}
        </div>

        <div className="back">
          <Link href="/Auth" className="back-link">
            ← Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
