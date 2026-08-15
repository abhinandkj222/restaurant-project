import { useEffect, useState } from 'react';
import Container from '../components/common/Container';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  LogOut,
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ChevronRight,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  XCircle,
  Star,
} from 'lucide-react';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingLoading, setRatingLoading] = useState(false);

  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        let myOrders = [];

        if (Array.isArray(data)) {
          myOrders = data;
        } else if (Array.isArray(data.orders)) {
          myOrders = data.orders;
        }

        /*
         * Get the food items for every order.
         *
         * /orders/my-orders gives basic order information.
         * /orders/:id gives the order items.
         */
        const ordersWithItems = await Promise.all(
          myOrders.map(async (order) => {
            try {
              const orderResponse = await api.get(`/orders/${order.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              return {
                ...order,
                items: orderResponse.data.order?.items || [],
              };
            } catch (error) {
              console.error(
                `failed to fetch items for order ${order.id}:`,
                error,
              );

              return {
                ...order,
                items: [],
              };
            }
          }),
        );

        setOrders(ordersWithItems);
      } catch (error) {
        console.error('failed to fetch orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/');
  };

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === 'pending' ||
      order.status === 'confirmed' ||
      order.status === 'preparing' ||
      order.status === 'out_for_delivery',
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === 'delivered',
  ).length;

  const getStatusStyle = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';

      case 'cancelled':
        return 'bg-red-100 text-red-700';

      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-700';

      case 'preparing':
        return 'bg-yellow-100 text-yellow-700';

      case 'confirmed':
        return 'bg-purple-100 text-purple-700';

      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  const formatStatus = (status) => {
    if (!status) {
      return 'pending';
    }

    return status.replaceAll('_', ' ');
  };

  const formatDate = (date) => {
    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // --------------------------------------------------
  // Open rating modal
  // --------------------------------------------------

  const openRatingModal = (orderId, food) => {
    setSelectedOrderId(orderId);
    setSelectedFood(food);
    setSelectedRating(0);
    setReview('');
  };

  // --------------------------------------------------
  // Close rating modal
  // --------------------------------------------------

  const closeRatingModal = () => {
    if (ratingLoading) {
      return;
    }

    setSelectedFood(null);
    setSelectedOrderId(null);
    setSelectedRating(0);
    setReview('');
  };

  // --------------------------------------------------
  // Submit rating
  // --------------------------------------------------

  const handleRating = async () => {
    if (!selectedFood || !selectedOrderId) {
      return;
    }

    if (!selectedRating) {
      alert('Please select a rating');
      return;
    }

    try {
      setRatingLoading(true);

      await api.post(
        '/ratings',
        {
          orderId: selectedOrderId,
          foodId: selectedFood.food_id,
          rating: selectedRating,
          review: review.trim() || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      /*
       * Mark this food as rated locally.
       *
       * This prevents the customer from seeing
       * the "Rate Food" button again during this page session.
       */
      setOrders((previousOrders) =>
        previousOrders.map((order) => {
          if (order.id !== selectedOrderId) {
            return order;
          }

          return {
            ...order,
            items: order.items.map((item) => {
              if (item.food_id !== selectedFood.food_id) {
                return item;
              }

              return {
                ...item,
                user_rating: selectedRating,
              };
            }),
          };
        }),
      );

      alert('Rating submitted successfully');

      closeRatingModal();
    } catch (error) {
      console.error('rating error:', error);

      alert(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setRatingLoading(false);
    }
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8f1] px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <Container>
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

              <p className="mt-4 text-sm text-gray-500 sm:text-base">
                Loading your dashboard...
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // --------------------------------------------------
  // Not logged in
  // --------------------------------------------------

  if (!token) {
    return (
      <div className="min-h-screen bg-[#fff8f1] px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <Container>
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 sm:h-20 sm:w-20">
                <User className="text-orange-500" size={32} strokeWidth={2} />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-gray-900 sm:mt-6 sm:text-3xl">
                Please Login
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                Sign in with Google to access your customer dashboard and view
                your orders.
              </p>

              <Link
                to="/"
                className="mx-auto mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 sm:w-fit sm:px-7"
              >
                Go to Home
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f1] px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pb-20">
      <Container>
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-7 flex flex-col gap-5 sm:mb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-orange-500 sm:text-sm sm:tracking-[4px]">
              My Account
            </p>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Customer Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              Manage your account and track your orders.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:w-fit"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* ==================================================
            PROFILE + STATS
        ================================================== */}

        <div className="grid gap-5 lg:grid-cols-[minmax(280px,1.2fr)_2fr] lg:gap-6">
          {/* Profile */}

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-600 sm:h-20 sm:w-20 sm:text-3xl">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400 sm:text-sm">
                  Welcome back
                </p>

                <h2 className="truncate text-xl font-bold text-gray-900 sm:text-2xl">
                  {user?.name || 'Customer'}
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-100 pt-5 sm:mt-7 sm:pt-6">
              {/* Email */}

              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 sm:h-10 sm:w-10">
                  <Mail size={17} className="text-orange-500" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Email</p>

                  <p className="truncate text-sm font-medium text-gray-700">
                    {user?.email || 'Not available'}
                  </p>
                </div>
              </div>

              {/* Phone */}

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 sm:h-10 sm:w-10">
                  <Phone size={17} className="text-orange-500" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Phone</p>

                  <p className="text-sm font-medium text-gray-700">
                    {user?.phone || 'Not added'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Total Orders */}

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 sm:h-12 sm:w-12">
                <ShoppingBag size={22} className="text-orange-500" />
              </div>

              <p className="mt-4 text-sm font-medium text-gray-400 sm:mt-5">
                Total Orders
              </p>

              <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {totalOrders}
              </p>
            </div>

            {/* Active Orders */}

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-50 sm:h-12 sm:w-12">
                <Clock3 size={22} className="text-yellow-600" />
              </div>

              <p className="mt-4 text-sm font-medium text-gray-400 sm:mt-5">
                Active Orders
              </p>

              <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {pendingOrders}
              </p>
            </div>

            {/* Delivered */}

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 sm:h-12 sm:w-12">
                <CheckCircle2 size={22} className="text-green-600" />
              </div>

              <p className="mt-4 text-sm font-medium text-gray-400 sm:mt-5">
                Delivered
              </p>

              <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {completedOrders}
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            ORDER HISTORY
        ================================================== */}

        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 sm:mt-8">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Order History
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View all your previous and current orders.
              </p>
            </div>

            <Link
              to="/menu"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 sm:w-fit"
            >
              Order Food
              <ChevronRight size={17} />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="px-5 py-14 text-center sm:px-10 sm:py-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 sm:h-20 sm:w-20">
                <Package className="text-orange-500" size={32} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900 sm:text-2xl">
                No Orders Yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                You haven't placed an order yet. Explore our menu and discover
                something delicious.
              </p>

              <Link
                to="/menu"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600 sm:w-fit"
              >
                Browse Menu
                <ChevronRight size={18} />
              </Link>
            </div>
          ) : (
            <>
              {/* ==================================================
                  DESKTOP TABLE
              ================================================== */}

              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                      <th className="px-7 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Order
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Date
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Delivery
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Payment
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                      <th className="px-7 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <>
                        <tr
                          key={order.id}
                          className="border-b border-gray-50 transition hover:bg-orange-50/30"
                        >
                          <td className="px-7 py-5">
                            <p className="font-bold text-gray-900">
                              #{order.id}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Savory Restaurant
                            </p>
                          </td>

                          <td className="whitespace-nowrap px-5 py-5">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarDays
                                size={16}
                                className="text-gray-400"
                              />

                              {formatDate(order.created_at)}
                            </div>
                          </td>

                          <td className="max-w-[250px] px-5 py-5">
                            <div className="flex items-start gap-2">
                              <MapPin
                                size={16}
                                className="mt-0.5 shrink-0 text-orange-500"
                              />

                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-gray-700">
                                  {order.delivery_city || 'Delivery'}
                                </p>

                                <p className="mt-1 truncate text-xs text-gray-400">
                                  {order.delivery_address ||
                                    'Address not available'}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-5 py-5">
                            <p className="text-sm font-medium capitalize text-gray-700">
                              {order.payment_method || 'not specified'}
                            </p>

                            <p className="mt-1 text-xs capitalize text-gray-400">
                              {order.payment_status || 'pending'}
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <span
                              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                                order.status,
                              )}`}
                            >
                              {order.status === 'delivered' && (
                                <CheckCircle2 size={13} />
                              )}

                              {order.status === 'cancelled' && (
                                <XCircle size={13} />
                              )}

                              {order.status !== 'delivered' &&
                                order.status !== 'cancelled' && (
                                  <Clock3 size={13} />
                                )}

                              {formatStatus(order.status)}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-7 py-5 text-right">
                            <p className="font-bold text-gray-900">
                              ₹{Number(order.total_amount || 0).toFixed(2)}
                            </p>
                          </td>
                        </tr>

                        {/* ==================================================
                            DESKTOP ORDER ITEMS + RATING
                        ================================================== */}

                        {order.status === 'delivered' &&
                          order.items?.length > 0 && (
                            <tr
                              key={`${order.id}-rating`}
                              className="border-b border-gray-100 bg-orange-50/30"
                            >
                              <td colSpan="6" className="px-7 py-5">
                                <div className="flex items-center justify-between gap-5">
                                  <div>
                                    <p className="text-sm font-bold text-gray-900">
                                      Rate your food
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                      Share your experience with the food you
                                      ordered.
                                    </p>
                                  </div>

                                  <div className="flex flex-wrap justify-end gap-3">
                                    {order.items.map((item) => (
                                      <div
                                        key={item.id}
                                        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5"
                                      >
                                        <div className="min-w-[140px]">
                                          <p className="truncate text-sm font-semibold text-gray-800">
                                            {item.name || 'Food item'}
                                          </p>

                                          <p className="mt-1 text-xs text-gray-400">
                                            Quantity: {item.quantity}
                                          </p>
                                        </div>

                                        {item.user_rating ? (
                                          <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-500">
                                            <Star
                                              size={15}
                                              fill="currentColor"
                                            />
                                            {item.user_rating}/5
                                          </div>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              openRatingModal(order.id, item)
                                            }
                                            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-600"
                                          >
                                            <Star size={14} />
                                            Rate Food
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ==================================================
                  MOBILE / TABLET
              ================================================== */}

              <div className="space-y-4 p-4 sm:p-5 lg:hidden">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">Order</p>

                        <p className="mt-1 text-lg font-bold text-gray-900">
                          #{order.id}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1.5 text-[11px] font-semibold capitalize sm:px-3 sm:text-xs ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">
                      <div>
                        <p className="text-xs text-gray-400">Date</p>

                        <p className="mt-1 text-sm font-medium text-gray-700">
                          {formatDate(order.created_at)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Amount</p>

                        <p className="mt-1 text-sm font-bold text-gray-900">
                          ₹{Number(order.total_amount || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-orange-50/70 p-4">
                      <div className="flex items-start gap-2.5">
                        <MapPin
                          size={17}
                          className="mt-0.5 shrink-0 text-orange-500"
                        />

                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                            Delivery
                          </p>

                          <p className="mt-1 break-words text-sm font-medium text-gray-700">
                            {order.delivery_address || 'Address not available'}
                          </p>

                          {(order.delivery_city || order.delivery_pincode) && (
                            <p className="mt-1 break-words text-xs text-gray-500">
                              {order.delivery_city}

                              {order.delivery_city && order.delivery_pincode
                                ? ', '
                                : ''}

                              {order.delivery_pincode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-400">Payment</p>

                        <p className="mt-1 text-sm font-medium capitalize text-gray-700">
                          {order.payment_method || 'not specified'}
                        </p>
                      </div>

                      <span className="text-xs capitalize text-gray-400">
                        {order.payment_status || 'pending'}
                      </span>
                    </div>

                    {/* ==================================================
                        ORDER ITEMS + RATING
                    ================================================== */}

                    {order.status === 'delivered' &&
                      order.items?.length > 0 && (
                        <div className="mt-5 border-t border-gray-100 pt-5">
                          <p className="mb-3 text-sm font-bold text-gray-900">
                            Rate your food
                          </p>

                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 p-3"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-gray-800">
                                    {item.name || 'Food item'}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-400">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>

                                {item.user_rating ? (
                                  <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-orange-500">
                                    <Star size={15} fill="currentColor" />
                                    {item.user_rating}/5
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openRatingModal(order.id, item)
                                    }
                                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
                                  >
                                    <Star size={14} />
                                    Rate
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>

      {/* ==================================================
          RATING MODAL
      ================================================== */}

      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
                <Star
                  size={28}
                  className="text-orange-500"
                  fill="currentColor"
                />
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                Rate {selectedFood.name || 'this food'}
              </h2>

              <p className="mt-1 text-sm text-gray-500">How was your food?</p>
            </div>

            {/* Stars */}

            <div className="mt-6 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSelectedRating(star)}
                  className="transition hover:scale-110"
                >
                  <Star
                    size={32}
                    className={
                      star <= selectedRating
                        ? 'text-orange-500'
                        : 'text-gray-300'
                    }
                    fill={star <= selectedRating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>

            {/* Review */}

            <textarea
              value={review}
              onChange={(event) => setReview(event.target.value)}
              placeholder="Write a review (optional)"
              rows={4}
              className="mt-6 w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            {/* Buttons */}

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={closeRatingModal}
                disabled={ratingLoading}
                className="flex-1 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRating}
                disabled={ratingLoading || !selectedRating}
                className="flex-1 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {ratingLoading ? 'Submitting...' : 'Submit Rating'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
