import { useState } from 'react';
import Container from '../common/Container';
import { ArrowRight, CheckCircle2, Mail, Sparkles } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/newsletter`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'failed to subscribe');
      }

      setMessage('You have subscribed successfully. Thank you for joining us!');

      setEmail('');
    } catch (error) {
      console.error('newsletter error:', error);

      setError(error.message || 'failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FFF8F1] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-amber-200/25 blur-3xl" />

      <Container>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gray-950 shadow-[0_25px_80px_rgba(0,0,0,0.15)] sm:rounded-[2.5rem]">
          {/* Orange glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

          {/* Decorative circle */}
          <div className="pointer-events-none absolute right-[-100px] top-[-100px] hidden h-72 w-72 rounded-full border border-white/5 sm:block" />

          <div className="relative grid items-center gap-10 px-5 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-16 lg:py-16">
            {/* Left */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                <Sparkles size={14} />
                Stay in the loop
              </div>

              {/* Heading */}
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Something delicious
                <span className="block text-orange-400">
                  is coming your way.
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7 lg:mx-0">
                Subscribe for exclusive offers, new menu updates and special
                discounts delivered straight to your inbox.
              </p>

              {/* Benefits */}
              <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 sm:text-sm">
                  <CheckCircle2 size={15} className="text-orange-400" />
                  Exclusive offers
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 sm:text-sm">
                  <CheckCircle2 size={15} className="text-orange-400" />
                  New menu updates
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm sm:rounded-3xl sm:p-4"
              >
                <div className="mb-4 flex items-center gap-3 px-2 sm:px-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                    <Mail size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Join our newsletter
                    </p>

                    <p className="text-xs text-gray-500">
                      No spam. Just good food.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setMessage('');
                        setError('');
                      }}
                      placeholder="Enter your email address"
                      required
                      className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.07] pl-11 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-orange-400/60 focus:bg-white/10 focus:ring-4 focus:ring-orange-500/10 sm:rounded-2xl"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-14 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-2xl sm:px-7"
                  >
                    {loading ? (
                      'Subscribing...'
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Success */}
              {message && (
                <div className="mt-3 flex items-start gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-300">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                  {error}
                </div>
              )}

              <p className="mt-4 text-center text-[11px] text-gray-600 sm:text-xs">
                By subscribing, you agree to receive updates from Savory.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
