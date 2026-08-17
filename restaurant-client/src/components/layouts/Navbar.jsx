// import Container from '../common/Container';
// import { NAV_LINKS } from '../../constants/navigation';
// import { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';
// import { useCart } from '../../context/CartContext';

// import { ChefHat, ShoppingCart, Menu, X } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [user, setUser] = useState(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { cartItems } = useCart();

//   const hideNavigation = ['/menu', '/cart', '/checkout'].includes(
//     location.pathname,
//   );

//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');

//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error('failed to parse stored user:', error);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   // Close mobile menu whenever page changes
//   useEffect(() => {
//     setIsOpen(false);
//   }, [location.pathname]);

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const guestOrderTokens = JSON.parse(
//         localStorage.getItem('guestOrderTokens') || '[]',
//       );

//       console.log('guest order tokens before login:', guestOrderTokens);

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/auth/google`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             credential: credentialResponse.credential,
//             guestOrderTokens,
//           }),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'google login failed');
//       }

//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));

//       setUser(data.user);
//       setShowLogin(false);

//       navigate('/orders');
//     } catch (error) {
//       console.error('google login error:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');

//     setUser(null);

//     navigate('/');
//   };

//   // Handle section navigation
//   const handleSectionNavigation = (sectionId) => {
//     setIsOpen(false);

//     // Already on home page
//     if (location.pathname === '/') {
//       if (sectionId === 'home') {
//         window.scrollTo({
//           top: 0,
//           behavior: 'smooth',
//         });
//         return;
//       }

//       const section = document.getElementById(sectionId);

//       if (section) {
//         section.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start',
//         });
//       }

//       return;
//     }

//     // Coming from another page
//     navigate('/');

//     // Wait for Home page to render
//     setTimeout(() => {
//       if (sectionId === 'home') {
//         window.scrollTo({
//           top: 0,
//           behavior: 'smooth',
//         });
//         return;
//       }

//       const section = document.getElementById(sectionId);

//       if (section) {
//         section.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start',
//         });
//       }
//     }, 100);
//   };

//   // Handle navigation links
//   const handleNavLinkClick = (link) => {
//     const linkName = link.name.toLowerCase();

//     if (linkName === 'reservations') {
//       if (user) {
//         navigate('/orders');
//       } else {
//         setShowLogin(true);
//       }

//       setIsOpen(false);
//       return;
//     }

//     if (linkName === 'home') {
//       handleSectionNavigation('home');
//       return;
//     }

//     if (linkName === 'about') {
//       handleSectionNavigation('about');
//       return;
//     }

//     if (linkName === 'contact') {
//       handleSectionNavigation('contact');
//       return;
//     }

//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <header className="fixed left-0 top-0 z-50 w-full border-b border-white/30 bg-white/80 backdrop-blur-xl">
//         <Container>
//           <nav className="flex h-16 items-center justify-between gap-3 sm:h-18 lg:h-20">
//             {/* Logo */}
//             <Link to="/" className="flex min-w-0 shrink-0 items-center gap-1">
//               <ChefHat
//                 size={30}
//                 className="shrink-0 text-orange-500 sm:h-[34px] sm:w-[34px]"
//                 strokeWidth={2.5}
//               />

//               <div className="min-w-0">
//                 <h1 className="truncate text-2xl font-extrabold tracking-tight text-orange-500 sm:text-3xl">
//                   Savory
//                 </h1>

//                 <p className="-mt-1 hidden text-[9px] uppercase tracking-[0.2em] text-gray-500 min-[400px]:block sm:text-xs">
//                   Premium Restaurant
//                 </p>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             {!hideNavigation && (
//               <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
//                 {NAV_LINKS.map((link) => {
//                   const linkName = link.name.toLowerCase();

//                   if (
//                     linkName === 'home' ||
//                     linkName === 'about' ||
//                     linkName === 'contact' ||
//                     linkName === 'reservations'
//                   ) {
//                     return (
//                       <li key={link.name}>
//                         <button
//                           type="button"
//                           onClick={() => handleNavLinkClick(link)}
//                           className="whitespace-nowrap font-medium text-gray-700 transition hover:text-orange-500"
//                         >
//                           {link.name}
//                         </button>
//                       </li>
//                     );
//                   }

//                   return (
//                     <li key={link.name}>
//                       <Link
//                         to={link.path}
//                         className="whitespace-nowrap font-medium text-gray-700 transition hover:text-orange-500"
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}

//             {/* Right Side */}
//             <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-5">
//               {/* Cart */}
//               <Link
//                 to="/cart"
//                 aria-label="Shopping cart"
//                 className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-orange-50 sm:h-10 sm:w-10"
//               >
//                 <ShoppingCart size={19} className="sm:h-5 sm:w-5" />

//                 {cartCount > 0 && (
//                   <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white sm:-right-1 sm:-top-1 sm:text-xs">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>

//               {/* User / Login - Desktop */}
//               {user ? (
//                 <div className="hidden lg:block">
//                   <button
//                     type="button"
//                     onClick={() => navigate('/orders')}
//                     className="max-w-[140px] truncate font-semibold text-gray-700 transition hover:text-orange-500"
//                   >
//                     {user.name}
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => setShowLogin(true)}
//                   className="hidden font-medium text-gray-700 transition hover:text-orange-500 lg:block"
//                 >
//                   Login
//                 </button>
//               )}

//               {/* Order Online */}
//               <button
//                 type="button"
//                 onClick={() => navigate('/cart')}
//                 className="hidden rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 sm:px-5 lg:block"
//               >
//                 Order Online
//               </button>

//               {/* Mobile Menu */}
//               <button
//                 type="button"
//                 aria-label="Open menu"
//                 onClick={() => setIsOpen(true)}
//                 className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-orange-50 lg:hidden"
//               >
//                 <Menu size={26} />
//               </button>
//             </div>
//           </nav>
//         </Container>
//       </header>

//       {/* Login Modal */}
//       {showLogin && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
//           <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
//             {/* Close */}
//             <button
//               type="button"
//               onClick={() => setShowLogin(false)}
//               aria-label="Close login"
//               className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 sm:right-5 sm:top-5"
//             >
//               <X size={22} />
//             </button>

//             <div className="text-center">
//               <ChefHat
//                 size={42}
//                 className="mx-auto text-orange-500 sm:h-[45px] sm:w-[45px]"
//               />

//               <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
//                 Welcome to Savory
//               </h2>

//               <p className="mt-2 text-sm text-gray-500 sm:text-base">
//                 Sign in to view your orders
//               </p>

//               <div className="mt-7 flex justify-center sm:mt-8">
//                 <GoogleLogin
//                   onSuccess={handleGoogleSuccess}
//                   onError={() => {
//                     console.error('google login failed');
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Overlay */}
//       <div
//         onClick={() => setIsOpen(false)}
//         className={`fixed inset-0 z-40 bg-black/50 transition-all duration-300 ${
//           isOpen ? 'visible opacity-100' : 'invisible opacity-0'
//         }`}
//       />

//       {/* Mobile Drawer */}
//       <aside
//         className={`fixed right-0 top-0 z-50 h-screen w-[min(88vw,360px)] bg-white shadow-2xl transition-transform duration-300 ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         {/* Drawer Header */}
//         <div className="flex items-center justify-between border-b p-5 sm:p-6">
//           <div className="flex min-w-0 items-center gap-2">
//             <ChefHat className="shrink-0 text-orange-500" size={30} />

//             <div className="min-w-0">
//               <h2 className="text-2xl font-bold text-orange-500">Savory</h2>

//               <p className="truncate text-[9px] uppercase tracking-[0.18em] text-gray-500 sm:text-xs">
//                 Premium Restaurant
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             aria-label="Close menu"
//             onClick={() => setIsOpen(false)}
//             className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-gray-100"
//           >
//             <X size={26} />
//           </button>
//         </div>

//         {/* Drawer Content */}
//         <div className="flex h-[calc(100vh-89px)] flex-col overflow-y-auto p-5 sm:p-6">
//           {/* Navigation */}
//           {!hideNavigation && (
//             <div className="space-y-1">
//               {NAV_LINKS.map((link) => {
//                 const linkName = link.name.toLowerCase();

//                 if (
//                   linkName === 'home' ||
//                   linkName === 'about' ||
//                   linkName === 'contact' ||
//                   linkName === 'reservations'
//                 ) {
//                   return (
//                     <div key={link.name}>
//                       <button
//                         type="button"
//                         onClick={() => handleNavLinkClick(link)}
//                         className="block w-full rounded-xl px-4 py-3.5 text-left text-base font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
//                       >
//                         {link.name}
//                       </button>
//                     </div>
//                   );
//                 }

//                 return (
//                   <div key={link.name}>
//                     <Link
//                       to={link.path}
//                       onClick={() => setIsOpen(false)}
//                       className="block rounded-xl px-4 py-3.5 text-base font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
//                     >
//                       {link.name}
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           <hr className="my-5" />

//           {/* User */}
//           {user ? (
//             <>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsOpen(false);
//                   navigate('/orders');
//                 }}
//                 className="w-full rounded-full border border-orange-500 px-4 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
//               >
//                 {user.name}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsOpen(false);
//                   handleLogout();
//                 }}
//                 className="mt-3 w-full rounded-full bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <button
//               type="button"
//               onClick={() => {
//                 setIsOpen(false);
//                 setShowLogin(true);
//               }}
//               className="w-full rounded-full border border-orange-500 px-4 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
//             >
//               Login with Google
//             </button>
//           )}

//           {/* Mobile Cart */}
//           <Link
//             to="/cart"
//             onClick={() => setIsOpen(false)}
//             className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-3 font-semibold text-gray-800 transition hover:border-orange-300 hover:bg-orange-50"
//           >
//             <ShoppingCart size={18} />
//             View Cart
//             {cartCount > 0 && (
//               <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs text-white">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {/* Mobile Order Button */}
//           <button
//             type="button"
//             onClick={() => {
//               setIsOpen(false);
//               navigate('/cart');
//             }}
//             className="mt-3 w-full rounded-full bg-orange-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
//           >
//             Order Online
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Navbar;

import Container from '../common/Container';
import { NAV_LINKS } from '../../constants/navigation';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useCart } from '../../context/CartContext';

import {
  ChefHat,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const hideNavigation = ['/menu', '/cart', '/checkout'].includes(
    location.pathname,
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const guestOrderTokens = JSON.parse(
        localStorage.getItem('guestOrderTokens') || '[]',
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            credential: credentialResponse.credential,
            guestOrderTokens,
          }),
        },
      );

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

  const handleSectionNavigation = (sectionId) => {
    setIsOpen(false);

    if (location.pathname === '/') {
      if (sectionId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        return;
      }

      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

      return;
    }

    navigate('/');

    setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        return;
      }

      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  const handleNavLinkClick = (link) => {
    const linkName = link.name.toLowerCase();

    if (linkName === 'reservations') {
      if (user) {
        navigate('/orders');
      } else {
        setShowLogin(true);
      }

      setIsOpen(false);

      return;
    }

    if (linkName === 'home') {
      handleSectionNavigation('home');
      return;
    }

    if (linkName === 'about') {
      handleSectionNavigation('about');
      return;
    }

    if (linkName === 'contact') {
      handleSectionNavigation('contact');
      return;
    }

    setIsOpen(false);
  };

  return (
    <>
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="fixed left-0 top-0 z-50 w-full">
        <div className="px-3 pt-3 sm:px-5 lg:px-6">
          <div className="mx-auto max-w-[1440px]">
            <div className="rounded-2xl border border-white/60 bg-white/85 shadow-[0_8px_35px_rgba(40,25,15,0.07)] backdrop-blur-xl sm:rounded-3xl">
              <Container>
                <nav className="flex h-[64px] items-center justify-between gap-3 sm:h-[72px] lg:h-[76px]">
                  {/* =================================================
                      LOGO
                  ================================================= */}
                  <Link
                    to="/"
                    className="group flex shrink-0 items-center gap-2"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20 transition-all duration-300 group-hover:rotate-3 group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-2xl">
                      <ChefHat
                        size={23}
                        strokeWidth={2.4}
                        className="sm:h-6 sm:w-6"
                      />
                    </div>

                    <div className="hidden min-[400px]:block">
                      <h1 className="text-[22px] font-extrabold leading-none tracking-tight text-gray-950 sm:text-2xl">
                        Savory
                      </h1>

                      <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.25em] text-orange-500 sm:text-[8px]">
                        Premium Restaurant
                      </p>
                    </div>
                  </Link>

                  {/* =================================================
                      DESKTOP NAVIGATION
                  ================================================= */}
                  {!hideNavigation && (
                    <ul className="hidden items-center gap-1 lg:flex">
                      {NAV_LINKS.map((link) => {
                        const linkName = link.name.toLowerCase();

                        if (
                          linkName === 'home' ||
                          linkName === 'about' ||
                          linkName === 'contact' ||
                          linkName === 'reservations'
                        ) {
                          return (
                            <li key={link.name}>
                              <button
                                type="button"
                                onClick={() => handleNavLinkClick(link)}
                                className="relative rounded-full px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-orange-50 hover:text-orange-500 xl:px-5"
                              >
                                {link.name}
                              </button>
                            </li>
                          );
                        }

                        return (
                          <li key={link.name}>
                            <Link
                              to={link.path}
                              className="relative rounded-full px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-orange-50 hover:text-orange-500 xl:px-5"
                            >
                              {link.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {/* =================================================
                      RIGHT ACTIONS
                  ================================================= */}
                  <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
                    {/* Cart */}
                    <Link
                      to="/cart"
                      aria-label="Shopping cart"
                      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-700 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 sm:h-11 sm:w-11"
                    >
                      <ShoppingCart
                        size={18}
                        className="transition-transform duration-200 group-hover:scale-105 sm:h-[19px] sm:w-[19px]"
                      />

                      {cartCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                          {cartCount}
                        </span>
                      )}
                    </Link>

                    {/* Desktop User */}
                    {user ? (
                      <button
                        type="button"
                        onClick={() => navigate('/orders')}
                        className="hidden max-w-[150px] items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 lg:flex"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                          <User size={14} />
                        </div>

                        <span className="truncate">{user.name}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowLogin(true)}
                        className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 lg:block"
                      >
                        Login
                      </button>
                    )}

                    {/* Order Online */}
                    <button
                      type="button"
                      onClick={() => navigate('/cart')}
                      className="hidden rounded-full bg-gray-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-orange-500/20 lg:block"
                    >
                      Order Online
                    </button>

                    {/* Mobile menu */}
                    <button
                      type="button"
                      aria-label="Open menu"
                      onClick={() => setIsOpen(true)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-800 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 lg:hidden"
                    >
                      <Menu size={23} />
                    </button>
                  </div>
                </nav>
              </Container>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          LOGIN MODAL
      ========================================================= */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/50 bg-white p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:p-8">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-100 blur-3xl" />

            {/* Close */}
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              aria-label="Close login"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition hover:bg-orange-50 hover:text-orange-500 sm:right-5 sm:top-5"
            >
              <X size={19} />
            </button>

            <div className="relative text-center">
              {/* Logo */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <ChefHat size={34} strokeWidth={2.2} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                Welcome Back
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
                Welcome to Savory
              </h2>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
                Sign in securely to view your orders and continue your
                experience.
              </p>

              <div className="mt-7 flex justify-center sm:mt-8">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.error('google login failed');
                  }}
                />
              </div>

              <p className="mt-5 text-[11px] leading-5 text-gray-400">
                Secure sign-in powered by Google
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MOBILE OVERLAY
      ========================================================= */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-gray-950/50 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />

      {/* =========================================================
          MOBILE DRAWER
      ========================================================= */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[min(88vw,380px)] bg-[#FFFCF9] shadow-[-20px_0_70px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
              <ChefHat size={22} />
            </div>

            <div>
              <h2 className="text-xl font-extrabold leading-none text-gray-950">
                Savory
              </h2>

              <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.22em] text-orange-500">
                Premium Restaurant
              </p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm ring-1 ring-gray-100 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <X size={21} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex h-[calc(100vh-81px)] flex-col overflow-y-auto px-5 py-6 sm:px-6">
          {/* Navigation */}
          {!hideNavigation && (
            <>
              <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                Navigation
              </p>

              <div className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const linkName = link.name.toLowerCase();

                  if (
                    linkName === 'home' ||
                    linkName === 'about' ||
                    linkName === 'contact' ||
                    linkName === 'reservations'
                  ) {
                    return (
                      <button
                        key={link.name}
                        type="button"
                        onClick={() => handleNavLinkClick(link)}
                        className="group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                      >
                        <span>{link.name}</span>

                        <ChevronRight
                          size={17}
                          className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-orange-400"
                        />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                    >
                      <span>{link.name}</span>

                      <ChevronRight
                        size={17}
                        className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-orange-400"
                      />
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* Actions */}
          <div className="mt-7 border-t border-gray-100 pt-6">
            <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
              Account
            </p>

            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/orders');
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3.5 text-left"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white">
                    <User size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Signed in as</p>

                    <p className="truncate text-sm font-bold text-gray-900">
                      {user.name}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setShowLogin(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-orange-500 px-4 py-3.5 text-sm font-bold text-orange-500 transition hover:bg-orange-50"
              >
                Login with Google
              </button>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3.5 text-sm font-bold text-gray-800 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
          >
            <ShoppingCart size={18} />
            View Cart
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Order */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate('/cart');
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            Order Online
            <ChevronRight size={17} />
          </button>

          {/* Bottom Brand */}
          <div className="mt-auto pt-8 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
              SAVORY • MADE WITH CARE
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
