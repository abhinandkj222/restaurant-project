import { useEffect, useState } from 'react';
import { Mail, Users } from 'lucide-react';
import toast from 'react-hot-toast';

import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const response = await api.get('/newsletter/admin');

      setSubscribers(response.data.subscribers);
    } catch (error) {
      console.error('failed to fetch subscribers:', error);

      toast.error('failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Newsletter Subscribers
          </h1>

          <p className="mt-1 text-gray-500">
            Customers who subscribed to restaurant updates.
          </p>
        </div>

        {/* Total */}
        <div className="mb-6 flex w-fit items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50">
            <Users className="text-orange-500" size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Subscribers
            </p>

            <p className="text-2xl font-bold text-gray-900">
              {subscribers.length}
            </p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            Loading subscribers...
          </div>
        ) : subscribers.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <Mail
              size={40}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              No subscribers yet
            </h2>

            <p className="mt-1 text-gray-500">
              Newsletter subscribers will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      #
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Subscribed On
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {subscribers.map((subscriber, index) => (
                    <tr
                      key={subscriber.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">
                            <Mail
                              size={17}
                              className="text-orange-500"
                            />
                          </div>

                          <span className="font-medium text-gray-800">
                            {subscriber.email}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(
                          subscriber.created_at,
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Newsletter;