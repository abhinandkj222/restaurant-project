import Container from '../common/Container';
import { Smartphone, Apple, Play } from 'lucide-react';

const DownloadApp = () => {
  return (
    <section className="bg-[#FFF8F1] py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="text-center lg:text-left">
            <span className="text-sm font-semibold uppercase tracking-[4px] text-orange-500">
              Mobile App
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Download Our App
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Order your favorite meals, track your delivery in real time, and
              enjoy exclusive app-only offers.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button className="flex items-center gap-3 rounded-2xl bg-black px-6 py-4 text-white transition hover:scale-105">
                <Apple />
                <div className="text-left">
                  <p className="text-xs">Download on the</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </button>

              <button className="flex items-center gap-3 rounded-2xl bg-black px-6 py-4 text-white transition hover:scale-105">
                <Play />
                <div className="text-left">
                  <p className="text-xs">Get it on</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <div className="flex h-80 w-80 items-center justify-center rounded-[60px] bg-gradient-to-br from-orange-400 to-orange-600 shadow-2xl">
              <Smartphone size={160} className="text-white" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DownloadApp;
