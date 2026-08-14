import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import Orders from '../pages/Orders';

import Navbar from '../components/layouts/Navbar';

import Footer from '../components/layouts/Footer';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
