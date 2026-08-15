import { useState } from 'react';
import Container from '../common/Container';
import { Mail } from 'lucide-react';

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
    <section className="bg-orange-500 py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center text-white">
          <Mail size={50} className="mx-auto mb-6" />

          <h2 className="text-3xl font-bold sm:text-4xl">
            Subscribe To Our Newsletter
          </h2>

          <p className="mt-4 text-orange-100">
            Get exclusive offers, new menu updates and special discounts.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-full px-6 py-4 text-gray-900 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-gray-900 px-8 py-4 font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <p className="mt-4 rounded-xl bg-white/15 px-4 py-3 text-sm font-medium">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-xl bg-red-900/30 px-4 py-3 text-sm font-medium">
              {error}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
