import { useEffect, useState } from 'react';
import {
  Clock,
  ChefHat,
  CheckCircle,
  XCircle,
  Truck,
  RefreshCw,
  ShoppingBag,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  X,
  Printer,
  Upload,
  FileText,
} from 'lucide-react';

import AdminLayout from '../components/layout/AdminLayout';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [updatingPayment, setUpdatingPayment] = useState(null);
  const [error, setError] = useState('');

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [uploadingBill, setUploadingBill] = useState(false);

  // --------------------------------------------------
  // Selected orders for printing
  // --------------------------------------------------

  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  // --------------------------------------------------
  // Fetch orders
  // --------------------------------------------------

  const fetchOrders = async () => {
    try {
      setError('');

      const response = await api.get('/admin/orders');

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('failed to fetch orders:', error);

      setError('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Select / unselect order
  // --------------------------------------------------

  const toggleOrderSelection = (orderId) => {
    setSelectedOrderIds((currentIds) => {
      if (currentIds.includes(orderId)) {
        return currentIds.filter((id) => id !== orderId);
      }

      return [...currentIds, orderId];
    });
  };

  // --------------------------------------------------
  // Select / unselect all orders
  // --------------------------------------------------

  const toggleSelectAll = () => {
    if (selectedOrderIds.length === orders.length) {
      setSelectedOrderIds([]);
      return;
    }

    setSelectedOrderIds(orders.map((order) => order.id));
  };

  // --------------------------------------------------
  // Print selected orders
  // --------------------------------------------------

  const printSelectedOrders = async () => {
    if (selectedOrderIds.length === 0) {
      setError('Please select at least one order to print.');
      return;
    }

    try {
      setError('');

      const ids = selectedOrderIds.join(',');

      const response = await api.get(`/admin/orders/print?ids=${ids}`, {
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], {
        type: 'application/pdf',
      });

      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, '_blank');

      setTimeout(() => {
        window.URL.revokeObjectURL(pdfUrl);
      }, 60000);
    } catch (error) {
      console.error('failed to print orders:', error);

      setError('Failed to generate orders PDF.');
    }
  };

  const uploadBill = async (orderId, file) => {
    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('PDF file must be smaller than 10 MB.');
      return;
    }

    try {
      setUploadingBill(true);
      setError('');

      const formData = new FormData();

      formData.append('bill', file);

      await api.post(`/admin/orders/${orderId}/bill`, formData);

      const response = await api.get(`/admin/orders/${orderId}`);

      setSelectedOrder(response.data.order);
      setSelectedOrderItems(response.data.order.items || []);

      await fetchOrders();
    } catch (error) {
      console.error('failed to upload bill:', error);

      setError(error.response?.data?.message || 'Failed to upload PDF bill.');
    } finally {
      setUploadingBill(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // --------------------------------------------------
  // Open order details
  // --------------------------------------------------

  const openOrder = async (order) => {
    try {
      setSelectedOrder(order);
      setSelectedOrderItems([]);
      setLoadingDetails(true);
      setError('');

      const response = await api.get(`/admin/orders/${order.id}`);

      setSelectedOrder(response.data.order);
      setSelectedOrderItems(response.data.order.items || []);
    } catch (error) {
      console.error('failed to fetch order details:', error);

      setError('Failed to load order details.');
    } finally {
      setLoadingDetails(false);
    }
  };

  // --------------------------------------------------
  // Update order status
  // --------------------------------------------------

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId);
      setError('');

      await api.put(`/admin/orders/${orderId}/status`, {
        status,
      });

      await fetchOrders();

      const response = await api.get(`/admin/orders/${orderId}`);

      setSelectedOrder(response.data.order);
      setSelectedOrderItems(response.data.order.items || []);
    } catch (error) {
      console.error('failed to update order:', error);

      setError(
        error.response?.data?.message || 'Failed to update order status.',
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  // --------------------------------------------------
  // Update payment status
  // --------------------------------------------------

  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      setUpdatingPayment(orderId);
      setError('');

      await api.patch(`/admin/orders/${orderId}/payment-status`, {
        paymentStatus,
      });

      await fetchOrders();

      const response = await api.get(`/admin/orders/${orderId}`);

      setSelectedOrder(response.data.order);
      setSelectedOrderItems(response.data.order.items || []);
    } catch (error) {
      console.error('failed to update payment status:', error);

      setError(
        error.response?.data?.message || 'Failed to update payment status.',
      );
    } finally {
      setUpdatingPayment(null);
    }
  };

  // --------------------------------------------------
  // Status style
  // --------------------------------------------------

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';

      case 'preparing':
        return 'bg-blue-50 text-blue-600 border-blue-200';

      case 'out_for_delivery':
        return 'bg-purple-50 text-purple-600 border-purple-200';

      case 'delivered':
        return 'bg-green-50 text-green-600 border-green-200';

      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-200';

      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // --------------------------------------------------
  // Format status
  // --------------------------------------------------

  const formatStatus = (status) => {
    if (!status) {
      return '-';
    }

    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // --------------------------------------------------
  // Payment style
  // --------------------------------------------------

  const getPaymentStyle = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-600 border-green-200';

      case 'failed':
        return 'bg-red-50 text-red-600 border-red-200';

      default:
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    }
  };

  // --------------------------------------------------
  // Payment method
  // --------------------------------------------------

  const formatPaymentMethod = (method) => {
    if (method === 'online') {
      return 'Online';
    }

    if (method === 'cash') {
      return 'Cash';
    }

    return '-';
  };

  // --------------------------------------------------
  // Date format
  // --------------------------------------------------

  const formatDateTime = (dateTime) => {
    if (!dateTime) {
      return '-';
    }

    const date = new Date(dateTime);

    if (Number.isNaN(date.getTime())) {
      return '-';
    }

    return date.toLocaleString([], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // --------------------------------------------------
  // Close modal
  // --------------------------------------------------

  const closeModal = () => {
    setSelectedOrder(null);
    setSelectedOrderItems([]);
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <RefreshCw
            size={30}
            className="mx-auto animate-spin text-orange-500"
          />

          <p className="mt-3 text-gray-500">Loading orders...</p>
        </div>
      </div>
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

              <h1 className="mt-1 text-3xl font-bold text-gray-900">Orders</h1>

              <p className="mt-2 text-gray-500">
                Manage customer orders, payments and deliveries.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={printSelectedOrders}
                disabled={selectedOrderIds.length === 0}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold shadow-sm transition ${
                  selectedOrderIds.length > 0
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'cursor-not-allowed bg-gray-200 text-gray-400'
                }`}
              >
                <Printer size={18} />

                {selectedOrderIds.length > 0
                  ? `Print Selected Orders (${selectedOrderIds.length})`
                  : 'Print Selected Orders'}
              </button>

              <button
                type="button"
                onClick={fetchOrders}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm transition hover:border-orange-300 hover:text-orange-500"
              >
                <RefreshCw size={18} />
                Refresh
              </button>
            </div>
          </div>

          {/* Error */}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* No orders */}

          {orders.length === 0 ? (
            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <ShoppingBag size={30} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No orders yet
              </h2>

              <p className="mt-2 text-gray-500">
                Customer orders will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {/* Select */}

                      <th className="w-16 px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={
                            orders.length > 0 &&
                            selectedOrderIds.length === orders.length
                          }
                          onChange={toggleSelectAll}
                          className="h-4 w-4 cursor-pointer accent-orange-500"
                        />
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Order
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Delivery
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Payment
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Bill
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        onClick={() => openOrder(order)}
                        className="cursor-pointer border-b border-gray-100 transition hover:bg-orange-50/40"
                      >
                        {/* Select */}

                        <td
                          className="px-6 py-5 text-center"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedOrderIds.includes(order.id)}
                            onChange={() => toggleOrderSelection(order.id)}
                            className="h-4 w-4 cursor-pointer accent-orange-500"
                          />
                        </td>

                        {/* Order */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                              <ShoppingBag size={18} />
                            </div>

                            <div>
                              <p className="font-bold text-gray-900">
                                #{order.id}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                {formatDateTime(order.created_at)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Customer */}

                        <td className="px-6 py-5">
                          <p className="font-semibold text-gray-900">
                            {order.customer_name}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {order.customer_phone}
                          </p>
                        </td>

                        {/* Delivery */}

                        <td className="px-6 py-5">
                          <div className="flex items-start gap-2">
                            <MapPin
                              size={17}
                              className="mt-0.5 shrink-0 text-orange-500"
                            />

                            <div>
                              <p className="max-w-[220px] truncate font-semibold text-gray-900">
                                {order.delivery_address}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                {order.delivery_city} - {order.delivery_pincode}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Payment */}

                        <td className="px-6 py-5">
                          <p className="font-medium text-gray-900">
                            {formatPaymentMethod(order.payment_method)}
                          </p>

                          <span
                            className={`mt-1 inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${getPaymentStyle(
                              order.payment_status,
                            )}`}
                          >
                            {formatStatus(order.payment_status)}
                          </span>
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              order.status,
                            )}`}
                          >
                            {formatStatus(order.status)}
                          </span>
                        </td>
                        {/* Bill */}

                        {/* Bill */}

                        <td
                          className="px-6 py-5"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {order.payment_status === 'paid' ? (
                            <label
                              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                                uploadingBill
                                  ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                  : order.has_bill
                                    ? 'cursor-pointer bg-green-50 text-green-600 hover:bg-green-100'
                                    : 'cursor-pointer bg-orange-50 text-orange-500 hover:bg-orange-100'
                              }`}
                            >
                              {order.has_bill ? (
                                <>
                                  <FileText size={16} />
                                  Uploaded
                                </>
                              ) : (
                                <>
                                  <Upload size={16} />
                                  Upload PDF
                                </>
                              )}

                              <input
                                type="file"
                                accept="application/pdf,.pdf"
                                className="hidden"
                                disabled={uploadingBill}
                                onChange={(event) => {
                                  const file = event.target.files?.[0];

                                  if (file) {
                                    uploadBill(order.id, file);
                                  }

                                  event.target.value = '';
                                }}
                              />
                            </label>
                          ) : (
                            <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-400">
                              <Upload size={16} />
                              Payment Pending
                            </span>
                          )}
                        </td>

                        {/* Total */}

                        <td className="px-6 py-5 text-right">
                          <p className="font-bold text-orange-500">
                            ₹{Number(order.total_amount).toFixed(2)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 bg-black/50 p-4 backdrop-blur-sm sm:p-6 lg:p-8"
          onClick={closeModal}
        >
          <div
            className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <ShoppingBag size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Order #{selectedOrder.id}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {formatDateTime(selectedOrder.created_at)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {/* Status + Total */}

              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Order Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyle(
                      selectedOrder.status,
                    )}`}
                  >
                    {formatStatus(selectedOrder.status)}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Order Total
                  </p>

                  <p className="mt-1 text-2xl font-bold text-orange-500">
                    ₹{Number(selectedOrder.total_amount).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Customer + Delivery */}

              <div className="grid gap-5 lg:grid-cols-2">
                {/* Customer */}

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Customer
                  </p>

                  <p className="mt-3 text-lg font-bold text-gray-900">
                    {selectedOrder.customer_name}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <Phone size={16} />
                    {selectedOrder.customer_phone}
                  </div>

                  {selectedOrder.customer_email && (
                    <div className="mt-2 flex items-start gap-2 text-sm text-gray-500">
                      <Mail size={16} className="mt-0.5 shrink-0" />

                      <span className="break-all">
                        {selectedOrder.customer_email}
                      </span>
                    </div>
                  )}
                </div>

                {/* Delivery */}

                <div className="rounded-2xl bg-orange-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                    Delivery Address
                  </p>

                  <div className="mt-3 flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <p className="font-bold text-gray-900">
                        {selectedOrder.delivery_address}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {selectedOrder.delivery_city}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        PIN: {selectedOrder.delivery_pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}

              <div className="mt-5 rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <ShoppingBag size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Order Items
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {selectedOrderItems.length} item
                      {selectedOrderItems.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {loadingDetails ? (
                  <div className="flex items-center justify-center py-10">
                    <RefreshCw
                      size={24}
                      className="animate-spin text-orange-500"
                    />

                    <span className="ml-3 text-sm text-gray-500">
                      Loading items...
                    </span>
                  </div>
                ) : selectedOrderItems.length === 0 ? (
                  <p className="mt-6 text-center text-sm text-gray-400">
                    No items found.
                  </p>
                ) : (
                  <div className="mt-5 divide-y divide-gray-100">
                    {selectedOrderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.name || `Food #${item.food_id}`}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            ₹{Number(item.price).toFixed(2)} × {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold text-gray-900">
                          ₹
                          {(Number(item.price) * Number(item.quantity)).toFixed(
                            2,
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bill */}

              <div className="mt-5 rounded-2xl border border-gray-100 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <FileText size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Product Bill
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {selectedOrder.bill_pdf_name || 'No bill uploaded'}
                      </p>

                      {selectedOrder.bill_uploaded_at && (
                        <p className="mt-1 text-xs text-gray-400">
                          Uploaded{' '}
                          {formatDateTime(selectedOrder.bill_uploaded_at)}
                        </p>
                      )}
                    </div>
                  </div>

                  <label
                    className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                      uploadingBill
                        ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {uploadingBill ? (
                      <>
                        <RefreshCw size={17} className="animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={17} />
                        {selectedOrder.bill_pdf_name
                          ? 'Replace PDF'
                          : 'Upload PDF'}
                      </>
                    )}

                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      disabled={uploadingBill}
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (file) {
                          uploadBill(selectedOrder.id, file);
                        }

                        event.target.value = '';
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Payment */}

              <div className="mt-5 rounded-2xl border border-gray-100 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50">
                      <CreditCard size={19} className="text-gray-500" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Payment Method
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {formatPaymentMethod(selectedOrder.payment_method)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Payment Status */}

                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getPaymentStyle(
                        selectedOrder.payment_status,
                      )}`}
                    >
                      {formatStatus(selectedOrder.payment_status)}
                    </span>

                    {/* Mark Cash Payment as Paid */}

                    {selectedOrder.payment_method === 'cash' &&
                      selectedOrder.payment_status === 'pending' && (
                        <button
                          type="button"
                          disabled={updatingPayment === selectedOrder.id}
                          onClick={() =>
                            updatePaymentStatus(selectedOrder.id, 'paid')
                          }
                          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                            updatingPayment === selectedOrder.id
                              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {updatingPayment === selectedOrder.id ? (
                            <>
                              <RefreshCw size={16} className="animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <CheckCircle size={16} />
                              Mark as Paid
                            </>
                          )}
                        </button>
                      )}

                    {/* Cash payment already received */}

                    {selectedOrder.payment_method === 'cash' &&
                      selectedOrder.payment_status === 'paid' && (
                        <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-600">
                          <CheckCircle size={16} />
                          Payment Received
                        </span>
                      )}
                  </div>
                </div>
              </div>
              {/* Order Total */}

              <div className="mt-5 rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">
                    Order Total
                  </span>

                  <p className="text-2xl font-bold text-orange-500">
                    ₹{Number(selectedOrder.total_amount).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Status Actions */}

              <div className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Update Order
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {/* Pending */}

                  <button
                    type="button"
                    disabled={updatingOrder === selectedOrder.id}
                    onClick={() => updateStatus(selectedOrder.id, 'pending')}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
                      selectedOrder.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-50 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
                    }`}
                  >
                    <Clock size={17} />
                    Pending
                  </button>

                  {/* Preparing */}

                  <button
                    type="button"
                    disabled={updatingOrder === selectedOrder.id}
                    onClick={() => updateStatus(selectedOrder.id, 'preparing')}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
                      selectedOrder.status === 'preparing'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <ChefHat size={17} />
                    Preparing
                  </button>

                  {/* Out for Delivery */}

                  <button
                    type="button"
                    disabled={updatingOrder === selectedOrder.id}
                    onClick={() =>
                      updateStatus(selectedOrder.id, 'out_for_delivery')
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
                      selectedOrder.status === 'out_for_delivery'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-50 text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    <Truck size={17} />
                    Out for Delivery
                  </button>

                  {/* Delivered */}

                  <button
                    type="button"
                    disabled={updatingOrder === selectedOrder.id}
                    onClick={() => updateStatus(selectedOrder.id, 'delivered')}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
                      selectedOrder.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    <CheckCircle size={17} />
                    Delivered
                  </button>

                  {/* Cancel */}

                  <button
                    type="button"
                    disabled={updatingOrder === selectedOrder.id}
                    onClick={() => updateStatus(selectedOrder.id, 'cancelled')}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
                      selectedOrder.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <XCircle size={17} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}

            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 sm:px-8">
              <button
                type="button"
                onClick={closeModal}
                className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-100"
              >
                Close Order Details
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Orders;
