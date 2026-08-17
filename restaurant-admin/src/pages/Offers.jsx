import { useEffect, useState } from 'react';
import {
  Megaphone,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  CheckCircle,
} from 'lucide-react';

import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    couponCode: '',
    buttonText: 'Order Now',
    isActive: true,
    image: null,
  });

  // --------------------------------------------------
  // Fetch offers
  // --------------------------------------------------

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get('/offers');

      setOffers(response.data.offers || []);
    } catch (error) {
      console.error('failed to fetch offers:', error);

      setError('Failed to load offers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // --------------------------------------------------
  // Form change
  // --------------------------------------------------

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));

    setError('');
  };

  // --------------------------------------------------
  // Open create modal
  // --------------------------------------------------

  const openCreateModal = () => {
    setEditingOffer(null);

    setFormData({
      title: '',
      description: '',
      discount: '',
      couponCode: '',
      buttonText: 'Order Now',
      isActive: true,
      image: null,
    });

    setError('');
    setShowModal(true);
  };

  // --------------------------------------------------
  // Open edit modal
  // --------------------------------------------------

  const openEditModal = (offer) => {
    setEditingOffer(offer);

    setFormData({
      title: offer.title || '',
      description: offer.description || '',
      discount: offer.discount || '',
      couponCode: offer.coupon_code || '',
      buttonText: offer.button_text || 'Order Now',
      isActive: offer.is_active,
      image: null,
    });

    setError('');
    setShowModal(true);
  };

  // --------------------------------------------------
  // Close modal
  // --------------------------------------------------

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingOffer(null);
  };

  // --------------------------------------------------
  // Save offer
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!formData.title.trim()) {
      setError('Please enter an offer title.');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please enter an offer description.');
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('discount', formData.discount || 0);
      data.append('couponCode', formData.couponCode);
      data.append('buttonText', formData.buttonText);
      data.append('isActive', formData.isActive);

      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingOffer) {
        await api.put(`/offers/${editingOffer.id}`, data);
      } else {
        await api.post('/offers', data);
      }

      setShowModal(false);
      setEditingOffer(null);

      await fetchOffers();
    } catch (error) {
      console.error('save offer error:', error);

      setError(error.response?.data?.message || 'Failed to save offer.');
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // Delete
  // --------------------------------------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this offer?',
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(id);

      await api.delete(`/offers/${id}`);

      await fetchOffers();
    } catch (error) {
      console.error('delete offer error:', error);

      setError('Failed to delete offer.');
    } finally {
      setDeleting(null);
    }
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2
              size={30}
              className="mx-auto animate-spin text-orange-500"
            />

            <p className="mt-3 text-gray-500">Loading offers...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                Restaurant
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">Offers</h1>

              <p className="mt-2 text-gray-500">
                Manage the special offer displayed on your landing page.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Plus size={19} />
              Add Offer
            </button>
          </div>

          {/* Error */}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* No offers */}

          {offers.length === 0 ? (
            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <Megaphone size={30} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No offers yet
              </h2>

              <p className="mt-2 text-gray-500">
                Create an offer to display it on your landing page.
              </p>

              <button
                type="button"
                onClick={openCreateModal}
                className="mt-6 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
              >
                Create Your First Offer
              </button>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                >
                  {/* Image */}

                  <div className="relative flex h-56 items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600">
                    {offer.image_url ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${offer.image_url}`}
                        alt={offer.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-8xl">🍕</span>
                    )}

                    {offer.is_active && (
                      <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white">
                        <CheckCircle size={14} />
                        Active
                      </span>
                    )}
                  </div>

                  {/* Content */}

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {offer.title}
                        </h2>

                        <p className="mt-2 text-gray-500">
                          {offer.description}
                        </p>
                      </div>

                      {Number(offer.discount) > 0 && (
                        <span className="shrink-0 rounded-xl bg-orange-50 px-3 py-2 font-bold text-orange-500">
                          {Number(offer.discount)}% OFF
                        </span>
                      )}
                    </div>

                    {offer.coupon_code && (
                      <div className="mt-5 rounded-xl bg-gray-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Coupon Code
                        </p>

                        <p className="mt-1 font-bold text-gray-900">
                          {offer.coupon_code}
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex gap-3">
                      <button
                        type="button"
                        onClick={() => openEditModal(offer)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                      >
                        <Pencil size={17} />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deleting === offer.id}
                        onClick={() => handleDelete(offer.id)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        {deleting === offer.id ? (
                          <Loader2 size={17} className="animate-spin" />
                        ) : (
                          <Trash2 size={17} />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 p-4 backdrop-blur-sm sm:p-6"
          onClick={closeModal}
        >
          <div
            className="mx-auto max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {editingOffer ? 'Edit Offer' : 'Create Offer'}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  This content will appear on the landing page.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              {/* Title */}

              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Offer Title
                </label>

                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Get 30% OFF"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white"
                />
              </div>

              {/* Description */}

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="On your first online order..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-orange-500 focus:bg-white"
                />
              </div>

              {/* Discount + Coupon */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="discount"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Discount (%)
                  </label>

                  <input
                    id="discount"
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="30"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="couponCode"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Coupon Code
                  </label>

                  <input
                    id="couponCode"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleChange}
                    placeholder="WELCOME30"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 uppercase outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Button Text */}

              <div>
                <label
                  htmlFor="buttonText"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Button Text
                </label>

                <input
                  id="buttonText"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  placeholder="Order Now"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              {/* Image */}

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Offer Image
                </label>

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Upload an image for the right side of the landing-page offer.
                </p>
              </div>

              {/* Active */}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-50 p-4">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />

                <div>
                  <p className="font-semibold text-gray-900">Active Offer</p>

                  <p className="text-sm text-gray-500">
                    Show this offer on the landing page.
                  </p>
                </div>
              </label>

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Buttons */}

              <div className="flex gap-3 border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:bg-gray-400"
                >
                  {saving && <Loader2 size={18} className="animate-spin" />}

                  {saving
                    ? 'Saving...'
                    : editingOffer
                      ? 'Update Offer'
                      : 'Create Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Offers;
