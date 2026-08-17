import Container from '../common/Container';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#17120F] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

      <Container>
        {/* Main Footer */}
        <div className="relative py-14 sm:py-16 lg:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr] lg:gap-10">
            {/* Brand */}
            <div>
              <Link to="/" className="group inline-flex items-center gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-xl font-extrabold text-white shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:rotate-3">
                  S
                </span>

                <span className="text-3xl font-extrabold tracking-tight">
                  Savory
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400 sm:text-base">
                Fresh ingredients, delicious flavors and memorable meals — made
                with care and served with passion.
              </p>

              {/* Social */}
              <div className="mt-7 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500 hover:text-white"
                >
                  <FaFacebookF size={15} />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500 hover:text-white"
                >
                  <FaInstagram size={16} />
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500 hover:text-white"
                >
                  <FaTwitter size={15} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
                Explore
              </h3>

              <ul className="mt-6 space-y-4">
                <li>
                  <Link
                    to="/"
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-orange-400"
                  >
                    Home
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/menu"
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-orange-400"
                  >
                    Menu
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-orange-400"
                  >
                    About Us
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-orange-400"
                  >
                    Contact
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
                Contact
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Visit Us
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-300">
                      Kochi, Kerala
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Phone size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Call Us
                    </p>

                    <a
                      href="tel:+919876543210"
                      className="mt-1 block text-sm text-gray-300 transition hover:text-orange-400"
                    >
                      +91 9876543210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Mail size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email Us
                    </p>

                    <a
                      href="mailto:info@savory.com"
                      className="mt-1 block break-all text-sm text-gray-300 transition hover:text-orange-400"
                    >
                      info@savory.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
                Opening Hours
              </h3>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Clock3 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      We're Open
                    </p>

                    <p className="text-xs text-green-400">Ready to serve you</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-500">Mon - Fri</span>
                    <span className="font-medium text-gray-300">
                      9 AM - 10 PM
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-500">Saturday</span>
                    <span className="font-medium text-gray-300">
                      10 AM - 11 PM
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-500">Sunday</span>
                    <span className="font-medium text-gray-300">
                      10 AM - 9 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-gray-500 sm:text-sm">
              © 2026 <span className="font-semibold text-gray-400">Savory</span>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-xs text-gray-500 sm:text-sm">
              <Link to="/privacy" className="transition hover:text-orange-400">
                Privacy Policy
              </Link>

              <span className="h-1 w-1 rounded-full bg-gray-700" />

              <Link to="/terms" className="transition hover:text-orange-400">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
