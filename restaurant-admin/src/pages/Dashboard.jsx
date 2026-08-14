import { UtensilsCrossed, Tags, CalendarDays } from 'lucide-react';

import AdminLayout from '../components/layout/AdminLayout';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Overview
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Welcome back, Admin 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your restaurant from here.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <UtensilsCrossed size={24} />
            </div>

            <p className="text-sm text-gray-500">
              Food Items
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              0
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Tags size={24} />
            </div>

            <p className="text-sm text-gray-500">
              Categories
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              0
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <CalendarDays size={24} />
            </div>

            <p className="text-sm text-gray-500">
              Bookings
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              0
            </h2>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;