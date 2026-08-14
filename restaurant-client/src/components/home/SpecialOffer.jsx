import { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
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

  // Don't show anything while loading
  if (loading) {
    return (
      <section className="flex min-h-[300px] items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600">
        <Loader2 size={30} className="animate-spin text-white" />
      </section>
    );
  }

  // Don't show the section if there is no active offer
  if (!offer) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left */}

          <div className="text-center text-white lg:text-left">
            <span className="inline-block rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
              🔥 TODAY'S SPECIAL OFFER
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight lg:text-6xl">
              {offer.title}
            </h2>

            <p className="mt-4 text-lg text-orange-100">{offer.description}</p>

            {/* Coupon */}

            {offer.coupon_code && (
              <div className="mt-8">
                <span className="rounded-xl bg-white px-6 py-3 text-xl font-bold text-orange-600">
                  {offer.coupon_code}
                </span>
              </div>
            )}

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                to="/menu"
                className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-orange-600 transition hover:scale-105"
              >
                {offer.button_text || 'Order Now'}

                <ArrowRight size={18} />
              </Link>

              <Link
                to="/menu"
                className="rounded-full border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-orange-600"
              >
                View Menu
              </Link>
            </div>
          </div>

          {/* Right */}

          <div className="flex justify-center">
            {offer.image_url ? (
              <img
                src={`http://localhost:5000${offer.image_url}`}
                alt={offer.title}
                className="h-80 w-80 rounded-full object-cover shadow-2xl"
              />
            ) : (
              <div className="flex h-80 w-80 items-center justify-center rounded-full bg-white/20 text-[140px] shadow-2xl">
                🍕
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SpecialOffer;
