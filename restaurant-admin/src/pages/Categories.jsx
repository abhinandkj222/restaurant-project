import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Tags } from 'lucide-react';
import toast from 'react-hot-toast';

import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';
import AddCategoryModal from '../components/category/AddCategoryModal';
import EditCategoryModal from '../components/category/EditCategoryModal';
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
const [showAddCategory, setShowAddCategory] = useState(false);
const [showEditCategory, setShowEditCategory] = useState(false);
const [selectedCategory, setSelectedCategory] = useState(null);
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');

      setCategories(response.data.categories);
    } catch (error) {
      console.error('failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    'are you sure you want to delete this category?',
  );

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`/categories/${id}`);

    toast.success('category deleted successfully');

    fetchCategories();
  } catch (error) {
    console.error('delete category error:', error);

    toast.error(
      error.response?.data?.message ||
        'failed to delete category',
    );
  }
};

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 md:p-10">
        {/* header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              Menu Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Categories
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your food categories.
            </p>
          </div>

        <button
  onClick={() => setShowAddCategory(true)}
  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
>
  <Plus size={20} />
  Add Category
</button>
        </div>

        {/* content */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-60 items-center justify-center">
              <p className="text-gray-500">
                Loading categories...
              </p>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <Tags size={30} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No categories yet
              </h2>

              <p className="mt-2 text-gray-500">
                Create your first food category.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between gap-4 px-6 py-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <Tags size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {category.name}
                      </h3>

                      <p className="text-sm text-gray-400">
                        Category #{category.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                   <button
  onClick={() => {
    setSelectedCategory(category);
    setShowEditCategory(true);
  }}
  className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-500"
>
  <Pencil size={18} />
</button>

                    <button
  onClick={() => handleDelete(category.id)}
  className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-500"
>
  <Trash2 size={18} />
</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AddCategoryModal
  isOpen={showAddCategory}
  onClose={() => setShowAddCategory(false)}
  onCategoryAdded={fetchCategories}
/>

<EditCategoryModal
  category={selectedCategory}
  isOpen={showEditCategory}
  onClose={() => {
    setShowEditCategory(false);
    setSelectedCategory(null);
  }}
  onCategoryUpdated={fetchCategories}
/>
    </AdminLayout>
  );
};

export default Categories;