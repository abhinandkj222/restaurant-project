import Container from '../common/Container';
import heroBurger from '../../assets/images/hero-burger.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFF8F1] pt-20 sm:pt-24 lg:pt-28">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-orange-200/40 blur-[90px] sm:h-96 sm:w-96 lg:-right-40 lg:-top-40 lg:h-[550px] lg:w-[550px] lg:blur-[120px]" />

      <Container>
        <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-12 py-10 sm:gap-16 sm:py-14 lg:min-h-[calc(100vh-112px)] lg:grid-cols-2 lg:gap-16 lg:py-10">
          {/* LEFT SIDE */}
          <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center rounded-full bg-orange-100 px-4 py-2 sm:mb-6 sm:px-5 sm:py-2">
              <span className="text-xs font-semibold text-orange-600 sm:text-sm">
                🍽️ Fresh & Delicious Food
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              Experience
              <span className="block text-orange-500">Culinary Excellence</span>
              Delivered
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
              Crafted with premium ingredients by expert chefs and delivered
              fresh to your doorstep in just 30 minutes.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3.5 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-300 sm:w-auto sm:px-8 sm:py-4">
                Order Now
              </button>

              <button className="w-full rounded-full border-2 border-orange-500 px-7 py-3.5 font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white sm:w-auto sm:px-8 sm:py-4">
                View Menu
              </button>
            </div>

            {/* Statistics */}
            <div className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3 sm:mt-12 sm:gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
              <div>
                <h2 className="text-xl font-bold text-orange-500 sm:text-2xl lg:text-3xl">
                  4.9★
                </h2>

                <p className="mt-1 text-[11px] leading-4 text-gray-600 sm:text-sm">
                  Customer Rating
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-orange-500 sm:text-2xl lg:text-3xl">
                  30 Min
                </h2>

                <p className="mt-1 text-[11px] leading-4 text-gray-600 sm:text-sm">
                  Fast Delivery
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-orange-500 sm:text-2xl lg:text-3xl">
                  8K+
                </h2>

                <p className="mt-1 text-[11px] leading-4 text-gray-600 sm:text-sm">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center pb-8 pt-4 sm:pb-12 lg:pb-0 lg:pt-0">
            {/* Background Circle */}
            <div className="absolute h-[250px] w-[250px] rounded-full bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 sm:h-[350px] sm:w-[350px] md:h-[420px] md:w-[420px] lg:h-[500px] lg:w-[500px]" />

            {/* Hero Image */}
            <div className="relative z-10 h-[235px] w-[235px] overflow-hidden rounded-full shadow-2xl sm:h-[330px] sm:w-[330px] md:h-[400px] md:w-[400px] lg:h-[480px] lg:w-[480px] xl:h-[500px] xl:w-[500px]">
              <img
                src={heroBurger}
                alt="Premium Burger"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Rating Card */}
            <div className="absolute left-0 top-0 z-20 rounded-xl bg-white px-3 py-2 text-xs shadow-xl sm:left-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm lg:left-0 lg:px-6 lg:py-4 lg:text-base">
              ⭐ <span className="font-semibold">4.9 Rating</span>
            </div>

            {/* Delivery Card */}
            <div className="absolute bottom-5 right-0 z-20 rounded-xl bg-white px-3 py-2 text-xs shadow-xl sm:bottom-8 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm lg:bottom-16 lg:px-6 lg:py-4 lg:text-base">
              🚚 <span className="font-semibold">30 Min Delivery</span>
            </div>

            {/* Chef Card */}
            <div className="absolute bottom-0 left-0 z-20 rounded-xl bg-white px-3 py-2 text-xs shadow-xl sm:left-4 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm lg:left-0 lg:px-6 lg:py-4 lg:text-base">
              👨‍🍳 <span className="font-semibold">Master Chef</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
