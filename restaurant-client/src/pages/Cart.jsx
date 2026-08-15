import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ChevronLeft,
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const grandTotal = Number(totalPrice) + deliveryFee;

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <section className="min-h-[calc(100vh-80px)] bg-[#FFF9F4] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-2xl bg-white px-5 py-12 text-center shadow-sm sm:rounded-3xl sm:px-10 sm:py-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500 sm:h-20 sm:w-20">
              <ShoppingBag size={30} className="sm:h-9 sm:w-9" />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 sm:mt-6 sm:text-sm">
              Your Order
            </p>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-4xl">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:mt-4 sm:text-base">
              You haven't added anything to your cart yet. Explore our menu and
              find something delicious.
            </p>

            <Link
              to="/menu"
              className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 sm:mt-8 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Browse Menu
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#FFF9F4] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 sm:mb-10">
          <Link
            to="/menu"
            className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-orange-500 sm:mb-5"
          >
            <ChevronLeft size={18} />
            Continue Shopping
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 sm:text-sm">
            Your Order
          </p>

          <div className="mt-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}{' '}
              ready for checkout
            </p>
          </div>
        </div>

        {/* Main */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-orange-100/60 bg-white p-3.5 shadow-sm transition hover:shadow-md sm:rounded-3xl sm:p-5"
              >
                <div className="flex gap-3 sm:gap-5">
                  {/* Image */}
                  <div className="shrink-0">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${item.image_url}`}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover sm:h-32 sm:w-32 sm:rounded-2xl lg:h-36 lg:w-36"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex min-w-0 items-start justify-between gap-2">
                      <div className="min-w-0">
                        {/* Category */}
                        <span className="inline-block max-w-full truncate rounded-full bg-orange-50 px-2 py-1 text-[10px] font-semibold text-orange-500 sm:px-2.5 sm:py-1 sm:text-xs">
                          {item.category}
                        </span>

                        {/* Name */}
                        <h2 className="mt-1.5 truncate text-base font-bold text-gray-900 sm:mt-2 sm:text-xl">
                          {item.name}
                        </h2>

                        {/* Price */}
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          ₹{Number(item.price).toFixed(2)} each
                        </p>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 rounded-full p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 sm:p-2"
                      >
                        <Trash2 size={16} className="sm:h-[18px] sm:w-[18px]" />
                      </button>
                    </div>

                    {/* Bottom */}
                    <div className="mt-auto flex items-end justify-between gap-2 pt-3 sm:pt-4">
                      {/* Quantity */}
                      <div className="flex items-center rounded-full border border-gray-200 bg-gray-50">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition hover:text-orange-500 sm:h-9 sm:w-9"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-7 text-center text-xs font-bold text-gray-900 sm:w-8 sm:text-sm">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition hover:text-orange-500 sm:h-9 sm:w-9"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <p className="shrink-0 text-base font-bold text-orange-500 sm:text-xl">
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-orange-100/60 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
              {/* Summary Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Order Summary
                </h2>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <ShoppingBag size={18} />
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-6 space-y-4 sm:mt-7">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Subtotal</span>

                  <span className="font-semibold text-gray-900">
                    ₹{Number(totalPrice).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>

                  <span className="font-semibold text-gray-900">
                    ₹{deliveryFee.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>

                      <p className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                        ₹{grandTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout */}
              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 sm:mt-7 sm:gap-3 sm:py-4 sm:text-base"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <p className="mt-3 text-center text-[11px] leading-5 text-gray-400 sm:mt-4 sm:text-xs">
                Secure checkout · Fast delivery
              </p>
            </div>

            {/* Small Info */}
            <div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
              <p className="text-sm font-semibold text-gray-800">
                🍽️ Freshly prepared for you
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Your order will be prepared fresh once you complete checkout.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
