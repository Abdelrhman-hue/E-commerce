/* eslint-disable @typescript-eslint/no-explicit-any */

import { FiUsers, FiSearch, FiShoppingBag, FiDollarSign } from "react-icons/fi";
import api from "@/api/api";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

type Customer = {
  _id: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender?: string;
  roles?: string[];
};

export default async function CustomersPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  let customers: Customer[] = [];

  try {
    const res = await api.get("/users", {
      headers: {
        Cookie: `token=${token ?? ""}`,
      },
    });

    customers = Array.isArray(res.data?.data) ? res.data.data : [];
  } catch (error) {
    console.error("Failed to fetch customers:", error);
  }

  const customersCount = customers.length;

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Customers</h1>

          <p className="mt-1 text-zinc-400">Manage your customers</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search customers..."
            className="
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-[#202020]
              py-3
              pl-11
              pr-4
              text-sm
              text-white
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-blue-600
            "
          />
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<FiUsers />}
          title="Customers"
          value={customersCount.toString()}
        />

        <StatCard icon={<FiShoppingBag />} title="Orders" value="0" />

        <StatCard icon={<FiDollarSign />} title="Revenue" value="$0.00" />

        <StatCard
          icon={<FiUsers />}
          title="New Users"
          value={customersCount.toString()}
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div
        className="
          hidden
          overflow-hidden
          rounded-2xl
          border
          border-zinc-800
          bg-[#202020]
          lg:block
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="border-b border-zinc-800">
              <tr className="text-left text-sm text-zinc-400">
                <th className="p-5 font-medium">Customer</th>

                <th className="p-5 font-medium">Email</th>

                <th className="p-5 font-medium">Gender</th>

                <th className="p-5 font-medium">Role</th>

                <th className="p-5 text-center font-medium">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="
                      border-b
                      border-zinc-800
                      transition
                      last:border-b-0
                      hover:bg-zinc-900/50
                    "
                  >
                    {/* Customer */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-600
                            font-bold
                            uppercase
                            text-white
                          "
                        >
                          {customer.first_name?.[0] ?? "U"}
                        </div>

                        {/* Name */}
                        <div className="min-w-0">
                          <p className="truncate font-medium text-white">
                            {customer.first_name} {customer.last_name}
                          </p>

                          <p className="text-xs text-zinc-500">
                            #{customer.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-5">
                      <p className="max-w-xs truncate text-sm text-zinc-300">
                        {customer.email}
                      </p>
                    </td>

                    {/* Gender */}
                    <td className="p-5">
                      <span className="text-sm capitalize text-zinc-300">
                        {customer.gender || "—"}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="p-5">
                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-blue-500/10
                          px-3
                          py-1
                          text-sm
                          capitalize
                          text-blue-400
                        "
                      >
                        {customer.roles?.[0] || "user"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-5">
                      <div className="flex justify-center">
                        <button
                          type="button"
                          className="
                            rounded-lg
                            bg-red-600
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-red-700
                            active:scale-95
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="
                      p-12
                      text-center
                      text-zinc-500
                    "
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid gap-4 lg:hidden">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div
              key={customer._id}
              className="
                rounded-2xl
                border
                border-zinc-800
                bg-[#202020]
                p-5
                transition
                hover:border-zinc-700
              "
            >
              {/* Card Header */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    font-bold
                    uppercase
                    text-white
                  "
                >
                  {customer.first_name?.[0] ?? "U"}
                </div>

                {/* Name + Email */}
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-white">
                    {customer.first_name} {customer.last_name}
                  </h3>

                  <p className="truncate text-sm text-zinc-400">
                    {customer.email}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-5 grid grid-cols-2 gap-4">
                {/* ID */}
                <div>
                  <p className="text-xs text-zinc-500">ID</p>

                  <p className="mt-1 text-sm text-zinc-200">#{customer.id}</p>
                </div>

                {/* Gender */}
                <div>
                  <p className="text-xs text-zinc-500">Gender</p>

                  <p className="mt-1 text-sm capitalize text-zinc-200">
                    {customer.gender || "—"}
                  </p>
                </div>

                {/* Role */}
                <div>
                  <p className="text-xs text-zinc-500">Role</p>

                  <span
                    className="
                      mt-1
                      inline-flex
                      rounded-full
                      bg-blue-500/10
                      px-3
                      py-1
                      text-sm
                      capitalize
                      text-blue-400
                    "
                  >
                    {customer.roles?.[0] || "user"}
                  </span>
                </div>
              </div>

              {/* Delete */}
              <button
                type="button"
                className="
                  mt-5
                  w-full
                  rounded-xl
                  bg-red-600
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-red-700
                  active:scale-[0.98]
                "
              >
                Delete Customer
              </button>
            </div>
          ))
        ) : (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-zinc-800
              py-12
              text-center
              text-zinc-500
            "
          >
            No customers found.
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-[#202020]
        p-5
        transition
        hover:border-zinc-700
      "
    >
      <div className="flex items-center justify-between gap-4">
        {/* Icon */}
        <div className="text-2xl text-blue-500">{icon}</div>

        {/* Value */}
        <span className="truncate text-2xl font-bold text-white sm:text-3xl">
          {value}
        </span>
      </div>

      {/* Title */}
      <p className="mt-4 text-sm text-zinc-400 sm:text-base">{title}</p>
    </div>
  );
}
