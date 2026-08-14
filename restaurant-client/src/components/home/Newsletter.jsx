import Container from '../common/Container';
import { Mail } from 'lucide-react';

const Newsletter = () => {
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

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-6 py-4 text-gray-900 outline-none"
            />

            <button className="rounded-full bg-gray-900 px-8 py-4 font-semibold text-white transition hover:bg-black">
              Subscribe
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
