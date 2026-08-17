// import { X, Star, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
// import { useState } from 'react';
// import { useCart } from '../../context/CartContext';

// const FoodDetailsModal = ({ food, isOpen, onClose }) => {
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();

//   const handleAddToCart = () => {
//     for (let i = 0; i < quantity; i++) {
//       addToCart(food);
//     }

//     onClose();
//   };

//   if (!isOpen || !food) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4">
//       <div className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl sm:rounded-3xl">
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-orange-500 hover:text-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
//         >
//           <X size={20} className="sm:h-[22px] sm:w-[22px]" />
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-2">
//           {/* LEFT - IMAGE */}
//           <div className="bg-[#FFF8F1] p-4 sm:p-6 lg:p-10">
//             <img
//               src={`${import.meta.env.VITE_API_URL}${food.image_url}`}
//               alt={food.name}
//               className="mx-auto h-56 w-full rounded-2xl object-cover shadow-lg sm:h-80 sm:rounded-3xl md:h-96 lg:h-[500px]"
//             />
//           </div>

//           {/* RIGHT - DETAILS */}
//           <div className="p-5 sm:p-8 lg:p-10">
//             {/* Category */}
//             <span className="inline-block rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-500 sm:px-4 sm:py-2 sm:text-sm">
//               {food.category}
//             </span>

//             {/* Name */}
//             <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:mt-5 sm:text-3xl lg:text-4xl">
//               {food.name}
//             </h2>

//             {/* Rating */}
//             <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">
//               <Star
//                 size={18}
//                 fill="#f59e0b"
//                 className="text-yellow-500 sm:h-5 sm:w-5"
//               />

//               <span className="text-sm font-semibold sm:text-base">
//                 {food.rating}
//               </span>

//               <span className="text-xs text-gray-500 sm:text-sm">
//                 (320 Reviews)
//               </span>
//             </div>

//             {/* Price */}
//             <h3 className="mt-5 text-2xl font-bold text-orange-500 sm:mt-6 sm:text-3xl lg:text-4xl">
//               ₹{food.price}
//             </h3>

//             {/* Description */}
//             <p className="mt-4 text-sm leading-6 text-gray-600 sm:mt-6 sm:text-base sm:leading-8">
//               Freshly prepared with premium ingredients by our expert chefs.
//               Crispy, juicy and packed with delicious flavours.
//             </p>

//             {/* Extra Details */}
//             <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
//               <div className="rounded-xl bg-orange-50 p-3 sm:rounded-2xl sm:p-4">
//                 <p className="text-xs text-gray-500 sm:text-sm">Calories</p>

//                 <h4 className="mt-1 text-base font-bold sm:text-lg">
//                   450 kcal
//                 </h4>
//               </div>

//               <div className="rounded-xl bg-orange-50 p-3 sm:rounded-2xl sm:p-4">
//                 <p className="text-xs text-gray-500 sm:text-sm">Preparation</p>

//                 <h4 className="mt-1 text-base font-bold sm:text-lg">20 mins</h4>
//               </div>
//             </div>

//             {/* Quantity */}
//             <div className="mt-7 sm:mt-10">
//               <h4 className="mb-3 text-sm font-semibold sm:mb-4 sm:text-base">
//                 Quantity
//               </h4>

//               <div className="flex w-fit items-center overflow-hidden rounded-full border border-gray-200">
//                 <button
//                   onClick={() => quantity > 1 && setQuantity(quantity - 1)}
//                   className="flex h-11 w-11 items-center justify-center text-gray-700 transition hover:bg-gray-100 sm:h-12 sm:w-12"
//                 >
//                   <Minus size={18} />
//                 </button>

//                 <span className="flex min-w-12 items-center justify-center px-2 text-lg font-bold sm:min-w-14 sm:px-4 sm:text-xl">
//                   {quantity}
//                 </span>

//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="flex h-11 w-11 items-center justify-center bg-orange-500 text-white transition hover:bg-orange-600 sm:h-12 sm:w-12"
//                 >
//                   <Plus size={18} />
//                 </button>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="mt-7 flex gap-3 sm:mt-10 sm:gap-4">
//               {/* Wishlist */}
//               <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-orange-500 text-orange-500 transition hover:bg-orange-500 hover:text-white sm:h-14 sm:w-14">
//                 <Heart size={19} className="sm:h-5 sm:w-5" />
//               </button>

//               {/* Add To Cart */}
//               <button
//                 onClick={handleAddToCart}
//                 className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:h-14 sm:gap-3 sm:px-6 sm:text-base"
//               >
//                 <ShoppingCart size={18} className="sm:h-5 sm:w-5" />

//                 <span>Add To Cart</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodDetailsModal;

import {
  X,
  Star,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Clock3,
  Flame,
  ChefHat,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';

const FoodDetailsModal = ({ food, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(food);
    }

    onClose();
  };

  if (!isOpen || !food) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-gray-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-5 lg:p-8"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[96vh] w-full max-w-6xl overflow-y-auto rounded-t-[30px] bg-[#fffdf9] shadow-2xl sm:rounded-[32px]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg backdrop-blur-md transition hover:bg-gray-950 hover:text-white sm:right-6 sm:top-6"
          aria-label="Close"
        >
          <X size={19} />
        </button>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          {/* IMAGE */}
          <div className="relative min-h-[330px] bg-[#f4eee6] sm:min-h-[430px] lg:min-h-[650px]">
            <img
              src={`${import.meta.env.VITE_API_URL}${food.image_url}`}
              alt={food.name}
              className="h-full min-h-[330px] w-full object-cover sm:min-h-[430px] lg:min-h-[650px]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

            {/* Image label */}
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-gray-900 shadow-lg backdrop-blur-md">
                {food.category}
              </span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col p-6 sm:p-9 lg:p-12">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Star
                    size={17}
                    fill="currentColor"
                    className="text-orange-500"
                  />

                  <span className="text-sm font-bold text-gray-900">
                    {food.rating}
                  </span>
                </div>

                <span className="text-gray-300">•</span>

                <span className="text-sm text-gray-500">320 reviews</span>
              </div>

              <h2 className="mt-4 max-w-lg text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-gray-950 sm:text-4xl lg:text-5xl">
                {food.name}
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
                Freshly prepared by our chefs using premium ingredients.
                Carefully crafted for a rich and satisfying dining experience.
              </p>
            </div>

            {/* Price */}
            <div className="mt-7 border-y border-gray-200 py-5">
              <span className="text-3xl font-extrabold tracking-tight text-gray-950">
                ₹{food.price}
              </span>

              <span className="ml-2 text-sm text-gray-400">/ serving</span>
            </div>

            {/* Info */}
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:p-4">
                <Clock3
                  size={18}
                  className="text-orange-500"
                  strokeWidth={1.8}
                />

                <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Prep
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">20 min</p>
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:p-4">
                <Flame
                  size={18}
                  className="text-orange-500"
                  strokeWidth={1.8}
                />

                <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Energy
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">450 kcal</p>
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:p-4">
                <ChefHat
                  size={18}
                  className="text-orange-500"
                  strokeWidth={1.8}
                />

                <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Style
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  Chef's pick
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">
                  Quantity
                </span>

                <span className="text-xs text-gray-400">
                  Choose your serving
                </span>
              </div>

              <div className="mt-3 flex w-fit items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>

                <span className="flex min-w-12 justify-center text-base font-bold text-gray-950">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-950 text-white transition hover:bg-gray-800"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-7">
              <div className="flex gap-3">
                <button
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-orange-500 hover:text-orange-500"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} strokeWidth={1.8} />
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-orange-500/30"
                >
                  <ShoppingBag size={19} strokeWidth={2} />
                  Add to cart
                </button>
              </div>

              <p className="mt-3 text-center text-[11px] text-gray-400">
                Freshly prepared after your order
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsModal;
