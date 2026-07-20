"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UseFormRegisterReturn } from "react-hook-form";
import Spinner from "@/Components/Spinner";

export const addressSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  street: z.string().min(5, "Street address is required"),
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
      <label className="mb-2 block text-sm text-gray-300">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-xl border bg-[#222] px-4 py-3 text-white outline-none transition ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-700 focus:border-blue-500"
        }`}
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default function AddressPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (data: AddressFormData) => {
    try {
      setIsLoading(true);

      console.log(data)

      router.push("/cart/payment");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Shipping Address</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="First Name"
              placeholder="Enter your first name"
              register={register("firstName")}
              error={errors.firstName?.message}
            />

            <Input
              label="Last Name"
              placeholder="Enter your last name"
              register={register("lastName")}
              error={errors.lastName?.message}
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+20 100 123 4567"
            register={register("phone")}
            error={errors.phone?.message}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Country"
              placeholder="Egypt"
              register={register("country")}
              error={errors.country?.message}
            />

            <Input
              label="City"
              placeholder="Cairo"
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

          <Input
            label="Apartment (Optional)"
            placeholder="Apartment, suite, etc."
            register={register("apartment")}
          />

          <Input
            label="Postal Code"
            placeholder="12345"
            register={register("postalCode")}
            error={errors.postalCode?.message}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-white py-4 text-lg font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? <Spinner size={30} /> : "Continue to Payment"}
          </button>

          <Link
            href="/cart"
            className="inline-block rounded-xl bg-red-700 px-6 py-3 text-white transition hover:bg-red-600"
          >
            Back
          </Link>
        </form>
      </div>
    </>
  );
}
