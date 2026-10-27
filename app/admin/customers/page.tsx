/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { FiUsers, FiSearch, FiShoppingBag, FiDollarSign, FiTrash2 } from "react-icons/fi";
import api from "@/api/api";
import { toast } from "sonner";

type Customer = {
  _id: string;
  id?: number | string;
  fristname?: string;
  firstname?: string;
  first_name?: string;
  lastname?: string;
  last_name?: string;
  email: string;
  phoneNumber?: string;
  gender?: string;
  roles?: string[];
  createdAt?: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);
        const res = await api.get("/users");
        setCustomers(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete user "${name}"?`)) return;

    try {
      setDeletingId(id);
      await api.delete(`/users/delete/${id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      toast.success("Customer removed successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!search.trim()) return customers;
    const term = search.toLowerCase();
    return customers.filter((c) => {
      const name = `${c.fristname || c.firstname || c.first_name || ""} ${
        c.lastname || c.last_name || ""
      }`.toLowerCase();
      const email = (c.email || "").toLowerCase();
      return name.includes(term) || email.includes(term);
    });
  }, [customers, search]);

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Customers</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your store customers ({customers.length} registered)
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-[#202020] py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-600"
          />
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={<FiUsers />}
          title="Total Customers"
          value={customers.length.toString()}
        />
        <StatCard
          icon={<FiUsers />}
          title="Admin Accounts"
          value={
            customers
              .filter((c) => c.roles?.includes("admin"))
              .length.toString()
          }
        />
        <StatCard
          icon={<FiUsers />}
          title="Standard Users"
          value={
            customers
              .filter((c) => !c.roles?.includes("admin"))
              .length.toString()
          }
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      {loading ? (
        <div className="flex min-h-[30vh] items-center justify-center rounded-2xl border border-zinc-800 bg-[#202020]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#202020]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-zinc-800 bg-zinc-900/60">
                <tr className="text-left text-xs uppercase tracking-wider text-zinc-400">
                  <th className="p-4 font-semibold">Customer</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Phone</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 text-center font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => {
                    const firstName =
                      customer.fristname ||
                      customer.firstname ||
                      customer.first_name ||
                      "User";
                    const lastName =
                      customer.lastname || customer.last_name || "";
                    const fullName = `${firstName} ${lastName}`.trim();
                    const initial = firstName.charAt(0).toUpperCase();

                    return (
                      <tr
                        key={customer._id}
                        className="transition hover:bg-zinc-800/40"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-sm font-bold text-blue-400">
                              {initial}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-white">
                                {fullName}
                              </p>
                              <p className="font-mono text-xs text-zinc-500">
                                #{customer._id.slice(-6).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 text-sm text-zinc-300">
                          {customer.email}
                        </td>

                        <td className="p-4 text-sm text-zinc-400">
                          {customer.phoneNumber || "—"}
                        </td>

                        <td className="p-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${
                              customer.roles?.includes("admin")
                                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            }`}
                          >
                            {customer.roles?.[0] || "user"}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <button
                            type="button"
                            disabled={deletingId === customer._id}
                            onClick={() =>
                              handleDelete(customer._id, fullName)
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                          >
                            <FiTrash2 size={13} />
                            {deletingId === customer._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-12 text-center text-sm text-zinc-500"
                    >
                      No customers found matching &ldquo;{search}&rdquo;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-[#202020] p-5 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-xl text-blue-400">
        {icon}
      </div>
      <div>
        <p className="text-xs text-zinc-400">{title}</p>
        <h3 className="mt-1 text-2xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
}
