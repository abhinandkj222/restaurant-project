import { useEffect, useState } from 'react';
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

  // Filter foods
  const filteredFoods = foods.filter((food) => {
    const matchesCategory = selected === 'All' || food.category === selected;

    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-[#FFF8F1] px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <Container>
        {/* Heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12">
          <span className="text-xs font-semibold uppercase tracking-[3px] text-orange-500 sm:text-sm sm:tracking-[4px]">
            Our Menu
          </span>

          <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900 sm:mt-3 sm:text-4xl lg:text-5xl">
            Discover Delicious Food
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base">
            Browse our freshly prepared dishes made with premium ingredients.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto w-full max-w-2xl">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        {/* Category Filter */}
        <div className="mt-3 sm:mt-4">
          <CategoryFilter
            categories={categories}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        {/* Filter Summary */}
        <div className="mt-8 mb-8 rounded-2xl bg-white p-4 shadow-sm sm:mt-10 sm:mb-10 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Filter Information */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              {/* Category */}
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Category
                </p>

                <h3 className="mt-1 truncate text-base font-semibold text-orange-500 sm:text-lg">
                  {selected}
                </h3>
              </div>

              {/* Search */}
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Search
                </p>

                <h3 className="mt-1 truncate text-base font-semibold text-orange-500 sm:text-lg">
                  {search || 'All Foods'}
                </h3>
              </div>

              {/* Results */}
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Results
                </p>

                <h3 className="mt-1 text-base font-semibold text-orange-500 sm:text-lg">
                  {filteredFoods.length} Items
                </h3>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setSearch('');
                setSelected('All');
              }}
              className="w-full rounded-full border border-orange-500 px-5 py-2.5 text-sm font-medium text-orange-500 transition duration-200 hover:bg-orange-500 hover:text-white sm:w-auto sm:px-6"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Food Grid */}
        <FoodGrid foods={filteredFoods} />
      </Container>
    </section>
  );
};

export default Menu;
