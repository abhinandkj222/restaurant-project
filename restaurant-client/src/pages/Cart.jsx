// import {
//   Minus,
//   Plus,
//   Trash2,
//   ArrowRight,
//   ShoppingBag,
//   ChevronLeft,
// } from 'lucide-react';

// import { Link } from 'react-router-dom';

// import { useCart } from '../context/CartContext';

// const Cart = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//     totalPrice,
//   } = useCart();

//   const deliveryFee = cartItems.length > 0 ? 40 : 0;
//   const grandTotal = Number(totalPrice) + deliveryFee;

//   // Empty cart
//   if (cartItems.length === 0) {
//     return (
//       <section className="min-h-[calc(100vh-80px)] bg-[#FFF9F4] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
//         <div className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center">
//           <div className="w-full rounded-2xl bg-white px-5 py-12 text-center shadow-sm sm:rounded-3xl sm:px-10 sm:py-14">
//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500 sm:h-20 sm:w-20">
//               <ShoppingBag size={30} className="sm:h-9 sm:w-9" />
//             </div>

//             <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 sm:mt-6 sm:text-sm">
//               Your Order
//             </p>

//             <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-4xl">
//               Your cart is empty
//             </h1>

//             <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:mt-4 sm:text-base">
//               You haven't added anything to your cart yet. Explore our menu and
//               find something delicious.
//             </p>

//             <Link
//               to="/menu"
//               className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 sm:mt-8 sm:px-7 sm:py-3.5 sm:text-base"
//             >
//               Browse Menu
//               <ArrowRight size={18} />
//             </Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-[calc(100vh-80px)] bg-[#FFF9F4] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-7 sm:mb-10">
//           <Link
//             to="/menu"
//             className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-orange-500 sm:mb-5"
//           >
//             <ChevronLeft size={18} />
//             Continue Shopping
//           </Link>

//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 sm:text-sm">
//             Your Order
//           </p>

//           <div className="mt-2">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
//               Your Cart
//             </h1>

//             <p className="mt-2 text-sm text-gray-500 sm:text-base">
//               {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}{' '}
//               ready for checkout
//             </p>
//           </div>
//         </div>

//         {/* Main */}
//         <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
//           {/* Cart Items */}
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="rounded-2xl border border-orange-100/60 bg-white p-3.5 shadow-sm transition hover:shadow-md sm:rounded-3xl sm:p-5"
//               >
//                 <div className="flex gap-3 sm:gap-5">
//                   {/* Image */}
//                   <div className="shrink-0">
//                     <img
//                       src={`${import.meta.env.VITE_API_URL}${item.image_url}`}
//                       alt={item.name}
//                       className="h-20 w-20 rounded-xl object-cover sm:h-32 sm:w-32 sm:rounded-2xl lg:h-36 lg:w-36"
//                     />
//                   </div>

//                   {/* Details */}
//                   <div className="flex min-w-0 flex-1 flex-col">
//                     <div className="flex min-w-0 items-start justify-between gap-2">
//                       <div className="min-w-0">
//                         {/* Category */}
//                         <span className="inline-block max-w-full truncate rounded-full bg-orange-50 px-2 py-1 text-[10px] font-semibold text-orange-500 sm:px-2.5 sm:py-1 sm:text-xs">
//                           {item.category}
//                         </span>

//                         {/* Name */}
//                         <h2 className="mt-1.5 truncate text-base font-bold text-gray-900 sm:mt-2 sm:text-xl">
//                           {item.name}
//                         </h2>

//                         {/* Price */}
//                         <p className="mt-1 text-xs text-gray-500 sm:text-sm">
//                           ₹{Number(item.price).toFixed(2)} each
//                         </p>
//                       </div>

//                       {/* Delete */}
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         aria-label={`Remove ${item.name}`}
//                         className="shrink-0 rounded-full p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 sm:p-2"
//                       >
//                         <Trash2 size={16} className="sm:h-[18px] sm:w-[18px]" />
//                       </button>
//                     </div>

//                     {/* Bottom */}
//                     <div className="mt-auto flex items-end justify-between gap-2 pt-3 sm:pt-4">
//                       {/* Quantity */}
//                       <div className="flex items-center rounded-full border border-gray-200 bg-gray-50">
//                         <button
//                           onClick={() => decreaseQuantity(item.id)}
//                           aria-label="Decrease quantity"
//                           className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition hover:text-orange-500 sm:h-9 sm:w-9"
//                         >
//                           <Minus size={14} />
//                         </button>

//                         <span className="w-7 text-center text-xs font-bold text-gray-900 sm:w-8 sm:text-sm">
//                           {item.quantity}
//                         </span>

//                         <button
//                           onClick={() => increaseQuantity(item.id)}
//                           aria-label="Increase quantity"
//                           className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition hover:text-orange-500 sm:h-9 sm:w-9"
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>

//                       {/* Item Total */}
//                       <p className="shrink-0 text-base font-bold text-orange-500 sm:text-xl">
//                         ₹{(Number(item.price) * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Summary */}
//           <aside className="h-fit lg:sticky lg:top-24">
//             <div className="rounded-2xl border border-orange-100/60 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
//               {/* Summary Header */}
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
//                   Order Summary
//                 </h2>

//                 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
//                   <ShoppingBag size={18} />
//                 </div>
//               </div>

//               {/* Pricing */}
//               <div className="mt-6 space-y-4 sm:mt-7">
//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <span>Subtotal</span>

//                   <span className="font-semibold text-gray-900">
//                     ₹{Number(totalPrice).toFixed(2)}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <span>Delivery Fee</span>

//                   <span className="font-semibold text-gray-900">
//                     ₹{deliveryFee.toFixed(2)}
//                   </span>
//                 </div>

//                 <div className="border-t border-dashed border-gray-200 pt-5">
//                   <div className="flex items-end justify-between gap-4">
//                     <div>
//                       <p className="text-sm text-gray-500">Total Amount</p>

//                       <p className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
//                         ₹{grandTotal.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Checkout */}
//               <Link
//                 to="/checkout"
//                 className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 sm:mt-7 sm:gap-3 sm:py-4 sm:text-base"
//               >
//                 Proceed to Checkout
//                 <ArrowRight size={18} />
//               </Link>

//               <p className="mt-3 text-center text-[11px] leading-5 text-gray-400 sm:mt-4 sm:text-xs">
//                 Secure checkout · Fast delivery
//               </p>
//             </div>

//             {/* Small Info */}
//             <div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
//               <p className="text-sm font-semibold text-gray-800">
//                 🍽️ Freshly prepared for you
//               </p>

//               <p className="mt-1 text-xs leading-5 text-gray-500">
//                 Your order will be prepared fresh once you complete checkout.
//               </p>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ChevronLeft,
  ShieldCheck,
  Truck,
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

  /* ============================================================
     EMPTY CART
  ============================================================ */

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#fffaf5] px-4 pb-8 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-36">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="w-full max-w-xl text-center">
            {/* Icon */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 sm:h-28 sm:w-28">
              <ShoppingBag
                size={38}
                strokeWidth={1.4}
                className="text-orange-500 sm:h-11 sm:w-11"
              />
            </div>

            {/* Label */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-orange-500" />

              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-500">
                Your Order
              </span>

              <span className="h-px w-7 bg-orange-500" />
            </div>

            {/* Heading */}
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-gray-950 sm:text-5xl">
              Nothing here yet.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              Your cart is waiting for something delicious. Explore our menu and
              discover your next favourite dish.
            </p>

            {/* Button */}
            <Link
              to="/menu"
              className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-gray-950 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-gray-950/10 transition hover:-translate-y-0.5 hover:bg-gray-800 sm:mt-9 sm:px-8 sm:py-4"
            >
              Explore Menu
              <ArrowRight size={17} />
            </Link>

            {/* Trust */}
            <div className="mt-8 flex items-center justify-center gap-5 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} />
                Secure checkout
              </span>

              <span className="h-3 w-px bg-gray-200" />

              <span className="flex items-center gap-1.5">
                <Truck size={14} />
                Fast delivery
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fffaf5]">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-36">
        {/* ======================================================
            HEADER
        ======================================================= */}

        <div className="mb-8 sm:mb-10">
          {/* Continue Shopping */}
          <Link
            to="/menu"
            className="group mb-7 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 sm:mb-8"
          >
            <ChevronLeft
              size={17}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />

            <span>Continue shopping</span>
          </Link>

          {/* Heading */}
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              {/* Small label */}
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-orange-500" />

                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-500">
                  Your Order
                </span>
              </div>

              {/* Main heading */}
              <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.045em] text-gray-950 sm:text-5xl">
                Your cart.
              </h1>
            </div>

            {/* Item count */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShoppingBag size={17} strokeWidth={1.8} />

              <span>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================
            MAIN CONTENT
        ======================================================= */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-12">
          {/* ====================================================
              CART ITEMS
          ===================================================== */}

          <div>
            {/* Section heading */}
            <div className="mb-4 flex items-center justify-between sm:mb-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-gray-400">
                Selected dishes
              </h2>

              <span className="text-xs text-gray-400">
                {cartItems.length} {cartItems.length === 1 ? 'dish' : 'dishes'}
              </span>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-200/80 border-y border-gray-200/80">
              {cartItems.map((item) => (
                <div key={item.id} className="group py-5 sm:py-6">
                  <div className="flex gap-4 sm:gap-6">
                    {/* =================================================
                        FOOD IMAGE
                    ================================================== */}

                    <Link
                      to="/menu"
                      className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-32 sm:w-32 sm:rounded-[22px]"
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}${item.image_url}`}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* Image overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                    </Link>

                    {/* =================================================
                        DETAILS
                    ================================================== */}

                    <div className="flex min-w-0 flex-1 flex-col">
                      {/* Top */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {/* Category */}
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-500 sm:text-[11px]">
                            {item.category}
                          </span>

                          {/* Name */}
                          <h3 className="mt-1 truncate text-base font-bold tracking-[-0.015em] text-gray-950 sm:text-xl">
                            {item.name}
                          </h3>

                          {/* Price */}
                          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                            ₹{Number(item.price).toFixed(2)} each
                          </p>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={16} strokeWidth={1.8} />
                        </button>
                      </div>

                      {/* Bottom */}
                      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                        {/* Quantity */}
                        <div className="flex items-center rounded-full border border-gray-200 bg-white p-0.5 shadow-sm">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="flex min-w-8 justify-center text-xs font-bold text-gray-950">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-950 text-white transition hover:bg-gray-800"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Item total */}
                        <p className="text-lg font-extrabold tracking-tight text-gray-950 sm:text-xl">
                          ₹{(Number(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* =================================================
                INFO BOX
            ================================================== */}

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-orange-50/70 p-4 sm:mt-7 sm:p-5">
              <div className="mt-0.5 shrink-0 text-orange-500">
                <ShoppingBag size={18} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Freshly prepared after you order
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Our kitchen starts preparing your dishes once the order is
                  confirmed.
                </p>
              </div>
            </div>
          </div>

          {/* ====================================================
              ORDER SUMMARY
          ===================================================== */}

          <aside className="lg:sticky lg:top-24">
            {/* Main summary */}
            <div className="overflow-hidden rounded-[26px] bg-gray-950 text-white shadow-[0_25px_70px_rgba(0,0,0,0.14)] sm:rounded-[30px]">
              {/* Summary header */}
              <div className="border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">
                      Checkout
                    </p>

                    <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                      Order summary
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <ShoppingBag size={18} strokeWidth={1.8} />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="px-5 py-6 sm:px-7 sm:py-7">
                {/* Subtotal */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>

                    <span className="font-semibold">
                      ₹{Number(totalPrice).toFixed(2)}
                    </span>
                  </div>

                  {/* Delivery */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Delivery</span>

                    <span className="font-semibold">
                      ₹{deliveryFee.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-dashed border-white/15" />

                {/* Total */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-white/50">Total amount</p>

                    <p className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
                      ₹{grandTotal.toFixed(2)}
                    </p>
                  </div>

                  <span className="mb-1 rounded-full bg-orange-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-orange-400">
                    INR
                  </span>
                </div>

                {/* Checkout */}
                <Link
                  to="/checkout"
                  className="group mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 text-sm font-bold text-white shadow-xl shadow-orange-500/10 transition hover:bg-orange-400 sm:h-15 sm:text-base"
                >
                  Proceed to checkout
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                {/* Trust */}
                <div className="mt-5 flex items-center justify-center gap-4 text-[10px] text-white/40 sm:text-xs">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={13} />
                    Secure payment
                  </span>

                  <span className="h-3 w-px bg-white/10" />

                  <span className="flex items-center gap-1.5">
                    <Truck size={13} />
                    Fast delivery
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                DELIVERY INFORMATION
            ================================================== */}

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-gray-200/70 bg-white p-4 sm:p-5">
              <Truck
                size={18}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-orange-500"
              />

              <div>
                <p className="text-sm font-bold text-gray-900">
                  Delivery made simple
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  A flat ₹40 delivery fee is applied to your order.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
