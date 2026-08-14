import Container from '../common/Container';
import { CATEGORIES } from '../../constants/categories';

const Categories = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Heading */}
        <div className="mb-12 text-center lg:mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[4px] text-orange-500">
            Categories
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Browse Our Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-4 text-sm leading-7 text-gray-600 sm:text-base">
            Discover delicious meals crafted with fresh ingredients and prepared
            by our expert chefs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-2xl sm:p-6 lg:p-8"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-5xl transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-100 sm:h-24 sm:w-24 sm:text-6xl">
                  {category.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-5 text-center text-lg font-bold text-gray-900 sm:text-xl">
                {category.title}
              </h3>

              {/* Items */}
              <p className="mt-2 text-center text-sm text-gray-500 sm:text-base">
                {category.items}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;