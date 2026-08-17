// import Container from '../common/Container';
// import heroBurger from '../../assets/images/hero-burger.png';
// import { useNavigate } from 'react-router-dom';

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-[#FFF8F1] pt-20 sm:pt-24 lg:pt-28">
//       {/* Background Glow */}
//       <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-orange-200/40 blur-[90px] sm:h-96 sm:w-96 lg:-right-40 lg:-top-40 lg:h-[550px] lg:w-[550px] lg:blur-[120px]" />

//       <Container>
//         <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-12 py-10 sm:gap-16 sm:py-14 lg:min-h-[calc(100vh-112px)] lg:grid-cols-2 lg:gap-16 lg:py-10">
//           {/* LEFT SIDE */}
//           <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
//             {/* Badge */}
//             <div className="mb-5 inline-flex items-center rounded-full bg-orange-100 px-4 py-2 sm:mb-6 sm:px-5 sm:py-2">
//               <span className="text-xs font-semibold text-orange-600 sm:text-sm">
//                 🍽️ Fresh & Delicious Food
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
//               Experience
//               <span className="block text-orange-500">Culinary Excellence</span>
//               Delivered
//             </h1>

//             {/* Description */}
//             <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
//               Crafted with premium ingredients by expert chefs and delivered
//               fresh to your doorstep in just 30 minutes.
//             </p>

//             {/* Buttons */}
//             <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
//               <button
//                 type="button"
//                 onClick={() => navigate('/cart')}
//                 className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3.5 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-300 sm:w-auto sm:px-8 sm:py-4"
//               >
//                 Order Now
//               </button>

//               <button
//                 type="button"
//                 onClick={() => navigate('/menu')}
//                 className="w-full rounded-full border-2 border-orange-500 px-7 py-3.5 font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white sm:w-auto sm:px-8 sm:py-4"
//               >
//                 View Menu
//               </button>
//             </div>

//             {/* Statistics */}
//             <div className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3 sm:mt-12 sm:gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
//               <div>
//                 <h2 className="text-xl font-bold text-orange-500 sm:text-2xl lg:text-3xl">
//                   4.9★
//                 </h2>

//                 <p className="mt-1 text-[11px] leading-4 text-gray-600 sm:text-sm">
//                   Customer Rating
//                 </p>
//               </div>

//               <div>
//                 <h2 className="text-xl font-bold text-orange-500 sm:text-2xl lg:text-3xl">
//                   30 Min
//                 </h2>

//                 <p className="mt-1 text-[11px] leading-4 text-gray-600 sm:text-sm">
//                   Fast Delivery
//                 </p>
//               </div>

//               <div>
//                 <h2 className="text-xl font-bold text-orange-500 sm:text-2xl lg:text-3xl">
//                   8K+
//                 </h2>

//                 <p className="mt-1 text-[11px] leading-4 text-gray-600 sm:text-sm">
//                   Happy Customers
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center pb-8 pt-4 sm:pb-12 lg:pb-0 lg:pt-0">
//             {/* Background Circle */}
//             <div className="absolute h-[250px] w-[250px] rounded-full bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 sm:h-[350px] sm:w-[350px] md:h-[420px] md:w-[420px] lg:h-[500px] lg:w-[500px]" />

//             {/* Hero Image */}
//             <div className="relative z-10 h-[235px] w-[235px] overflow-hidden rounded-full shadow-2xl sm:h-[330px] sm:w-[330px] md:h-[400px] md:w-[400px] lg:h-[480px] lg:w-[480px] xl:h-[500px] xl:w-[500px]">
//               <img
//                 src={heroBurger}
//                 alt="Premium Burger"
//                 className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
//               />
//             </div>

//             {/* Rating Card */}
//             <div className="absolute left-0 top-0 z-20 rounded-xl bg-white px-3 py-2 text-xs shadow-xl sm:left-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm lg:left-0 lg:px-6 lg:py-4 lg:text-base">
//               ⭐ <span className="font-semibold">4.9 Rating</span>
//             </div>

//             {/* Delivery Card */}
//             <div className="absolute bottom-5 right-0 z-20 rounded-xl bg-white px-3 py-2 text-xs shadow-xl sm:bottom-8 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm lg:bottom-16 lg:px-6 lg:py-4 lg:text-base">
//               🚚 <span className="font-semibold">30 Min Delivery</span>
//             </div>

//             {/* Chef Card */}
//             <div className="absolute bottom-0 left-0 z-20 rounded-xl bg-white px-3 py-2 text-xs shadow-xl sm:left-4 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm lg:left-0 lg:px-6 lg:py-4 lg:text-base">
//               👨‍🍳 <span className="font-semibold">Master Chef</span>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default Hero;

import { ArrowRight, Clock3, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Container from '../common/Container';
import heroBurger from '../../assets/images/hero-burger.png';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#fffaf5] pt-20 sm:pt-20 lg:pt-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-200/30 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-orange-100/40 blur-[100px]" />

      <Container>
        <div className="grid min-h-[calc(100vh-104px)] grid-cols-1 items-center gap-10 py-8 sm:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6 lg:py-8">
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10 mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm sm:mb-6 sm:px-5 sm:py-2.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />

              <span className="text-xs font-semibold tracking-wide text-gray-700 sm:text-sm">
                Freshly prepared every day
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-gray-950 sm:text-6xl md:text-7xl lg:text-[64px] xl:text-[72px]">
              Great food.
              <span className="block text-orange-500">Made with passion.</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0">
              Discover delicious dishes crafted with premium ingredients,
              prepared by skilled chefs, and delivered fresh to your doorstep.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-500/20 sm:w-auto sm:px-8 sm:py-4"
              >
                Order Now
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:text-orange-500 hover:shadow-md sm:w-auto sm:px-8 sm:py-4"
              >
                Explore Menu
              </button>
            </div>

            {/* Trust information */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-gray-600 lg:justify-start">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <Star size={16} className="fill-orange-500 text-orange-500" />

                <span>
                  <strong className="text-gray-900">4.9/5</strong> rating
                </span>
              </div>

              <span className="hidden h-4 w-px bg-gray-300 sm:block" />

              {/* Delivery */}
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-orange-500" />

                <span>
                  <strong className="text-gray-900">30 min</strong> delivery
                </span>
              </div>

              <span className="hidden h-4 w-px bg-gray-300 sm:block" />

              {/* Customers */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-orange-500">8K+</span>

                <span>
                  <strong className="text-gray-900">customers</strong>
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative mx-auto flex w-full max-w-[600px] items-center justify-center py-8 sm:py-10 lg:justify-end lg:py-0">
            {/* Soft glow behind image */}
            <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-orange-300/20 blur-[70px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />

            {/* Main orange circle */}
            <div className="absolute h-[260px] w-[260px] rounded-full bg-gradient-to-br from-orange-100 via-orange-100 to-orange-200 sm:h-[370px] sm:w-[370px] md:h-[450px] md:w-[450px] lg:h-[510px] lg:w-[510px]" />

            {/* Thin outer ring */}
            <div className="absolute h-[300px] w-[300px] rounded-full border border-orange-200/70 sm:h-[420px] sm:w-[420px] md:h-[500px] md:w-[500px] lg:h-[560px] lg:w-[560px]" />

            {/* Second subtle ring */}
            <div className="absolute h-[320px] w-[320px] rounded-full border border-orange-100/60 sm:h-[440px] sm:w-[440px] md:h-[520px] md:w-[520px] lg:h-[580px] lg:w-[580px]" />

            {/* Food image */}
            <div className="relative z-10 h-[280px] w-[280px] overflow-hidden rounded-full border-[6px] border-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] transition-transform duration-700 hover:scale-[1.015] sm:h-[370px] sm:w-[370px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]">
              <img
                src={heroBurger}
                alt="Premium pizza"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5" />
            </div>

            {/* ================= PREMIUM RATING CARD ================= */}
            <div className="group absolute left-0 top-0 z-20 sm:left-1 sm:top-5 lg:-left-1 lg:top-8">
              {/* Card */}
              <div className="relative flex items-center gap-3 rounded-[20px] border border-white/80 bg-white/95 px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.16)] sm:gap-3.5 sm:px-5 sm:py-3.5">
                {/* Star container */}
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  {/* Soft inner glow */}
                  <div className="absolute inset-1 rounded-full bg-orange-200/50" />

                  <Star
                    size={21}
                    strokeWidth={2.5}
                    className="relative z-10 fill-orange-500 text-orange-500"
                  />
                </div>

                {/* Rating information */}
                <div className="min-w-[105px]">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[15px] font-extrabold leading-tight text-gray-950">
                      4.9
                    </p>

                    <div className="flex items-center gap-[1px]">
                      <Star
                        size={9}
                        className="fill-orange-400 text-orange-400"
                      />
                      <Star
                        size={9}
                        className="fill-orange-400 text-orange-400"
                      />
                      <Star
                        size={9}
                        className="fill-orange-400 text-orange-400"
                      />
                      <Star
                        size={9}
                        className="fill-orange-400 text-orange-400"
                      />
                      <Star
                        size={9}
                        className="fill-orange-400 text-orange-400"
                      />
                    </div>
                  </div>

                  <p className="mt-1 text-[11px] font-medium text-gray-500">
                    Excellent rating
                  </p>

                  <p className="text-[10px] text-gray-400">
                    2,000+ happy reviews
                  </p>
                </div>
              </div>

              {/* Tiny decorative dot */}
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-orange-500" />
            </div>

            {/* ================= DELIVERY CARD ================= */}
            <div className="group absolute bottom-0 right-0 z-20 sm:bottom-5 lg:bottom-8">
              <div className="flex items-center gap-3 rounded-[20px] border border-white/80 bg-white/95 px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.16)] sm:gap-3.5 sm:px-5 sm:py-3.5">
                {/* Clock container */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Clock3
                    size={21}
                    strokeWidth={2.3}
                    className="text-orange-500"
                  />
                </div>

                {/* Delivery information */}
                <div>
                  <p className="text-[15px] font-extrabold leading-tight text-gray-950">
                    30 Min Delivery
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-gray-500">
                    Fresh at your doorstep
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                    <span className="text-[10px] font-semibold text-green-600">
                      Fast & fresh
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small decorative orange dot */}
            <div className="absolute bottom-[18%] left-[8%] z-20 hidden h-3 w-3 rounded-full bg-orange-400 shadow-lg shadow-orange-300/50 md:block" />

            {/* Small decorative dot */}
            <div className="absolute right-[8%] top-[18%] z-20 hidden h-2 w-2 rounded-full bg-orange-300 md:block" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
