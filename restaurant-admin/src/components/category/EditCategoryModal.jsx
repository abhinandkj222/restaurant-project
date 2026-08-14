import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

import api from '../../services/api';

const EditCategoryModal = ({
  category,
  isOpen,
  onClose,
  onCategoryUpdated,
}) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  if (!isOpen || !category) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('category name is required');
      return;
    }

    try {
      setLoading(true);

      await api.put(`/categories/${category.id}`, {
        name: name.trim(),
      });

      toast.success('category updated successfully');

      onCategoryUpdated();
      onClose();
    } catch (error) {
      console.error('update category error:', error);

      toast.error(
        error.response?.data?.message ||
          'failed to update category',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Edit Category
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the category name.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <label
            htmlFor="editCategoryName"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Category Name
          </label>

          <input
            id="editCategoryName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;