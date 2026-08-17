import Container from '../common/Container';
import {
  Smartphone,
  Apple,
  Play,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';

const DownloadApp = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-[#17130F] shadow-[0_25px_80px_rgba(45,30,18,0.16)] sm:rounded-[2.5rem]">
          {/* Background glow */}
          <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

          {/* Decorative circles */}
          <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full border border-white/5" />

          <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[280px] w-[280px] rounded-full border border-white/5" />

          <div className="relative grid items-center lg:grid-cols-[1fr_0.9fr]">
            {/* ================= LEFT ================= */}
            <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400 sm:text-xs">
                <Sparkles size={13} />
                Savory App
              </div>

              {/* Heading */}
              <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[54px]">
                Your favourite food,
                <span className="block text-orange-400">one tap away.</span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
                Discover delicious meals, order faster and get exclusive offers
                — all from the Savory app.
              </p>

              {/* Benefits */}
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-xs text-white/70 sm:text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  Faster ordering
                </div>

                <div className="flex items-center gap-2 text-xs text-white/70 sm:text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  Exclusive offers
                </div>

                <div className="flex items-center gap-2 text-xs text-white/70 sm:text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  Easy checkout
                </div>

                <div className="flex items-center gap-2 text-xs text-white/70 sm:text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  Order updates
                </div>
              </div>

              {/* Store buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white px-4 py-3 text-gray-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 sm:px-5"
                >
                  <Apple size={24} fill="currentColor" />

                  <div className="text-left">
                    <p className="text-[9px] font-medium uppercase tracking-wide text-gray-500">
                      Download on the
                    </p>

                    <p className="text-sm font-bold leading-4">App Store</p>
                  </div>

                  <ArrowRight
                    size={15}
                    className="ml-1 text-gray-400 transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white px-4 py-3 text-gray-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 sm:px-5"
                >
                  <Play size={22} fill="currentColor" />

                  <div className="text-left">
                    <p className="text-[9px] font-medium uppercase tracking-wide text-gray-500">
                      Get it on
                    </p>

                    <p className="text-sm font-bold leading-4">Google Play</p>
                  </div>

                  <ArrowRight
                    size={15}
                    className="ml-1 text-gray-400 transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative flex min-h-[360px] items-center justify-center px-6 pb-12 sm:min-h-[430px] sm:px-10 sm:pb-14 lg:min-h-[520px] lg:pb-0">
              {/* Orange glow */}
              <div className="absolute h-64 w-64 rounded-full bg-orange-500/15 blur-2xl sm:h-80 sm:w-80" />

              {/* Decorative circle */}
              <div className="absolute h-64 w-64 rounded-full border border-orange-400/15 sm:h-80 sm:w-80 lg:h-[390px] lg:w-[390px]" />

              {/* Phone */}
              <div className="relative z-10">
                {/* Phone shadow */}
                <div className="absolute inset-x-5 bottom-[-25px] h-10 rounded-full bg-black/40 blur-xl" />

                {/* Phone body */}
                <div className="relative h-[330px] w-[170px] rounded-[2.2rem] border-[5px] border-gray-700 bg-black p-1.5 shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:h-[390px] sm:w-[200px] lg:h-[430px] lg:w-[220px]">
                  {/* Screen */}
                  <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-[#FFF8F1]">
                    {/* Top bar */}
                    <div className="flex items-center justify-center pt-4">
                      <div className="h-1 w-12 rounded-full bg-gray-900/20" />
                    </div>

                    {/* App content */}
                    <div className="px-4 pt-7 sm:px-5 sm:pt-9">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[7px] font-medium text-gray-400 sm:text-[8px]">
                            Welcome back
                          </p>

                          <p className="mt-0.5 text-xs font-bold text-gray-900 sm:text-sm">
                            What are you craving?
                          </p>
                        </div>

                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white sm:h-8 sm:w-8">
                          S
                        </div>
                      </div>

                      {/* Search */}
                      <div className="mt-4 rounded-lg bg-white px-3 py-2 shadow-sm">
                        <p className="text-[7px] text-gray-400 sm:text-[8px]">
                          Search delicious food...
                        </p>
                      </div>

                      {/* Food card */}
                      <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm">
                        <div className="flex h-20 items-center justify-center bg-orange-100 sm:h-24">
                          <span className="text-4xl sm:text-5xl">🍔</span>
                        </div>

                        <div className="p-2.5 sm:p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-[9px] font-bold text-gray-900 sm:text-[10px]">
                              Classic Burger
                            </p>

                            <span className="text-[9px] font-bold text-orange-500 sm:text-[10px]">
                              ₹249
                            </span>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[7px] text-gray-400 sm:text-[8px]">
                              ⭐ 4.9
                            </span>

                            <div className="rounded-full bg-orange-500 px-2 py-1 text-[7px] font-bold text-white">
                              Add
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom cards */}
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-orange-500 p-2 text-white">
                          <p className="text-[7px] opacity-70">Special</p>

                          <p className="mt-0.5 text-[9px] font-bold">20% OFF</p>
                        </div>

                        <div className="rounded-lg bg-white p-2 shadow-sm">
                          <p className="text-[7px] text-gray-400">Delivery</p>

                          <p className="mt-0.5 text-[9px] font-bold text-gray-900">
                            Fast & Fresh
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom navigation */}
                    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white px-4 py-3">
                      <div className="flex justify-around">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute bottom-12 left-3 z-20 rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 shadow-xl backdrop-blur-md sm:left-8 sm:px-4 sm:py-3 lg:bottom-20 lg:left-10">
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-orange-300">
                  Available now
                </p>

                <p className="mt-0.5 text-xs font-bold text-white sm:text-sm">
                  Order in seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DownloadApp;
