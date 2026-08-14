import { useEffect, useState } from 'react';
import Container from '../common/Container';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import api from '../../services/api';

const FeaturedFoods = () => {
  const [popularFoods, setPopularFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularFoods = async () => {
      try {
        const response = await api.get('/foods/popular');

        setPopularFoods(response.data.foods || []);
      } catch (error) {
        console.error('failed to fetch popular foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularFoods();
  }, []);

  return (
    <section className="bg-[#FFF8F1] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <Container>
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[3px] text-orange-500 sm:text-sm sm:tracking-[4px]">
            Featured Menu
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Our Most Popular Dishes
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
            Fresh ingredients, amazing taste and prepared with love by our
            expert chefs.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-10 text-center text-sm text-gray-500 sm:text-base">
            Loading popular dishes...
          </div>
        )}

        {/* No foods */}
        {!loading && popularFoods.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 sm:text-base">
            No popular dishes available yet.
          </div>
        )}

        {/* Cards */}
        {!loading && popularFoods.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {popularFoods.map((food) => (
              <div
                key={food.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-5 lg:p-6"
              >
                {/* Favourite */}
                <button
                  type="button"
                  aria-label={`Add ${food.name} to favourites`}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105 hover:bg-orange-500 hover:text-white sm:right-5 sm:top-5 sm:h-10 sm:w-10"
                >
                  <Heart size={17} className="sm:h-[18px] sm:w-[18px]" />
                </button>

                {/* Image */}
                <div className="flex justify-center">
                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-orange-50 transition duration-300 group-hover:scale-105 sm:h-36 sm:w-36 lg:h-40 lg:w-40">
                    {food.image_url ? (
                      <img
                        src={`https://restaurant-project-otyw.onrender.com${food.image_url}`}
                        alt={food.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl sm:text-5xl">🍽️</span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <h3 className="mt-5 line-clamp-1 text-center text-lg font-bold text-gray-900 sm:mt-6 sm:text-xl">
                  {food.name}
                </h3>

                {/* Rating & Price */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-orange-500">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="shrink-0 sm:h-[18px] sm:w-[18px]"
                    />

                    <span className="text-sm font-semibold sm:text-base">
                      {food.rating || '0.0'}
                    </span>
                  </div>

                  <span className="text-lg font-bold text-orange-500 sm:text-xl">
                    ₹{Number(food.price).toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 line-clamp-2 text-center text-xs leading-5 text-gray-500 sm:mt-4 sm:text-sm sm:leading-6">
                  {food.description ||
                    'Deliciously prepared with fresh ingredients by our expert chefs.'}
                </p>

                {/* Button */}
                <button
                  type="button"
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:mt-6 sm:py-3.5 sm:text-base"
                >
                  <ShoppingCart size={17} className="sm:h-[18px] sm:w-[18px]" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedFoods;
