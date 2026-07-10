"use client"
import api from "@/api/api";
import { FiEdit2 } from "react-icons/fi";
import React, { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState({fristname: "", email: "" ,lastname: "", phone: "", dateOfBirth: "", gender: ""});

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await api.get("/users/me");
      if (res.status === 200) {
        // Handle successful response
        const user = res.data.data;
        setUser(user);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full  rounded-xl bg-[#262626] p-8 text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>

        <button className="flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2 text-sm text-blue-400 transition hover:bg-gray-700">
          <FiEdit2 size={16} />
          Edit
        </button>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2">
        <div>
          <p className="mb-1 text-sm text-gray-400">First name</p>
          <h2 className="text-xl font-semibold">{user.fristname}</h2>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-400">Last name</p>
          <h2 className="text-xl font-semibold">{user.lastname}</h2>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-400">Email address</p>

          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{user.email}</h2>

            <span className="text-green-500 text-lg">✔</span>
          </div>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-400">Phone number</p>
          <h2 className="text-xl font-semibold">{user.phone?user.phone:"Not specified"}</h2>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-400">Date of birth</p>
          <h2 className="text-xl font-semibold">{user.dateOfBirth?user.dateOfBirth:"Not specified"}</h2>
        </div>

        <div>
          <p className="mb-1 text-sm text-gray-400">Gender</p>
          <h2 className="text-xl font-semibold">{user.gender?user.gender:"Not specified"}</h2>
        </div>
      </div>
    </div>
  );
}
