import Container from '../common/Container';
import { TESTIMONIALS } from '../../constants/testimonials';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F1] py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-100/30 blur-3xl" />

      <Container>
        {/* ================= HEADING ================= */}
        <div className="relative mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 shadow-sm sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Testimonials
          </div>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Loved by people
            <br className="hidden sm:block" />
            <span className="text-orange-500"> who love good food.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            From the first bite to the last, our customers keep coming back for
            the taste, quality and care behind every meal.
          </p>
        </div>

        {/* ================= TESTIMONIALS ================= */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {TESTIMONIALS.map((item, index) => (
            <article
              key={item.id}
              className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 sm:p-7 lg:p-8 ${
                index === 1
                  ? 'border-orange-200 bg-white shadow-[0_20px_60px_rgba(234,88,12,0.10)] xl:-translate-y-3'
                  : 'border-orange-100/70 bg-white/70 shadow-sm hover:-translate-y-2 hover:bg-white hover:shadow-xl'
              }`}
            >
              {/* Decorative quote */}
              <div className="pointer-events-none absolute right-6 top-5 text-orange-100 transition-colors duration-300 group-hover:text-orange-200">
                <Quote size={70} strokeWidth={1.5} fill="currentColor" />
              </div>

              {/* Featured badge */}
              {index === 1 && (
                <div className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-orange-200">
                  <Star size={11} fill="currentColor" />
                  Customer Favourite
                </div>
              )}

              {/* Rating */}
              <div
                className={`relative flex items-center gap-1 ${
                  index === 1 ? 'mt-10' : ''
                }`}
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(item.rating)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      fill="currentColor"
                      strokeWidth={1.5}
                      className="text-orange-500"
                    />
                  ))}
                </div>

                <span className="ml-2 text-xs font-semibold text-gray-400">
                  {item.rating}.0
                </span>
              </div>

              {/* Review */}
              <div className="relative mt-6 flex-1">
                <p className="text-base font-medium leading-7 text-gray-800 sm:text-[17px] sm:leading-8">
                  “{item.review}”
                </p>
              </div>

              {/* Divider */}
              <div className="my-7 h-px bg-gradient-to-r from-orange-100 via-gray-100 to-transparent" />

              {/* Customer */}
              <div className="flex items-center gap-3.5">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-base font-bold text-orange-600 ring-4 ring-orange-50 sm:h-14 sm:w-14 sm:text-lg">
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Verified */}
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white">
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-gray-950 sm:text-base">
                    {item.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* ================= TRUST FOOTER ================= */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:mt-12 sm:flex-row sm:gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={15}
                fill="currentColor"
                className="text-orange-500"
              />
            ))}
          </div>

          <span className="hidden h-4 w-px bg-gray-300 sm:block" />

          <p className="text-xs font-medium text-gray-500 sm:text-sm">
            Trusted by happy customers for delicious meals
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
