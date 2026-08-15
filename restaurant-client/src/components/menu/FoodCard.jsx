import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const FoodCard = ({ food, onClick }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const isInCart = cartItems.some((item) => item.id === food.id);

  const handleCartClick = (e) => {
    e.stopPropagation();

    if (isInCart) {
      removeFromCart(food.id);
    } else {
      addToCart(food);
    }
  };

  return (
    <div
      onClick={() => onClick(food)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)] sm:rounded-3xl"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-56 lg:h-64">
        <img
          src={`${import.meta.env.VITE_API_URL}${food.image_url}`}
          alt={food.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent sm:h-24" />

        {/* Wishlist */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <Heart
            size={17}
            strokeWidth={2}
            className="text-gray-700 transition-colors hover:text-orange-500 sm:h-[18px] sm:w-[18px]"
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Category + Rating */}
        <div className="flex items-center justify-between gap-2">
          <span className="max-w-[65%] truncate rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-orange-600 sm:px-3 sm:py-1.5 sm:text-xs">
            {food.category}
          </span>

          <div className="flex shrink-0 items-center gap-1">
            <Star
              size={14}
              fill="#f59e0b"
              className="text-yellow-500 sm:h-[15px] sm:w-[15px]"
            />

            <span className="text-xs font-semibold text-gray-700 sm:text-sm">
              {food.rating}
            </span>
          </div>
        </div>

        {/* Food Name */}
        <h3 className="mt-3 truncate text-lg font-bold tracking-tight text-gray-900 sm:mt-4 sm:text-xl">
          {food.name}
        </h3>

        {/* Bottom Section */}
        <div className="mt-4 flex items-end justify-between gap-3 sm:mt-5">
          {/* Price */}
          <div className="min-w-0">
            <span className="text-[10px] font-medium text-gray-400 sm:text-xs">
              Price
            </span>

            <h2 className="mt-0.5 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              ₹{food.price}
            </h2>
          </div>

          {/* Cart Button */}
          <button
            onClick={handleCartClick}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm ${
              isInCart
                ? 'bg-red-500 text-white shadow-md shadow-red-100 hover:bg-red-600'
                : 'bg-orange-500 text-white shadow-md shadow-orange-100 hover:bg-orange-600 hover:shadow-lg'
            }`}
          >
            {isInCart ? (
              <>
                <Check size={15} strokeWidth={2.5} className="sm:h-4 sm:w-4" />
                <span>Remove</span>
              </>
            ) : (
              <>
                <ShoppingCart
                  size={15}
                  strokeWidth={2.5}
                  className="sm:h-4 sm:w-4"
                />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
