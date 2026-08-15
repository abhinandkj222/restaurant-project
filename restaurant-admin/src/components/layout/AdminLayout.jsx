import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  ClipboardList,
  Megaphone,
  LogOut,
  Mail,
} from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');

    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-gray-200 bg-white md:flex md:flex-col">
        {/* Logo */}
        <div className="border-b border-gray-100 px-6 py-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Savory</h1>

          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-xl bg-orange-50 px-4 py-3 font-semibold text-orange-500"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/foods"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <UtensilsCrossed size={20} />
            Food Items
          </Link>

          <Link
            to="/categories"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Tags size={20} />
            Categories
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <ClipboardList size={20} />
            Orders
          </Link>

          <Link
            to="/offers"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Megaphone size={20} />
            Offers
          </Link>
          <Link
            to="/contacts"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Mail size={20} />
            Contacts
          </Link>
          <Link
            to="/newsletter"
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Mail size={20} />
            Newsletter
          </Link>
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
