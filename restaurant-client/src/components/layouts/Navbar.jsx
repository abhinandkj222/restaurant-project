import Container from '../common/Container';
import { NAV_LINKS } from '../../constants/navigation';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useCart } from '../../context/CartContext';

import { ChefHat, ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();

  const { cartItems } = useCart();
  const navigate = useNavigate();

  const hideNavigation = ['/menu', '/cart', '/checkout'].includes(
    location.pathname,
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Close mobile menu whenever page changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const guestOrderTokens = JSON.parse(
        localStorage.getItem('guestOrderTokens') || '[]',
      );

      console.log('guest order tokens before login:', guestOrderTokens);

      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
          guestOrderTokens,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'google login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setUser(data.user);
      setShowLogin(false);

      navigate('/orders');
    } catch (error) {
      console.error('google login error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);

    navigate('/');
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/30 bg-white/80 backdrop-blur-xl">
        <Container>
          <nav className="flex h-16 items-center justify-between gap-3 sm:h-18 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex min-w-0 shrink-0 items-center gap-1">
              <ChefHat
                size={30}
                className="shrink-0 text-orange-500 sm:h-[34px] sm:w-[34px]"
                strokeWidth={2.5}
              />

              <div className="min-w-0">
                <h1 className="truncate text-2xl font-extrabold tracking-tight text-orange-500 sm:text-3xl">
                  Savory
                </h1>

                <p className="-mt-1 hidden text-[9px] uppercase tracking-[0.2em] text-gray-500 min-[400px]:block sm:text-xs">
                  Premium Restaurant
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {!hideNavigation && (
              <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="whitespace-nowrap font-medium text-gray-700 transition hover:text-orange-500"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Right Side */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-5">
              {/* Cart */}
              <Link
                to="/cart"
                aria-label="Shopping cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-orange-50 sm:h-10 sm:w-10"
              >
                <ShoppingCart size={19} className="sm:h-5 sm:w-5" />

                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white sm:-right-1 sm:-top-1 sm:text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User / Login - Desktop */}
              {user ? (
                <div className="hidden lg:block">
                  <button
                    onClick={() => navigate('/orders')}
                    className="max-w-[140px] truncate font-semibold text-gray-700 transition hover:text-orange-500"
                  >
                    {user.name}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="hidden font-medium text-gray-700 transition hover:text-orange-500 lg:block"
                >
                  Login
                </button>
              )}

              {/* Order Online */}
              <button
                onClick={() => navigate('/cart')}
                className="hidden rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 sm:px-5 lg:block"
              >
                Order Online
              </button>

              {/* Mobile Menu */}
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setIsOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-orange-50 lg:hidden"
              >
                <Menu size={26} />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setShowLogin(false)}
              aria-label="Close login"
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 sm:right-5 sm:top-5"
            >
              <X size={22} />
            </button>

            <div className="text-center">
              <ChefHat
                size={42}
                className="mx-auto text-orange-500 sm:h-[45px] sm:w-[45px]"
              />

              <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
                Welcome to Savory
              </h2>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Sign in to view your orders
              </p>

              <div className="mt-7 flex justify-center sm:mt-8">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.error('google login failed');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[min(88vw,360px)] bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b p-5 sm:p-6">
          <div className="flex min-w-0 items-center gap-2">
            <ChefHat className="shrink-0 text-orange-500" size={30} />

            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-orange-500">Savory</h2>

              <p className="truncate text-[9px] uppercase tracking-[0.18em] text-gray-500 sm:text-xs">
                Premium Restaurant
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-gray-100"
          >
            <X size={26} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex h-[calc(100vh-89px)] flex-col overflow-y-auto p-5 sm:p-6">
          {/* Navigation */}
          {!hideNavigation && (
            <div className="space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-3.5 text-base font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          <hr className="my-5" />

          {/* User */}
          {user ? (
            <>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/orders');
                }}
                className="w-full rounded-full border border-orange-500 px-4 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
              >
                {user.name}
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="mt-3 w-full rounded-full bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogin(true);
              }}
              className="w-full rounded-full border border-orange-500 px-4 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
            >
              Login with Google
            </button>
          )}

          {/* Mobile Cart */}
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-3 font-semibold text-gray-800 transition hover:border-orange-300 hover:bg-orange-50"
          >
            <ShoppingCart size={18} />
            View Cart
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Order Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/cart');
            }}
            className="mt-3 w-full rounded-full bg-orange-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
          >
            Order Online
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
