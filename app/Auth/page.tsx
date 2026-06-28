"use client";
import Image from "next/image";
import logoG from "../../public/logo/icons8-google-48.png";
import logoA from "../../public/logo/icons8-apple-logo-50.png";
import logo from "../../public/imges/2-Photoroom.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import api from "@/api/api"
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const postData = async () => {
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });
      console.log("User logged in:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
    }
    
  };

  function handleSubmit() {
    postData().then((data) => {
      router.push("/");
      localStorage.setItem("user", JSON.stringify(data));
    });
  }

  function togglePasswordVisibility() {
    if (showPassword == true) {
      return setShowPassword(false);
    } else {
      return setShowPassword(true);
    }
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);

  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCheck(e.target.checked);
  }

  return (
    <div className="auth-page">
      <div className="card">
        <div
          className="brand"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={logo} alt="Logo" width={120} height={70} />
        </div>

        <h2 className="title">Welcome back</h2>
        <p className="subtitle">Sign in to your account</p>

        <label className="field">
          <div className="label-text">Email address</div>
          <div className="input">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 6.5v11A2.5 2.5 0 0 0 5.5 20h13A2.5 2.5 0 0 0 21 17.5v-11A2.5 2.5 0 0 0 18.5 4h-13A2.5 2.5 0 0 0 3 6.5z"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              <path
                d="M4 7.5l8 5 8-5"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
            </svg>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={handleEmailChange}
            />
            <span className="right-icon" />
          </div>
        </label>

        <label className="field">
          <div className="label-text">
            Password
            <Link className="forgot" href="/Auth/ForgotPassword">
              Forgot?
            </Link>
          </div>
          <div className="input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className="eye"
              aria-label="Toggle password visibility"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>

        <label className="row checkbox-row">
          <input type="checkbox" checked={check} onChange={handleCheckChange} />
          <span className="check-text">Remember me for 30 days</span>
        </label>

        <button className="primary" onClick={handleSubmit}>Sign in</button>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="oauth">
          <button className="oauth-btn google">
            <span className="g">
              <Image src={logoG} alt="Google Logo" />
            </span>
            Continue with Google
          </button>
          <button className="oauth-btn apple">
            <span className="a">
              <Image src={logoA} alt="Apple Logo" />
            </span>
            Continue with Apple
          </button>
        </div>

        <div className="signup">
          No account? <Link href="/Auth/Register">Create one</Link>
        </div>
      </div>

      <style>{`
        html,body,#__next{height:100%}
      `}</style>
    </div>
  );
}
