import Container from '../common/Container';
import { TESTIMONIALS } from '../../constants/testimonials';
import { Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-orange-500">
            Testimonials
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Thousands of happy customers trust us for delicious meals and
            exceptional service.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-[#FFF8F1] p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex text-orange-500">
                {[...Array(item.rating)].map((_, index) => (
                  <Star key={index} size={20} fill="currentColor" />
                ))}
              </div>

              <p className="leading-7 text-gray-600">"{item.review}"</p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-500">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>

                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
