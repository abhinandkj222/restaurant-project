import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ShoppingBag,
  CreditCard,
  Banknote,
  MapPin,
  Loader2,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import api from '../services/api';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [error, setError] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  const deliveryFee = 0;
  const grandTotal = Number(totalPrice) + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }

    if (!formData.address.trim()) {
      setError('Please enter your delivery address.');
      return;
    }

    if (!formData.city.trim()) {
      setError('Please enter your city.');
      return;
    }

    if (!formData.pincode.trim()) {
      setError('Please enter your pincode.');
      return;
    }

    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }

    try {
      setPlacingOrder(true);

      const items = cartItems.map((item) => ({
        foodId: item.id,
        quantity: item.quantity,
        price: Number(item.price),
      }));

      const response = await api.post('/orders', {
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email || null,

        deliveryAddress: formData.address,
        deliveryCity: formData.city,
        deliveryPincode: formData.pincode,

        paymentMethod,
        paymentStatus: 'pending',

        totalAmount: grandTotal,

        items,
      });

      const createdOrder = response.data.order;

      if (!createdOrder.user_id && createdOrder.guest_order_token) {
        const existingTokens = JSON.parse(
          localStorage.getItem('guestOrderTokens') || '[]',
        );

        if (!existingTokens.includes(createdOrder.guest_order_token)) {
          existingTokens.push(createdOrder.guest_order_token);

          localStorage.setItem(
            'guestOrderTokens',
            JSON.stringify(existingTokens),
          );
        }
      }

      clearCart();

      navigate('/order-success', {
        state: {
          order: response.data.order,
        },
      });
    } catch (error) {
      console.error('place order error:', error);

      setError(
        error.response?.data?.message ||
          'Failed to place order. Please try again.',
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#FFF9F4] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl bg-white px-5 py-12 text-center shadow-sm sm:px-10 sm:py-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500 sm:h-20 sm:w-20">
              <ShoppingBag size={32} className="sm:h-9 sm:w-9" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              Your cart is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              Add some delicious food before proceeding to checkout.
            </p>

            <Link
              to="/menu"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:px-7 sm:text-base"
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
    <section className="min-h-screen bg-[#FFF9F4] px-3 py-7 sm:px-5 sm:py-10 md:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-7 sm:mb-9 lg:mb-10">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-orange-500"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 sm:mt-6 sm:text-sm sm:tracking-[0.2em]">
            Almost There
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Checkout
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:mt-3 sm:text-base">
            Enter your delivery details and choose your payment method.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
            {/* LEFT */}

            <div className="min-w-0 space-y-6 sm:space-y-8">
              {/* Customer Details */}

              <div className="rounded-2xl border border-orange-100/60 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-500 sm:text-sm sm:tracking-widest">
                    Customer
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                    Your Details
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Enter your contact information for the order.
                  </p>
                </div>

                <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6">
                  {/* Name */}

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:rounded-2xl"
                    />
                  </div>

                  {/* Phone */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:rounded-2xl"
                    />
                  </div>

                  {/* Email */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Email
                      <span className="ml-1 text-xs font-normal text-gray-400">
                        (optional)
                      </span>
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:rounded-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery */}

              <div className="rounded-2xl border border-orange-100/60 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <MapPin size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-500 sm:text-sm sm:tracking-widest">
                      Delivery
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                      Delivery Address
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                  {/* Address */}

                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Full Address
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House number, street, area, landmark..."
                      rows={4}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm leading-6 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:rounded-2xl"
                    />
                  </div>

                  {/* City + Pincode */}

                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-semibold text-gray-800"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:rounded-2xl"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="pincode"
                        className="mb-2 block text-sm font-semibold text-gray-800"
                      >
                        Pincode
                      </label>

                      <input
                        id="pincode"
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter pincode"
                        maxLength={6}
                        inputMode="numeric"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}

              <div className="rounded-2xl border border-orange-100/60 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <CreditCard size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-500 sm:text-sm sm:tracking-widest">
                      Payment
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                      Payment Method
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Choose how you would like to pay.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4">
                  {/* Online */}

                  <button
                    type="button"
                    onClick={() => {
                      setError(
                        'Online payment is coming soon. Please choose Cash on Delivery for now.',
                      );
                    }}
                    className="relative rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 text-left transition hover:border-orange-300 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <CreditCard size={23} className="text-gray-400" />

                      <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-600">
                        Coming Soon
                      </span>
                    </div>

                    <h3 className="mt-3 font-bold text-gray-900 sm:mt-4">
                      Pay Online
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Online payment is currently unavailable.
                    </p>
                  </button>

                  {/* Cash */}

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('cash');
                      setError('');
                    }}
                    className={`rounded-2xl border-2 p-4 text-left transition sm:p-5 ${
                      paymentMethod === 'cash'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-orange-300'
                    }`}
                  >
                    <Banknote
                      size={23}
                      className={
                        paymentMethod === 'cash'
                          ? 'text-orange-500'
                          : 'text-gray-400'
                      }
                    />

                    <h3 className="mt-3 font-bold text-gray-900 sm:mt-4">
                      Cash on Delivery
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Pay when your order is delivered.
                    </p>
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-gray-50 p-3.5 sm:mt-5 sm:rounded-2xl sm:p-4">
                  <p className="text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                    <span className="font-semibold text-gray-900">
                      Payment:
                    </span>{' '}
                    Your selected payment method will be recorded with your
                    order.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT / ORDER SUMMARY */}

            <aside className="h-fit lg:sticky lg:top-24">
              <div className="rounded-2xl border border-orange-100/60 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Order Summary
                  </h2>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-500 sm:h-10 sm:w-10">
                    <ShoppingBag size={18} />
                  </div>
                </div>

                {/* Cart Items */}

                <div className="mt-5 max-h-64 space-y-4 overflow-y-auto pr-1 sm:mt-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          ₹{Number(item.price).toFixed(2)} × {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-gray-900">
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="my-5 border-t border-dashed border-gray-200 sm:my-6" />

                {/* Delivery */}

                <div className="rounded-xl border border-orange-200 bg-orange-50 p-3.5 sm:rounded-2xl sm:p-4">
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-orange-500"
                    />

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-500 sm:text-xs">
                        Delivery Address
                      </p>

                      {formData.address ? (
                        <div className="mt-1 text-sm text-gray-700">
                          <p className="break-words font-semibold">
                            {formData.address}
                          </p>

                          {(formData.city || formData.pincode) && (
                            <p className="mt-1 break-words text-gray-500">
                              {formData.city}
                              {formData.city && formData.pincode ? ', ' : ''}
                              {formData.pincode}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">
                          Enter your delivery address.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment */}

                <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5 sm:mt-4 sm:rounded-2xl sm:p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 sm:text-xs">
                    Payment
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {paymentMethod === 'online'
                      ? 'Pay Online'
                      : 'Cash on Delivery'}
                  </p>
                </div>

                {/* Total */}

                <div className="my-5 border-t border-dashed border-gray-200 sm:my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>

                    <span className="font-semibold text-gray-900">
                      ₹{Number(totalPrice).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery Fee</span>

                    <span className="font-semibold text-gray-900">
                      ₹{deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Total</p>

                        <p className="mt-1 text-2xl font-bold text-gray-900">
                          ₹{grandTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error */}

                {error && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:rounded-2xl">
                    <p className="text-sm font-medium leading-5 text-red-600">
                      {error}
                    </p>
                  </div>
                )}

                {/* Place Order */}

                <button
                  type="submit"
                  disabled={placingOrder}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition sm:mt-7 sm:py-4 sm:text-base ${
                    placingOrder
                      ? 'cursor-not-allowed bg-gray-400'
                      : 'bg-orange-500 shadow-lg shadow-orange-100 hover:bg-orange-600'
                  }`}
                >
                  {placingOrder ? (
                    <>
                      <Loader2 size={19} className="animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={19} />
                      Place Order
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] leading-5 text-gray-400 sm:mt-4 sm:text-xs">
                  Your order will be sent to the restaurant after you place it.
                </p>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
