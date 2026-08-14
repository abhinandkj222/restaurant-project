import Container from '../common/Container';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-16 text-white">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-orange-500">Savory</h2>

            <p className="mt-4 text-gray-400">
              Fresh food, fast delivery and unforgettable taste.
            </p>

            <div className="mt-6 flex gap-4">
              <FaFacebookF
                className="cursor-pointer hover:text-orange-500 transition"
                size={20}
              />
              <FaInstagram
                className="cursor-pointer hover:text-orange-500 transition"
                size={20}
              />
              <FaTwitter
                className="cursor-pointer hover:text-orange-500 transition"
                size={20}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-gray-400">
              <li>Home</li>
              <li>Menu</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Contact</h3>

            <div className="space-y-4 text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin size={18} />
                Kochi, Kerala
              </p>

              <p className="flex items-center gap-2">
                <Phone size={18} />
                +91 9876543210
              </p>

              <p className="flex items-center gap-2">
                <Mail size={18} />
                info@savory.com
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Opening Hours</h3>

            <div className="space-y-3 text-gray-400">
              <p>Mon - Fri : 9 AM - 10 PM</p>
              <p>Saturday : 10 AM - 11 PM</p>
              <p>Sunday : 10 AM - 9 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
          © 2026 Savory. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
