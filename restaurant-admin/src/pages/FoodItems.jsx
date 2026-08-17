import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, UtensilsCrossed } from 'lucide-react';
import AddFoodModal from '../components/food/AddFoodModal';

import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';
import toast from 'react-hot-toast';

const FoodItems = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddFood, setShowAddFood] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const fetchFoods = async () => {
    try {
      const response = await api.get('/admin/foods');

      setFoods(response.data.foods);
    } catch (error) {
      console.error('failed to fetch foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this food?',
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/admin/foods/${id}`);

      await fetchFoods();

      toast.success('Food deleted successfully');
    } catch (error) {
      console.error('delete food error:', error);

      toast.error(error.response?.data?.message || 'Failed to delete food');
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              Menu Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Food Items
            </h1>

            <p className="mt-2 text-gray-500">
              Add and manage your restaurant menu.
            </p>
          </div>

          <button
            onClick={() => setShowAddFood(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
          >
            <Plus size={20} />
            Add Food
          </button>
        </div>

        {/* Food table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-60 items-center justify-center">
              <p className="text-gray-500">Loading foods...</p>
            </div>
          ) : foods.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <UtensilsCrossed size={30} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No food items yet
              </h2>

              <p className="mt-2 max-w-md text-gray-500">
                Start adding dishes to build your restaurant menu.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Food
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {foods.map((food) => (
                    <tr
                      key={food.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 overflow-hidden rounded-xl bg-orange-50">
                            {food.image_url ? (
                              <img
                                src={`${import.meta.env.VITE_API_URL}${food.image_url}`}
                                alt={food.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-orange-500">
                                <UtensilsCrossed size={22} />
                              </div>
                            )}
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {food.name}
                            </h3>

                            <p className="mt-1 max-w-xs truncate text-sm text-gray-500">
                              {food.description || 'No description'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-500">
                          {food.category || 'Uncategorized'}
                        </span>
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-900">
                        ₹{food.price}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            food.is_available
                              ? 'bg-green-50 text-green-600'
                              : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {food.is_available ? 'Available' : 'Unavailable'}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingFood(food);
                              setShowAddFood(true);
                            }}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-500"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(food.id)}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <AddFoodModal
        isOpen={showAddFood}
        onClose={() => {
          setShowAddFood(false);
          setEditingFood(null);
        }}
        onFoodAdded={fetchFoods}
        editingFood={editingFood}
      />
    </AdminLayout>
  );
};

export default FoodItems;
