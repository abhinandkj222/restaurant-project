import { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Sparkles, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

import Container from '../common/Container';
import api from '../../services/api';

const SpecialOffer = () => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveOffer = async () => {
      try {
        const response = await api.get('/offers/active');

        setOffer(response.data.offer || null);
      } catch (error) {
        console.error('failed to fetch active offer:', error);
        setOffer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveOffer();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="flex min-h-[280px] items-center justify-center bg-[#17130F] sm:min-h-[320px]">
        <Loader2 size={28} className="animate-spin text-orange-500" />
      </section>
    );
  }

  // No active offer
  if (!offer) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#17130F] px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl sm:h-72 sm:w-72" />

      <Container>
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#211B15] shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:rounded-[2rem]">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full border border-orange-500/10 sm:h-80 sm:w-80" />

          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full border border-orange-500/10 sm:h-56 sm:w-56" />

          <div className="grid items-center lg:grid-cols-[1.05fr_0.95fr]">
            {/* ================= LEFT ================= */}
            <div className="relative z-10 px-5 py-9 min-[400px]:px-6 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-16">
              {/* Eyebrow */}
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-orange-400 min-[400px]:px-3.5 min-[400px]:py-2 min-[400px]:text-[10px] sm:text-xs sm:tracking-[0.18em]">
                <Sparkles size={13} className="shrink-0 sm:h-3.5 sm:w-3.5" />

                <span>Today's Special</span>
              </div>

              {/* Heading */}
              <h2 className="mt-4 max-w-xl text-[30px] font-bold leading-[1.05] tracking-tight text-white min-[400px]:text-3xl sm:mt-5 sm:text-4xl lg:text-5xl xl:text-[58px]">
                {offer.title}
              </h2>

              {/* Description */}
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/60 sm:mt-5 sm:text-base sm:leading-7">
                {offer.description}
              </p>

              {/* Coupon */}
              {offer.coupon_code && (
                <div className="mt-6 sm:mt-7">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40 sm:text-[10px] sm:tracking-[0.18em]">
                    Use promo code
                  </p>

                  <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-dashed border-orange-400/50 bg-orange-500/10 px-3.5 py-2.5 min-[400px]:gap-3 min-[400px]:px-4 min-[400px]:py-3">
                    <Tag size={16} className="shrink-0 text-orange-400" />

                    <span className="truncate font-mono text-xs font-bold tracking-wider text-orange-300 min-[400px]:text-sm sm:text-base">
                      {offer.coupon_code}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-3 min-[400px]:flex-row sm:mt-8">
                <Link
                  to="/menu"
                  className="group inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-400 min-[400px]:flex-none min-[400px]:px-6 sm:px-7"
                >
                  <span>{offer.button_text || 'Order Now'}</span>

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/menu"
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 min-[400px]:flex-none min-[400px]:px-6 sm:px-7"
                >
                  View Menu
                </Link>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden px-5 pb-8 pt-2 min-[400px]:min-h-[310px] sm:min-h-[400px] sm:px-10 sm:pb-14 sm:pt-0 lg:min-h-[500px] lg:pb-0">
              {/* Background circle */}
              <div className="absolute h-52 w-52 rounded-full bg-orange-500/10 min-[400px]:h-60 min-[400px]:w-60 sm:h-80 sm:w-80 lg:h-[400px] lg:w-[400px]" />

              <div className="absolute h-44 w-44 rounded-full border border-orange-400/20 min-[400px]:h-52 min-[400px]:w-52 sm:h-64 sm:w-64 lg:h-[330px] lg:w-[330px]" />

              {/* Food image */}
              {offer.image_url ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${offer.image_url}`}
                  alt={offer.title}
                  className="relative z-10 h-48 w-48 rounded-full object-cover shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-105 min-[400px]:h-56 min-[400px]:w-56 sm:h-72 sm:w-72 lg:h-[340px] lg:w-[340px]"
                />
              ) : (
                <div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full bg-orange-500/10 text-[80px] shadow-[0_25px_60px_rgba(0,0,0,0.35)] min-[400px]:h-56 min-[400px]:w-56 min-[400px]:text-[100px] sm:h-72 sm:w-72 sm:text-[120px] lg:h-[340px] lg:w-[340px] lg:text-[150px]">
                  🍕
                </div>
              )}

              {/* Floating offer badge */}
              <div className="absolute bottom-5 right-5 z-20 hidden rounded-xl border border-white/10 bg-white/10 px-3 py-2 shadow-xl backdrop-blur-md min-[400px]:block sm:bottom-8 sm:right-8 sm:rounded-2xl sm:px-4 sm:py-3 lg:bottom-16 lg:right-12">
                <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-orange-300 sm:text-[9px] sm:tracking-[0.18em]">
                  Limited offer
                </p>

                <p className="mt-1 text-xs font-bold text-white sm:text-sm">
                  Treat yourself today
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SpecialOffer;
