import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();

  const order = location.state?.order;

  return (
    <section className="min-h-screen bg-[#FFF9F4] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
            <CheckCircle size={48} />
          </div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Order Confirmed
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Your order is confirmed!
          </h1>

          <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500">
            Thank you for ordering with Savory. Your order has been sent to the
            restaurant kitchen.
          </p>

          {/* Order Information */}
          {order && (
            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-orange-50 p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order ID</span>

                <span className="font-bold text-gray-900">#{order.id}</span>
              </div>

              <div className="my-4 border-t border-orange-100" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Table</span>

                <span className="font-semibold text-gray-900">
                  Table {order.table_id}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">Total</span>

                <span className="text-xl font-bold text-orange-500">
                  ₹{Number(order.total_amount).toFixed(2)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold capitalize text-yellow-700">
                  {order.status}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-white transition hover:bg-orange-600"
            >
              Order More Food
              <ShoppingBag size={18} />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-7 py-3.5 font-semibold text-gray-700 transition hover:border-orange-500 hover:text-orange-500"
            >
              Back Home
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
