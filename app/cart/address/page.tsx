/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Spinner from "@/Components/Spinner";
import { FiArrowLeft, FiTruck } from "react-icons/fi";

export const addressSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(8, "Phone number is too short")
    .max(15, "Phone number is too long"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  street: z.string().min(4, "Street address is required"),
  apartment: z.string().optional(),
  postalCode: z.string().min(3, "Postal code is required"),
});

export type AddressFormData = z.infer<typeof addressSchema>;

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
};

function Input({
  label,
  type = "text",
  placeholder,
  register,
  error,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-xl border bg-[#202020] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-700 focus:border-blue-500"
        }`}
      />

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function AddressPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shippingAddress");
      if (saved) {
        reset(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, [reset]);

  const onSubmit = async (data: AddressFormData) => {
    try {
      setIsLoading(true);
      localStorage.setItem("shippingAddress", JSON.stringify(data));
      router.push("/cart/payment");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <FiArrowLeft /> Back to Cart
        </Link>
        <span className="text-xs text-zinc-500">Step 2 of 3</span>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-[#252525] p-6 shadow-xl sm:p-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <FiTruck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Shipping Address
            </h1>
            <p className="text-xs text-zinc-400">
              Where should we deliver your order?
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="First Name"
              placeholder="e.g. John"
              register={register("firstName")}
              error={errors.firstName?.message}
            />

            <Input
              label="Last Name"
              placeholder="e.g. Doe"
              register={register("lastName")}
              error={errors.lastName?.message}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              register={register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              register={register("phone")}
              error={errors.phone?.message}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Country"
              placeholder="United States"
              register={register("country")}
              error={errors.country?.message}
            />

            <Input
              label="City"
              placeholder="New York"
              register={register("city")}
              error={errors.city?.message}
            />
          </div>

          <Input
            label="Street Address"
            placeholder="123 Main Street"
            register={register("street")}
            error={errors.street?.message}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Apartment, suite, etc. (optional)"
              placeholder="Apt 4B"
              register={register("apartment")}
              error={errors.apartment?.message}
            />

            <Input
              label="Postal / Zip Code"
              placeholder="10001"
              register={register("postalCode")}
              error={errors.postalCode?.message}
            />
          </div>

          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 disabled:opacity-50 sm:w-auto"
            >
              {isLoading ? <Spinner /> : "Continue to Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
