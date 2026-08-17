import Container from '../common/Container';
import { WHY_CHOOSE_US } from '../../constants/whyChooseUs';
import { ArrowUpRight } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-orange-100/40 blur-3xl sm:-right-40 sm:h-96 sm:w-96" />

      <Container>
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-24">
          {/* ================= LEFT ================= */}
          <div className="lg:sticky lg:top-28">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-6 bg-orange-500 sm:w-8" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 min-[400px]:text-xs sm:text-sm sm:tracking-[0.22em]">
                Why Choose Us
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-4 max-w-xl text-[30px] font-bold leading-[1.08] tracking-tight text-gray-950 min-[400px]:text-[32px] sm:text-4xl lg:text-5xl xl:text-[56px]">
              Good food is only the
              <span className="text-orange-500"> beginning.</span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:mt-5 sm:text-base sm:leading-7">
              From carefully selected ingredients to the moment your meal
              reaches you, we focus on every little detail that makes dining
              with Savory special.
            </p>

            {/* Small brand statement */}
            <div className="mt-7 border-l-2 border-orange-500 pl-4 sm:mt-8 sm:pl-5">
              <p className="text-sm font-semibold text-gray-900">
                Crafted with care.
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                Fresh ingredients, honest flavours and service you can count on.
              </p>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-[#FFFCF9] sm:rounded-[2rem]">
              {WHY_CHOOSE_US.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className={`group relative p-5 transition-all duration-300 hover:bg-white min-[400px]:p-6 sm:p-8 lg:p-9 ${
                      index !== WHY_CHOOSE_US.length - 1
                        ? 'border-b border-gray-200'
                        : ''
                    }`}
                  >
                    <div className="flex items-start gap-3 min-[400px]:gap-4 sm:gap-6 lg:gap-7">
                      {/* Number */}
                      <span className="mt-1 w-5 shrink-0 text-[10px] font-bold tracking-widest text-gray-300 transition-colors duration-300 group-hover:text-orange-500 min-[400px]:w-6 sm:w-9 sm:text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Icon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-200 min-[400px]:h-12 min-[400px]:w-12 sm:h-14 sm:w-14 sm:rounded-2xl">
                        <Icon
                          size={21}
                          strokeWidth={1.8}
                          className="transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold tracking-tight text-gray-950 min-[400px]:text-lg sm:text-xl">
                          {item.title}
                        </h3>

                        <p className="mt-1.5 text-xs leading-5 text-gray-500 min-[400px]:text-sm min-[400px]:leading-6 sm:mt-2 sm:text-[15px] sm:leading-7">
                          {item.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="hidden shrink-0 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-500 sm:block">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom accent */}
            <div className="absolute -bottom-2 left-6 right-6 h-2 rounded-full bg-orange-500/10 blur-sm sm:left-8 sm:right-8" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
