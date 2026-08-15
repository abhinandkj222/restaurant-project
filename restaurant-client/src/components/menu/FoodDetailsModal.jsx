import { X, Star, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const FoodDetailsModal = ({ food, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(food);
    }

    onClose();
  };

  if (!isOpen || !food) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4">
      <div className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl sm:rounded-3xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-orange-500 hover:text-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X size={20} className="sm:h-[22px] sm:w-[22px]" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT - IMAGE */}
          <div className="bg-[#FFF8F1] p-4 sm:p-6 lg:p-10">
            <img
              src={`${import.meta.env.VITE_API_URL}${food.image_url}`}
              alt={food.name}
              className="mx-auto h-56 w-full rounded-2xl object-cover shadow-lg sm:h-80 sm:rounded-3xl md:h-96 lg:h-[500px]"
            />
          </div>

          {/* RIGHT - DETAILS */}
          <div className="p-5 sm:p-8 lg:p-10">
            {/* Category */}
            <span className="inline-block rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-500 sm:px-4 sm:py-2 sm:text-sm">
              {food.category}
            </span>

            {/* Name */}
            <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:mt-5 sm:text-3xl lg:text-4xl">
              {food.name}
            </h2>

            {/* Rating */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">
              <Star
                size={18}
                fill="#f59e0b"
                className="text-yellow-500 sm:h-5 sm:w-5"
              />

              <span className="text-sm font-semibold sm:text-base">
                {food.rating}
              </span>

              <span className="text-xs text-gray-500 sm:text-sm">
                (320 Reviews)
              </span>
            </div>

            {/* Price */}
            <h3 className="mt-5 text-2xl font-bold text-orange-500 sm:mt-6 sm:text-3xl lg:text-4xl">
              ₹{food.price}
            </h3>

            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-gray-600 sm:mt-6 sm:text-base sm:leading-8">
              Freshly prepared with premium ingredients by our expert chefs.
              Crispy, juicy and packed with delicious flavours.
            </p>

            {/* Extra Details */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
              <div className="rounded-xl bg-orange-50 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-xs text-gray-500 sm:text-sm">Calories</p>

                <h4 className="mt-1 text-base font-bold sm:text-lg">
                  450 kcal
                </h4>
              </div>

              <div className="rounded-xl bg-orange-50 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-xs text-gray-500 sm:text-sm">Preparation</p>

                <h4 className="mt-1 text-base font-bold sm:text-lg">20 mins</h4>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-7 sm:mt-10">
              <h4 className="mb-3 text-sm font-semibold sm:mb-4 sm:text-base">
                Quantity
              </h4>

              <div className="flex w-fit items-center overflow-hidden rounded-full border border-gray-200">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="flex h-11 w-11 items-center justify-center text-gray-700 transition hover:bg-gray-100 sm:h-12 sm:w-12"
                >
                  <Minus size={18} />
                </button>

                <span className="flex min-w-12 items-center justify-center px-2 text-lg font-bold sm:min-w-14 sm:px-4 sm:text-xl">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-11 w-11 items-center justify-center bg-orange-500 text-white transition hover:bg-orange-600 sm:h-12 sm:w-12"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3 sm:mt-10 sm:gap-4">
              {/* Wishlist */}
              <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-orange-500 text-orange-500 transition hover:bg-orange-500 hover:text-white sm:h-14 sm:w-14">
                <Heart size={19} className="sm:h-5 sm:w-5" />
              </button>

              {/* Add To Cart */}
              <button
                onClick={handleAddToCart}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 sm:h-14 sm:gap-3 sm:px-6 sm:text-base"
              >
                <ShoppingCart size={18} className="sm:h-5 sm:w-5" />

                <span>Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsModal;
