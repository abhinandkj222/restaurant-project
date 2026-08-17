import { ArrowUpRight } from 'lucide-react';
import Container from '../common/Container';
import { CATEGORIES } from '../../constants/categories';

const Categories = () => {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500 min-[400px]:text-xs sm:text-sm sm:tracking-[0.28em]">
            <span className="h-px w-5 bg-orange-400 sm:w-6" />
            Categories
            <span className="h-px w-5 bg-orange-400 sm:w-6" />
          </span>

          <h2 className="mt-3 text-[28px] font-extrabold leading-tight tracking-tight text-gray-950 sm:mt-4 sm:text-4xl lg:text-5xl">
            Browse Our Categories
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-gray-500 sm:mt-4 sm:px-4 sm:text-base sm:leading-7">
            Explore our selection of freshly prepared dishes, made with quality
            ingredients and plenty of flavour.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 min-[400px]:gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group relative flex min-h-[185px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] min-[400px]:min-h-[200px] min-[400px]:p-5 sm:min-h-[225px] sm:rounded-3xl sm:p-6 lg:min-h-[240px] lg:p-7"
            >
              {/* Hover background */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Top row */}
              <div className="relative flex items-start justify-between gap-2">
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FFF4E8] text-3xl transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-100 min-[400px]:h-16 min-[400px]:w-16 min-[400px]:text-4xl sm:h-20 sm:w-20 sm:rounded-[1.4rem] sm:text-5xl">
                  {category.icon}
                </div>

                {/* Arrow */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-100 text-gray-300 transition-all duration-300 group-hover:border-orange-200 group-hover:bg-orange-500 group-hover:text-white min-[400px]:h-8 min-[400px]:w-8 sm:h-9 sm:w-9">
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:rotate-12 sm:h-4 sm:w-4"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative mt-auto pt-5 min-[400px]:pt-6 sm:pt-7">
                <h3 className="truncate text-sm font-bold tracking-tight text-gray-950 min-[400px]:text-base sm:text-xl">
                  {category.title}
                </h3>

                <div className="mt-1.5 flex min-w-0 items-center gap-1.5 min-[400px]:mt-2 min-[400px]:gap-2">
                  <span className="truncate text-xs text-gray-500 min-[400px]:text-sm sm:text-base">
                    {category.items}
                  </span>

                  <span className="h-1 w-1 shrink-0 rounded-full bg-orange-400" />

                  <span className="shrink-0 text-[10px] font-semibold text-orange-500 min-[400px]:text-xs">
                    Explore
                  </span>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;
