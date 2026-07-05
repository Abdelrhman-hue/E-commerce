import { FiMail, FiInfo } from "react-icons/fi";
import "@/css/EmailVerification.css";
import Image from "next/image";
import logo from "@/public/imges/2-Photoroom.png";
import Link from "next/link";


export default async function EmailVerification({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <div className="verify-container">
      <div className="verify-card">
        {/* Logo */}
        <div className="logo-container">
          <Image src={logo} alt="logo" width={100} height={40} />
        </div>

        {/* Mail Icon */}
        <div className="mail-icon">
          <FiMail />
        </div>

        <h2>Check your email</h2>

        <p className="description">
          We sent a 6-digit code to
          <br />
          <span className="email">{params.email}</span>
          <br />
          Valid for 10 minutes.
        </p>

        <div className="info-box">
          <FiInfo />
          <span>Can{"'"}t find it? Check your spam folder.</span>
        </div>

        <Link href="/Auth/ForgotPassword" className="change-email mr-1.5">← Change email</Link>
        <Link href={`/Auth/ForgotPassword/verify-code/verify?email=${params.email}`} className="verify-btn">Enter code →</Link>

      </div>
    </div>
  );
}
