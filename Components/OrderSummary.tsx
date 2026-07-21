import { FiLock, FiRefreshCw, FiTruck } from "react-icons/fi";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
}

export default function OrderSummary({
  subtotal,
  discount,
  tax,
  total,
  itemCount,
}: OrderSummaryProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
      <h2 className="text-white font-bold text-base mb-5">Order summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Subtotal ({itemCount} items)</span>
          <span className="text-white font-medium">
            ${subtotal.toLocaleString()}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-green-400">Discount</span>
            <span className="text-green-400 font-medium">
              −${discount.toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-400">Shipping</span>
          <span className="text-green-400 font-medium">Free</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Tax (14%)</span>
          <span className="text-white font-medium">
            ${tax.toLocaleString()}
          </span>
        </div>

        <div className="border-t border-white/10 pt-3 flex justify-between">
          <span className="text-white font-bold">Total</span>
          <span className="text-white font-bold text-lg">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>

      <button className="w-full mt-6 py-3 bg-white text-gray-900 font-bold text-sm rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center justify-center gap-2">
        Proceed to checkout →
      </button>

      {/* Trust badges */}
      <div className="flex justify-around mt-4 pt-4 border-t border-white/10">
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <FiLock size={14} />
          <span className="text-xs">Secure</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <FiRefreshCw size={14} />
          <span className="text-xs">Easy returns</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <FiTruck size={14} />
          <span className="text-xs">Fast delivery</span>
        </div>
      </div>
    </div>
  );
}
