import { useEffect, useState } from 'react';
import { RotateCcw, UtensilsCrossed } from 'lucide-react';

import api from '../services/api';
import Container from '../components/common/Container';
import SearchBar from '../components/menu/SearchBar';
import CategoryFilter from '../components/menu/CategoryFilter';
import FoodGrid from '../components/menu/FoodGrid';

const Menu = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('All');

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchFoods = async () => {
    try {
      const response = await api.get('/foods');
      setFoods(response.data.foods);
    } catch (error) {
      console.error('failed to fetch foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesCategory = selected === 'All' || food.category === selected;

    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const hasFilters = search || selected !== 'All';

  const resetFilters = () => {
    setSearch('');
    setSelected('All');
  };

  return (
    <section className="min-h-screen bg-[#fffaf5]">
      <Container>
        {/* =====================================================
            HERO / MENU INTRO
        ====================================================== */}
        <div className="px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8 lg:pb-12 lg:pt-16">
          <div className="max-w-3xl">
            {/* Small label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-orange-500" />

              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-500 sm:text-xs">
                Savory Kitchen
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-gray-950 sm:text-5xl lg:text-6xl">
              Good food,
              <br />
              <span className="text-orange-500">great mood.</span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              Explore our chef-crafted menu, made fresh with premium ingredients
              and served with a little extra love.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-3xl sm:mt-10">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
        </div>

        {/* =====================================================
            CATEGORY NAVIGATION
        ====================================================== */}
        <div className="border-y border-gray-200/70 bg-white/60 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <CategoryFilter
            categories={categories}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        {/* =====================================================
            FOOD SECTION
        ====================================================== */}
        <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          {/* Section heading */}
          <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <UtensilsCrossed
                  size={15}
                  strokeWidth={1.8}
                  className="text-orange-500"
                />

                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 sm:text-xs">
                  Our selection
                </p>
              </div>

              <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.025em] text-gray-950 sm:text-3xl">
                {selected === 'All' ? 'Popular dishes' : selected}
              </h2>
            </div>

            {/* Result count */}
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-gray-200">
                {filteredFoods.length}{' '}
                {filteredFoods.length === 1 ? 'item' : 'items'}
              </span>

              {/* Reset */}
              {hasFilters && (
                <button
                  onClick={resetFilters}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500"
                  title="Reset filters"
                  aria-label="Reset filters"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Active search */}
          {search && (
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
              <span>Showing results for</span>

              <span className="max-w-[220px] truncate rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-600">
                "{search}"
              </span>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="aspect-[1.08/1] rounded-[24px] bg-gray-200 sm:rounded-[28px]" />

                  <div className="px-1 pt-5">
                    <div className="h-5 w-3/4 rounded bg-gray-200" />

                    <div className="mt-3 h-3 w-1/2 rounded bg-gray-200" />

                    <div className="mt-5 flex justify-between">
                      <div className="h-5 w-16 rounded bg-gray-200" />

                      <div className="h-10 w-20 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <FoodGrid foods={filteredFoods} />
          )}
        </main>
      </Container>
    </section>
  );
};

export default Menu;
