"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type InputProps = {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ label, name, value, type = "text", onChange }: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-300">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-zinc-700 bg-[#222] px-4 py-3 text-white outline-none transition focus:border-blue-500"
      />
    </div>
  );
}

export default function AddressPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    apartment: "",
    postalCode: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(formData);

    router.push("/cart/payment");
  }

  return (
    <>
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Shipping Address</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />

            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Street Address"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />

          <Input
            label="Apartment (Optional)"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
          />

          <Input
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />

          <button className="mt-6 w-full rounded-xl bg-white py-4 text-lg font-semibold text-black transition hover:bg-gray-200">
            Continue to Payment
          </button>

          <Link
            className="mt-3 p-2.5 rounded-[10px] bg-red-700 transition hover:bg-red-400"
            href={"/cart"}
          >
            Back
          </Link>
        </form>
      </div>
    </>
  );
}
