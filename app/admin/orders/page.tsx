export const dynamic = 'force-dynamic';
import api from "@/api/api";
import { cookies } from "next/headers";
import {
  FiShoppingBag,
  FiDollarSign,
  FiClock,
  FiTruck,
  FiCreditCard,
  FiPackage,
} from "react-icons/fi";

interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  _id: string;
}

interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod?: string;
  paymentStatus: "paid" | "pending";
  isPaid: boolean;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  createdAt?: string;
  updatedAt?: string;
  paidAt?: string;
}

interface OrdersResponse {
  status: string;
  data: Order[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const formatDate = (date?: string) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Shipped":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";

    case "Delivered":
      return "bg-green-500/10 text-green-400 border-green-500/20";

    case "Cancelled":
      return "bg-red-500/10 text-red-400 border-red-500/20";

    default:
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  }
};

const getPaymentStyle = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-500/10 text-green-400 border-green-500/20";

    default:
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  }
};

export default async function OrdersPage() {
  const cookieStore = await cookies();

  let orders: Order[] = [];
  try {
    const res = await api.get<OrdersResponse>('/orders/all', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    orders = res.data?.data || [];
  } catch (err) {
    console.error('Admin orders fetch error:', err);
  }

  const totalOrders = orders.length;

  const paidOrders = orders.filter((order) => order.isPaid).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.isPaid)
    .reduce((total, order) => total + order.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Orders
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Manage and monitor all customer orders
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
              <FiShoppingBag className="text-gray-400" />

              <span className="text-sm text-gray-300">
                {totalOrders} Orders
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {/* Total Orders */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Total Orders
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {totalOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                <FiShoppingBag size={20} />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Revenue
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  {formatCurrency(totalRevenue)}
                </h2>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
                <FiDollarSign size={20} />
              </div>
            </div>
          </div>

          {/* Paid */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Paid Orders
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {paidOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
                <FiCreditCard size={20} />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Pending
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {pendingOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-400">
                <FiClock size={20} />
              </div>
            </div>
          </div>

          {/* Shipped */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Shipped
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {shippedOrders}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <FiTruck size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

          {/* Table Header */}
          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <FiPackage className="text-gray-400" />

              <h2 className="font-semibold">
                All Orders
              </h2>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-sm text-gray-400">
                  <th className="px-6 py-4 font-medium">
                    Order
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Customer
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Items
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Total
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Payment
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const totalQuantity = order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  );

                  return (
                    <tr
                      key={order._id}
                      className="border-b border-white/5 transition hover:bg-white/[0.02]"
                    >
                      {/* Order */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-medium text-white">
                            #{order._id.slice(-8).toUpperCase()}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {order._id}
                          </p>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-sm text-gray-200">
                            User
                          </p>

                          <p className="mt-1 max-w-[150px] truncate text-xs text-gray-500">
                            {order.user}
                          </p>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-sm text-white">
                            {order.items.length} product
                            {order.items.length !== 1 ? "s" : ""}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {totalQuantity} item
                            {totalQuantity !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-6 py-5">
                        <p className="font-semibold text-white">
                          {formatCurrency(order.totalPrice)}
                        </p>

                        <p className="mt-1 text-xs capitalize text-gray-500">
                          {order.paymentMethod || "N/A"}
                        </p>
                      </td>

                      {/* Payment */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${getPaymentStyle(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5">
                        <p className="whitespace-nowrap text-sm text-gray-300">
                          {formatDate(order.createdAt)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="divide-y divide-white/5 lg:hidden">
            {orders.map((order) => {
              const totalQuantity = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );

              return (
                <div
                  key={order._id}
                  className="p-5 transition hover:bg-white/[0.02]"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        User: {order.user}
                      </p>
                    </div>

                    <p className="font-bold text-white">
                      {formatCurrency(order.totalPrice)}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

                    <div>
                      <p className="text-xs text-gray-500">
                        Products
                      </p>

                      <p className="mt-1 text-sm text-gray-200">
                        {order.items.length}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Quantity
                      </p>

                      <p className="mt-1 text-sm text-gray-200">
                        {totalQuantity}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Payment
                      </p>

                      <p className="mt-1 capitalize text-sm text-gray-200">
                        {order.paymentMethod || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Date
                      </p>

                      <p className="mt-1 text-sm text-gray-200">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${getPaymentStyle(
                        order.paymentStatus
                      )}`}
                    >
                      Payment: {order.paymentStatus}
                    </span>

                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty */}
          {orders.length === 0 && (
            <div className="px-6 py-16 text-center">
              <FiShoppingBag
                size={40}
                className="mx-auto text-gray-600"
              />

              <h3 className="mt-4 text-lg font-semibold">
                No orders found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                There are no orders available right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}