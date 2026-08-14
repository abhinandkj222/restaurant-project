import { useEffect, useState } from 'react';
import { ImagePlus, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

import api from '../../services/api';

const AddFoodModal = ({
  isOpen,
  onClose,
  onFoodAdded,
  editingFood,
}) => {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditing = Boolean(editingFood);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');

        setCategories(response.data.categories);
      } catch (error) {
        console.error('failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (editingFood) {
      setFormData({
        name: editingFood.name || '',
        description: editingFood.description || '',
        price: editingFood.price || '',
        categoryId: editingFood.category_id || '',
      });

      setPreview(
        editingFood.image_url
          ? `http://localhost:5000${editingFood.image_url}`
          : null,
      );

      setImage(null);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        categoryId: '',
      });

      setPreview(null);
      setImage(null);
    }

    setError('');
  }, [isOpen, editingFood]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      return;
    }

    setImage(selectedImage);

    const imagePreview = URL.createObjectURL(selectedImage);

    setPreview(imagePreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const data = new FormData();

      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('categoryId', formData.categoryId);

      if (image) {
        data.append('image', image);
      }

      if (isEditing) {
        await api.put(
          `/admin/foods/${editingFood.id}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      } else {
        await api.post('/admin/foods', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      onFoodAdded();

toast.success(
  isEditing
    ? 'Food updated successfully'
    : 'Food added successfully',
);

handleClose();
    } catch (error) {
      const message =
  error.response?.data?.message ||
  `Failed to ${isEditing ? 'update' : 'add'} food`;

setError(message);

toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      categoryId: '',
    });

    setImage(null);
    setPreview(null);
    setError('');

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              {isEditing ? 'Edit Food' : 'Add Food'}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {isEditing
                ? 'Update your food item.'
                : 'Add a new item to your restaurant menu.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          {/* image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Food Image
            </label>

            <label className="block cursor-pointer">
              {preview ? (
                <div className="relative overflow-hidden rounded-2xl border border-gray-200">
                  <img
                    src={preview}
                    alt="Food preview"
                    className="h-56 w-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-semibold text-gray-700">
                      <Upload size={18} />
                      Change Image
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 transition hover:border-orange-400 hover:bg-orange-50">
                  <ImagePlus
                    size={36}
                    className="text-orange-500"
                  />

                  <p className="mt-3 font-semibold text-gray-700">
                    Upload food image
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    JPG, PNG or WEBP · Max 5MB
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Food Name
            </label>

            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Chicken Biriyani"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* category + price */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Category
              </label>

              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
              >
                <option value="">Select category</option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
                  ₹
                </span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="180"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-9 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>
            </div>
          </div>

          {/* description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the food..."
              rows="4"
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? isEditing
                  ? 'Updating...'
                  : 'Adding...'
                : isEditing
                  ? 'Update Food'
                  : 'Add Food'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;