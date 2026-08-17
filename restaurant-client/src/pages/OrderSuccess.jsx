import {
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Clock3,
  Sparkles,
  Receipt,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();

  const order = location.state?.order;

  const status = order?.status || 'Pending';
  const total = Number(order?.total_amount || 0).toFixed(2);

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#FFF9F4] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />

      {/* Main */}
      <div className="relative mx-auto w-full max-w-5xl">
        {/* ================= SUCCESS HERO ================= */}

        <div className="mx-auto max-w-3xl text-center">
          {/* Success icon */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-green-300/30 blur-2xl" />

            {/* Outer circle */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl ring-8 ring-green-50 sm:h-24 sm:w-24">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 sm:h-16 sm:w-16">
                <CheckCircle2
                  size={38}
                  strokeWidth={2.4}
                  className="text-green-500 sm:h-10 sm:w-10"
                />
              </div>
            </div>

            {/* Sparkle */}
            <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
              <Sparkles size={14} />
            </div>
          </div>

          {/* Confirmation badge */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-600 shadow-sm sm:mt-8 sm:px-5 sm:py-2.5 sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Order Confirmed
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-gray-950 sm:mt-6 sm:text-5xl lg:text-6xl">
            Your order is
            <br className="hidden sm:block" /> on its way.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-500 sm:mt-6 sm:text-base sm:leading-7">
            Thank you for choosing Savory. Your order has been successfully
            received and our kitchen is getting ready.
          </p>

          {/* Order number */}
          {order && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2.5 text-sm text-white shadow-lg sm:mt-7 sm:px-5">
              <Receipt size={15} className="text-orange-400" />

              <span className="text-gray-400">Order</span>

              <span className="font-bold">#{order.id}</span>
            </div>
          )}
        </div>

        {/* ================= ORDER CARD ================= */}

        {order && (
          <div className="mx-auto mt-10 max-w-4xl sm:mt-12 lg:mt-14">
            <div className="overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-[0_25px_70px_rgba(71,45,25,0.08)] sm:rounded-[2rem]">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-6 sm:px-8 sm:py-7 lg:px-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500 sm:text-[11px]">
                    Order Details
                  </p>

                  <h2 className="mt-1.5 text-xl font-bold text-gray-950 sm:text-2xl">
                    Thanks for your order
                  </h2>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <ShoppingBag size={20} />
                </div>
              </div>

              {/* Details */}
              <div className="grid sm:grid-cols-2">
                {/* Status */}
                <div className="flex items-center gap-4 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Clock3 size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 sm:text-[11px]">
                      Current Status
                    </p>

                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-60" />

                        <span className="relative h-2.5 w-2.5 rounded-full bg-yellow-500" />
                      </span>

                      <span className="text-base font-bold capitalize text-gray-950">
                        {status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Number */}
                <div className="flex items-center gap-4 border-t border-gray-100 px-5 py-6 sm:border-l sm:border-t-0 sm:px-8 sm:py-8 lg:px-10">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Receipt size={20} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 sm:text-[11px]">
                      Order Number
                    </p>

                    <p className="mt-1.5 text-base font-bold text-gray-950">
                      #{order.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-100 bg-[#FFF8F1] px-5 py-6 sm:px-8 sm:py-7 lg:px-10">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 sm:text-[11px]">
                      Total Amount
                    </p>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Final order total
                    </p>
                  </div>

                  <p className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
                    ₹{total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= ACTIONS ================= */}

        <div className="mx-auto mt-7 max-w-4xl sm:mt-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Order More */}
            <Link
              to="/menu"
              className="group flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-gray-950 px-6 text-sm font-bold text-white shadow-lg shadow-gray-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-orange-500/20 sm:min-h-[58px]"
            >
              <ShoppingBag size={18} />
              Order More Food
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            {/* Home */}
            <Link
              to="/"
              className="group flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 text-sm font-bold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 sm:min-h-[58px]"
            >
              Back Home
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-7 text-center sm:mt-8">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400">
              SAVORY • MADE WITH CARE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
