"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import logo from "@/public/imges/2-Photoroom.png";
import { FaArrowDown } from "react-icons/fa6";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Timer from "@/Components/Timer";
import { useSearchParams } from "next/navigation";
import api from "@/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CODE_LENGTH = 6;

export default function VerifyCodePage() {
  const router = useRouter();
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  function handleChange(value: string, index: number) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];

    nextCode[index] = digit;
    setCode(nextCode);

    if (digit && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);

    if (!pastedCode) {
      return;
    }

    const nextCode = Array(CODE_LENGTH).fill("");

    pastedCode.split("").forEach((digit, index) => {
      nextCode[index] = digit;
    });

    setCode(nextCode);
    inputsRef.current[Math.min(pastedCode.length, CODE_LENGTH) - 1]?.focus();
  }

  //   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //     event.preventDefault();
  //   }

  const handleVerifyCode = async () => {
    const resetCode = code.join("");

    try {
      const response = await api.post("/users/verify-reset-code", {
        email,
        resetCode,
        newPassword: password,
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setTimeout(() => {
      router.push("/Auth");
    }, 2000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#242421] px-4 py-10 text-white">
      <section className="w-full max-w-[300px] rounded-[10px] border border-white/15 bg-[#2d2d2b] px-[22px] py-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
        <div className="mb-6 flex justify-center">
          <Image
            src={logo}
            alt="ShopBag logo"
            width={80}
            height={80}
            priority
            className="h-auto w-[58px] object-contain mix-blend-screen"
          />
        </div>

        <h1 className="text-[15px] font-extrabold leading-tight">
          Enter reset code
        </h1>
        <p className="mt-2 text-[11px] font-normal leading-[1.45] text-[#b9b9b4]">
          Enter the 6-digit code sent to
          <br />
        </p>

        <div className="mt-5">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => {
              const isActive =
                digit || index === code.findIndex((item) => !item);
              const isFilled = /\d/.test(digit);

              return (
                <input
                  key={index}
                  ref={(element) => {
                    inputsRef.current[index] = element;
                  }}
                  aria-label={`Code digit ${index + 1}`}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleChange(event.target.value, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  onPaste={handlePaste}
                  className={[
                    "h-[42px] w-[30px] rounded-[8px] border bg-transparent text-center text-lg font-medium outline-none transition",
                    isActive
                      ? "border-[#87c8ff] bg-[#e7f3ff] text-[#fff]"
                      : isFilled
                        ? "border-[#1476d4] text-[#1682ee]"
                        : "border-white/25 text-white",
                    "focus:border-[#87c8ff] focus:ring-2 focus:ring-[#1682ee]/35",
                  ].join(" ")}
                />
              );
            })}
          </div>

          <h3 className="mt-3 text-[11px] font-normal text-[#b9b9b4]">
            <p className=" text-[13px] mt-3 font-normal text-[#b9b9b4]">
              <MdOutlineMarkEmailRead className="inline" /> Check your email{" "}
              <FaArrowDown className="inline" /> {email}
            </p>
            <span aria-hidden="true">
              <Timer />
            </span>
          </h3>

          <p className="mt-2 text-[11px] font-normal text-[#b9b9b4]">
            Didn&apos;t receive it?{" "}
            <button
              type="button"
              className="font-medium text-white/90 underline-offset-2 hover:underline"
            >
              <Link href={"/Auth/ForgotPassword"}>Resend code</Link>
            </button>
          </p>

          <div className="mt-4 space-y-3 text-left">
            <label className="block">
              <span className="mb-1 block text-[11px] font-normal text-[#b9b9b4]">
                Password
              </span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-9 w-full rounded-[7px] border border-white/20 bg-transparent px-3 text-[12px] font-normal text-white outline-none transition placeholder:text-white/35 focus:border-[#87c8ff] focus:ring-2 focus:ring-[#1682ee]/35"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-normal text-[#b9b9b4]">
                Confirm password
              </span>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="h-9 w-full rounded-[7px] border border-white/20 bg-transparent px-3 text-[12px] font-normal text-white outline-none transition placeholder:text-white/35 focus:border-[#87c8ff] focus:ring-2 focus:ring-[#1682ee]/35"
              />
            </label>
          </div>

          <button
            onClick={handleVerifyCode}
            className="mt-3 h-9 w-full rounded-[7px] border border-white/20 bg-transparent text-[12px] font-extrabold text-white transition hover:border-[#1682ee] hover:text-[#1682ee] focus:outline-none focus:ring-2 focus:ring-[#1682ee]/40"
          >
            Verify Code & Reset Password
          </button>
        </div>

        <Link
          href="/Auth/ForgotPassword"
          className="mt-4 inline-block text-[11px] font-normal text-[#1682ee] hover:underline"
        >
          &larr; Back
        </Link>
      </section>
    </main>
  );
}
