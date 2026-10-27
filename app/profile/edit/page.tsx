/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import { toast } from "sonner";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState("");
  const [form, setForm] = useState({
    fristname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await api.get("/users/me");
        if (data?.data) {
          setForm({
            fristname: data.data.fristname || "",
            lastname: data.data.lastname || "",
            email: data.data.email || "",
            phoneNumber: data.data.phoneNumber || "",
            dateOfBirth: data.data.dateOfBirth
              ? data.data.dateOfBirth.slice(0, 10)
              : "",
            gender: data.data.gender || "",
          });
          setID(data.data._id || "");
        }
      } catch {
        toast.error("Failed to load profile");
      }
    }

    getUser();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      await api.patch(id ? `/users/update/${id}` : "/users/update", form);
      toast.success("Profile updated successfully");
      router.push("/profile");
      router.refresh();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-[#262626] p-6 shadow-xl sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/profile"
            className="mb-3 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
          >
            <FiArrowLeft />
            Back
          </Link>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Edit Profile
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="First name"
          name="fristname"
          value={form.fristname}
          onChange={handleChange}
        />

        <Input
          label="Last name"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
        />

        <Input
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Phone number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        <Input
          label="Date of birth"
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <div>
          <label className="mb-2 block text-sm text-gray-400">Gender</label>

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="md:col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

type InputProps = {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

function Input({ label, name, value, onChange, type = "text" }: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-400">{label}</label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      />
    </div>
  );
}
