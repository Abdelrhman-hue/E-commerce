"use client";

import api from "@/api/api";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [user, setUser] = useState({
    fristname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await api.get("/users/me");

      if (res.status === 200) {
        setUser(res.data.data);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full rounded-2xl bg-[#262626] p-4 sm:p-6 lg:p-8 text-white shadow-lg">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>

        <Link
          href="/profile/edit"
          className="flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2 text-sm text-blue-400 transition hover:bg-gray-700"
        >
          <FiEdit2 size={16} />
          Edit
        </Link>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <InfoCard title="First name" value={user.fristname} />

        <InfoCard title="Last name" value={user.lastname} />

        <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-5">
          <p className="mb-2 text-sm text-gray-400">Email address</p>

          <div className="flex items-center gap-2">
            <h2 className="break-all text-lg sm:text-xl font-semibold">
              {user.email}
            </h2>

            <span className="text-green-500">✔</span>
          </div>
        </div>

        <InfoCard
          title="Phone number"
          value={user.phoneNumber || "Not specified"}
        />

        <InfoCard
          title="Date of birth"
          value={user.dateOfBirth.slice(0,10) || "Not specified"}
        />

        <InfoCard title="Gender" value={user.gender || "Not specified"} />
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-5 transition hover:border-blue-500/50 hover:bg-zinc-900/70">
      <p className="mb-2 text-sm text-gray-400">{title}</p>

      <h2 className="break-words text-lg sm:text-xl font-semibold">{value}</h2>
    </div>
  );
}
