export const dynamic = 'force-dynamic';
/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/api/api";
import { cookies } from "next/headers";
import { FiBox, FiUsers, FiShoppingCart, FiDollarSign } from "react-icons/fi";

export default async function Admin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let datacount: any = {
    data: {
      users: 0,
      products: 0,
      orders: 0,
      Revenue: 0,
      Last: [],
      Toporder: [],
    },
  };

  try {
    const res = await api.get("/dashboard", {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    datacount = res.data;
  } catch (error) {
    console.error("Admin dashboard error:", error);
  }

  const stats = [
    {
      title: "Products",
      value: datacount?.data?.Products ?? datacount?.data?.products ?? 0,
      icon: <FiBox className="text-lg sm:text-2xl" />,
      color: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Users",
      value: datacount?.data?.Users ?? datacount?.data?.users ?? 0,
      icon: <FiUsers className="text-lg sm:text-2xl" />,
      color: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Orders",
      value: datacount?.data?.Orders ?? datacount?.data?.orders ?? 0,
      icon: <FiShoppingCart className="text-lg sm:text-2xl" />,
      color: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Revenue",
      value: `${Number(datacount?.data?.Total || datacount?.data?.Revenue || 0).toFixed(2)}`,
      icon: <FiDollarSign className="text-lg sm:text-2xl" />,
      color: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <main className="min-h-screen bg-[#111111] p-3 text-white sm:p-6 lg:p-8">

      {/* Stats */}
      <section className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-4 lg:gap-6 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-zinc-800 bg-[#202020] p-3 transition duration-300 hover:border-blue-500/50 hover:shadow-xl sm:p-5 lg:p-6"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-xs text-zinc-400 sm:text-sm md:text-base">
                  {stat.title}
                </p>

                <h2 className="mt-1 truncate text-lg font-bold sm:mt-2 sm:text-2xl lg:text-3xl">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 sm:rounded-xl ${stat.color} ${stat.iconColor}`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Orders */}
      <section className="mb-6 rounded-2xl border border-zinc-800 bg-[#202020] p-4 sm:mb-8 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold sm:text-xl">Recent Orders</h2>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Latest orders placed in your store
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="whitespace-nowrap px-3 py-4 text-sm font-medium text-zinc-400">
                    Order ID
                  </th>

                  <th className="whitespace-nowrap px-3 py-4 text-sm font-medium text-zinc-400">
                    Customer
                  </th>

                  <th className="whitespace-nowrap px-3 py-4 text-sm font-medium text-zinc-400">
                    Quantity
                  </th>

                  <th className="whitespace-nowrap px-3 py-4 text-sm font-medium text-zinc-400">
                    Total
                  </th>

                  <th className="whitespace-nowrap px-3 py-4 text-sm font-medium text-zinc-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {datacount.data.Last?.map((order: any) => {
                  const quantity =
                    order.items?.reduce(
                      (sum: number, item: any) =>
                        sum + Number(item.quantity || 0),
                      0,
                    ) || 0;

                  return (
                    <tr
                      key={order._id}
                      className="border-b border-zinc-800/70 transition hover:bg-zinc-900/50"
                    >
                      <td className="px-3 py-4 text-sm font-medium text-white">
                        #{String(order._id).slice(-8)}
                      </td>

                      <td className="px-3 py-4">
                        <div>
                          <p className="font-medium text-white">
                            {order.user?.firstname} {order.user?.lastname}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            {order.user?.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-3 py-4 text-sm text-zinc-300">
                        {quantity}
                      </td>

                      <td className="px-3 py-4 text-sm font-semibold text-white">
                        ${Number(order.totalPrice || 0).toFixed(2)}
                      </td>

                      <td className="px-3 py-4">
                        <StatusBadge status={order.paymentStatus} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          {datacount.data.Last?.length > 0 ? (
            datacount.data.Last.map((order: any) => {
              const quantity =
                order.items?.reduce(
                  (sum: number, item: any) => sum + Number(item.quantity || 0),
                  0,
                ) || 0;

              return (
                <div
                  key={order._id}
                  className="rounded-xl border border-zinc-800 bg-[#181818] p-4"
                >
                  {/* Top */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        #{String(order._id).slice(-8)}
                      </p>

                      <p className="mt-1 truncate text-xs text-zinc-500">
                        {order.user?.firstname} {order.user?.lastname}
                      </p>
                    </div>

                    <StatusBadge status={order.paymentStatus} />
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-zinc-500">Email</span>

                      <span className="max-w-[60%] truncate text-right text-zinc-300">
                        {order.user?.email || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Quantity</span>

                      <span className="font-medium text-white">{quantity}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Total</span>

                      <span className="font-semibold text-white">
                        ${Number(order.totalPrice || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState text="No recent orders found." />
          )}
        </div>
      </section>

      {/* Top Orders */}
      <section className="rounded-2xl border border-zinc-800 bg-[#202020] p-4 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold sm:text-xl">Top Orders</h2>

          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            Highest value orders
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="whitespace-nowrap px-3 py-4 text-sm font-medium text-zinc-400">
                    Order ID
                  </th>

                  <th className="whitespace-nowrap px-3 py-4 text-sm font-medium text-zinc-400">
                    Customer
                  </th>

                  <th className="whitespace-nowrap px-3 py-4 text-sm font-medium text-zinc-400">
                    Total
                  </th>

                  <th className="whitespace-nowrap px-3 py-4 text-sm font-medium text-zinc-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {datacount.data.Toporder?.map((order: any) => (
                  <tr
                    key={order._id}
                    className="border-b border-zinc-800/70 transition hover:bg-zinc-900/50"
                  >
                    <td className="px-3 py-4 text-sm font-medium">
                      #{String(order._id).slice(-8)}
                    </td>

                    <td className="px-3 py-4">
                      <p className="font-medium text-white">
                        {order.user?.firstname} {order.user?.lastname}
                      </p>
                    </td>

                    <td className="px-3 py-4 text-sm font-semibold">
                      ${Number(order.totalPrice || 0).toFixed(2)}
                    </td>

                    <td className="px-3 py-4">
                      <StatusBadge status={order.paymentStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          {datacount.data.Toporder?.length > 0 ? (
            datacount.data.Toporder.map((order: any) => (
              <div
                key={order._id}
                className="rounded-xl border border-zinc-800 bg-[#181818] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      #{String(order._id).slice(-8)}
                    </p>

                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {order.user?.firstname} {order.user?.lastname}
                    </p>
                  </div>

                  <StatusBadge status={order.paymentStatus} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-zinc-500">Total</span>

                  <span className="font-semibold text-white">
                    ${Number(order.totalPrice || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <EmptyState text="No top orders found." />
          )}
        </div>
      </section>
    </main>
  );
}

/* ---------------- Components ---------------- */

function StatusBadge({ status }: { status?: string }) {
  const normalizedStatus = status?.toLowerCase();

  let classes = "bg-zinc-800 text-zinc-300 border border-zinc-700";

  if (
    normalizedStatus === "paid" ||
    normalizedStatus === "success" ||
    normalizedStatus === "completed"
  ) {
    classes = "border border-green-500/20 bg-green-500/10 text-green-400";
  }

  if (normalizedStatus === "pending" || normalizedStatus === "processing") {
    classes = "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
  }

  if (normalizedStatus === "failed" || normalizedStatus === "cancelled") {
    classes = "border border-red-500/20 bg-red-500/10 text-red-400";
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${classes}`}
    >
      {status || "Unknown"}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-800 py-10 text-center">
      <p className="text-sm text-zinc-500">{text}</p>
    </div>
  );
}
