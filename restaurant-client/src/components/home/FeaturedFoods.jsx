import { useEffect, useState } from 'react';
import Container from '../common/Container';
import { Heart, ArrowRight, Star, Plus } from 'lucide-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const FeaturedFoods = () => {
  const [popularFoods, setPopularFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
    <section className="bg-[#FFF8F1] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <Container>
        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-orange-500" />

              <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500 sm:text-sm">
                Featured Menu
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Dishes worth
              <span className="text-orange-500"> coming back for.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
              Discover the dishes our guests love most, prepared fresh with
              quality ingredients and served with care.
            </p>
          </div>

          {/* View Menu */}
          <button
            type="button"
            onClick={() => navigate('/menu')}
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-gray-900 transition hover:text-orange-500 sm:mb-1"
          >
            View full menu
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-3xl bg-white p-4 sm:p-5"
              >
                <div className="aspect-[4/3] rounded-2xl bg-gray-100" />

                <div className="mt-5 h-5 w-3/4 rounded bg-gray-100" />

                <div className="mt-3 h-4 w-1/2 rounded bg-gray-100" />

                <div className="mt-5 h-11 rounded-xl bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && popularFoods.length === 0 && (
          <div className="rounded-3xl border border-orange-100 bg-white px-6 py-14 text-center">
            <p className="text-sm font-medium text-gray-500 sm:text-base">
              No popular dishes available yet.
            </p>

            <button
              type="button"
              onClick={() => navigate('/menu')}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Explore Menu
              <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* ================= FOOD GRID ================= */}
        {!loading && popularFoods.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {popularFoods.map((food) => (
              <article
                key={food.id}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-orange-100/70 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-[0_20px_45px_rgba(71,45,25,0.10)]"
              >
                {/* ================= IMAGE ================= */}
                <div className="relative overflow-hidden bg-[#FFF3E8]">
                  <div className="aspect-[4/3] overflow-hidden">
                    {food.image_url ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${food.image_url}`}
                        alt={food.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl">
                        🍽️
                      </div>
                    )}
                  </div>

                  {/* Image overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Favourite */}
                  <button
                    type="button"
                    aria-label={`Add ${food.name} to favourites`}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-gray-600 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-orange-500 hover:text-white sm:right-4 sm:top-4"
                  >
                    <Heart size={18} strokeWidth={2} />
                  </button>

                  {/* Popular badge */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-800 shadow-sm backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    Popular
                  </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Category */}
                  {food.category && (
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                      {food.category}
                    </p>
                  )}

                  {/* Name */}
                  <h3 className="mt-2 line-clamp-1 text-lg font-bold tracking-tight text-gray-950 sm:text-xl">
                    {food.name}
                  </h3>

                  {/* Rating + Price */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1">
                        <Star
                          size={13}
                          fill="currentColor"
                          className="text-orange-500"
                        />

                        <span className="text-xs font-bold text-gray-800">
                          {food.rating || '0.0'}
                        </span>
                      </div>
                    </div>

                    <span className="text-lg font-extrabold tracking-tight text-gray-950 sm:text-xl">
                      ₹{Number(food.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                    {food.description ||
                      'Deliciously prepared with fresh ingredients by our expert chefs.'}
                  </p>

                  {/* Action */}
                  <button
                    type="button"
                    onClick={() => navigate('/menu')}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm font-bold text-gray-900 transition-all duration-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white sm:mt-6 sm:py-3.5"
                  >
                    <Plus size={17} />
                    Add to order
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedFoods;
