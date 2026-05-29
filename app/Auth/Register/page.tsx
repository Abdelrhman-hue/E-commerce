"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logoG from "../../../public/logo/icons8-google-48.png";
import logoA from "../../../public/logo/icons8-apple-logo-50.png";
import logo from "../../../public/imges/2-Photoroom.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show2Password, setShow2Password] = useState(false);

  function togglePasswordVisibility() {
    if (showPassword == true) {
      return setShowPassword(false);
    } else {
      return setShowPassword(true);
    }
  }

  function togglePassword2Visibility() {
    if (showPassword == true) {
      return setShow2Password(false);
    } else {
      return setShow2Password(true);
    }
  }

  function handleFullNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFullName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  function handleAgreeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAgree(e.target.checked);
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

        <h2 className="title">Create account</h2>
        <p className="subtitle">Start your free account</p>

        <label className="field">
          <div className="label-text">Full name</div>
          <div className="input">
            <input
              value={fullName}
              onChange={handleFullNameChange}
              placeholder="Ahmed Ali"
            />
          </div>
        </label>

        <label className="field">
          <div className="label-text">Email address</div>
          <div className="input">
            <input
              value={email}
              onChange={handleEmailChange}
              placeholder="example@email.com"
            />
          </div>
        </label>

        <label className="field">
          <div className="label-text">Password</div>
          <div className="input">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
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

        <label className="field">
          <div className="label-text">Confirm password</div>
          <div className="input">
            <input
              type={show2Password ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="••••••••"
            />
            <button
              className="eye"
              aria-label="Toggle password visibility"
              onClick={togglePassword2Visibility}
            >
              {show2Password ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>

        <label className="row checkbox-row">
          <input type="checkbox" checked={agree} onChange={handleAgreeChange} />
          <span className="check-text">I agree to the Terms and Privacy</span>
        </label>

        <button className="primary">Create account</button>

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
          Already have an account? <Link href="/Auth">Sign in</Link>
        </div>
      </div>

      <style>{`
        :root{
          --bg:#0f0f0f;
          --card:#1f1f1f;
          --muted:#9b9b9b;
          --text:#e6e6e6;
          --accent:#4aa3ff;
          --primary:#1f845f;
          --input:#2b2b2b;
        }
        .card{
          width:360px;
          background:var(--card);
          border-radius:12px;
          padding:28px;
          box-shadow:0 6px 30px rgba(0,0,0,0.6);
          border:1px solid rgba(255,255,255,0.02);
        }
        .brand{ text-align:center; font-weight:700; font-size:20px; margin-bottom:10px; opacity:0.95 }
        .brand .accent{ color:var(--accent); margin-left:4px }
        .title{ text-align:center; margin:6px 0 4px; font-size:18px }
        .subtitle{ text-align:center; color:var(--muted); font-size:13px; margin:0 0 16px }

        .field{ display:block; margin-bottom:12px; }
        .label-text{ font-size:13px; color:var(--muted); margin-bottom:6px; display:flex; justify-content:space-between; align-items:center }
        .input{
          display:flex;
          align-items:center;
          gap:8px;
          background:var(--input);
          padding:10px 12px;
          border-radius:8px;
          border:1px solid rgba(255,255,255,0.03);
        }
        .input input{
          background:transparent;
          border:0;
          color:var(--text);
          outline:none;
          width:100%;
          font-size:14px;
        }
        .eye{ background:transparent; border:0; cursor:default; color:rgba(255,255,255,0.45) }

        .row{ display:flex; align-items:center; gap:10px; }
        .checkbox-row input{ width:16px; height:16px; accent-color:var(--accent) }
        .check-text{ font-size:13px; color:var(--muted) }

        .primary{
          width:100%;
          margin-top:8px;
          padding:10px 12px;
          background:var(--primary);
          color:white;
          border:0;
          border-radius:8px;
          font-weight:600;
          cursor:default;
          box-shadow:0 2px 0 rgba(0,0,0,0.2);
        }

        .divider{
          font-size:12px;
          color:var(--muted);
          text-align:center;
          margin:14px 0;
          position:relative;
        }
        .divider span{ background:transparent; padding:0 10px }
        .divider:before{
          content:"";
          display:block;
          height:1px;
          background:rgba(255,255,255,0.03);
          position:absolute;
          left:12px; right:12px; top:50%; transform:translateY(-50%);
          z-index:0;
        }

        .oauth{ display:flex; gap:10px; flex-direction:column; }
        .oauth-btn{
          display:flex;
          gap:10px;
          align-items:center;justify-content:flex-start;
          padding:10px 12px;
          border-radius:8px;
          background:transparent;
          color:var(--text);
          border:1px solid rgba(255,255,255,0.04);
          cursor:pointer;
          font-weight:600;
        }
        .oauth-btn .g, .oauth-btn .a{
          display:inline-flex;
          width:28px;height:28px;
          align-items:center;justify-content:center;
          border-radius:6px;
          background:rgba(255,255,255,0.04);
          color:var(--muted);
          font-weight:700;
        }
        .oauth-btn.google .g{ background:linear-gradient(90deg,#fff,#eee); color:#b00; }
        .oauth-btn.apple .a{ background:#000; color:#fff }

        .signup{ text-align:center; margin-top:12px; color:var(--muted); font-size:13px }
        .signup a{ color:var(--accent); text-decoration:none }

        @media (max-width:420px){
          .card{ width:100%; padding:20px }
        }
      `}</style>
    </div>
  );
}
