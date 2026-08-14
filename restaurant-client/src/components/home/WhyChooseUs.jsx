import Container from '../common/Container';
import { WHY_CHOOSE_US } from '../../constants/whyChooseUs';

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-orange-500">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            We Serve Happiness
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Every meal is prepared with love, quality ingredients and delivered
            quickly to your doorstep.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group rounded-3xl bg-[#FFF8F1] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={36} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
