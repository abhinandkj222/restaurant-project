// // import { useEffect, useState } from 'react';
// // import Container from '../components/common/Container';
// // import { Link, useLocation, useNavigate } from 'react-router-dom';
// // import {
// //   Package,
// //   LogOut,
// //   User,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   CalendarDays,
// //   ChevronRight,
// //   ShoppingBag,
// //   Clock3,
// //   CheckCircle2,
// //   XCircle,
// //   Star,
// //   CreditCard,
// //   Utensils,
// //   Download,
// //   ArrowRight,
// //   Receipt,
// // } from 'lucide-react';
// // import api from '../services/api';

// // const Orders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [ratingLoading, setRatingLoading] = useState(false);

// //   const [selectedFood, setSelectedFood] = useState(null);
// //   const [selectedOrderId, setSelectedOrderId] = useState(null);
// //   const [selectedRating, setSelectedRating] = useState(0);
// //   const [review, setReview] = useState('');

// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const token = localStorage.getItem('token');
// //   const storedUser = localStorage.getItem('user');
// //   const user = storedUser ? JSON.parse(storedUser) : null;

// //   // =========================================================
// //   // FETCH ORDERS
// //   // =========================================================

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       if (!token) {
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         setLoading(true);

// //         const response = await api.get('/orders/my-orders', {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         const data = response.data;

// //         let myOrders = [];

// //         if (Array.isArray(data)) {
// //           myOrders = data;
// //         } else if (Array.isArray(data.orders)) {
// //           myOrders = data.orders;
// //         }

// //         const ordersWithItems = await Promise.all(
// //           myOrders.map(async (order) => {
// //             try {
// //               const orderResponse = await api.get(`/orders/${order.id}`, {
// //                 headers: {
// //                   Authorization: `Bearer ${token}`,
// //                 },
// //               });

// //               return {
// //                 ...order,
// //                 items: orderResponse.data.order?.items || [],
// //               };
// //             } catch (error) {
// //               console.error(
// //                 `failed to fetch items for order ${order.id}:`,
// //                 error,
// //               );

// //               return {
// //                 ...order,
// //                 items: [],
// //               };
// //             }
// //           }),
// //         );

// //         setOrders(ordersWithItems);
// //       } catch (error) {
// //         console.error('failed to fetch orders:', error);
// //         setOrders([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchOrders();
// //   }, [token, location.key]);

// //   // =========================================================
// //   // LOGOUT
// //   // =========================================================

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');

// //     navigate('/');
// //   };

// //   // =========================================================
// //   // DOWNLOAD BILL
// //   // =========================================================

// //   const handleDownloadBill = async (order) => {
// //     try {
// //       if (!order.has_bill) {
// //         alert('Bill is not available for this order.');
// //         return;
// //       }

// //       const response = await api.get(`/orders/${order.id}/bill`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //         responseType: 'blob',
// //       });

// //       const blob = new Blob([response.data], {
// //         type: 'application/pdf',
// //       });

// //       const url = window.URL.createObjectURL(blob);

// //       const link = document.createElement('a');

// //       link.href = url;
// //       link.download = order.bill_pdf_name || `order-${order.id}-bill.pdf`;

// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();

// //       window.URL.revokeObjectURL(url);
// //     } catch (error) {
// //       console.error('download bill error:', error);

// //       alert('Bill is not available for this order.');
// //     }
// //   };

// //   // =========================================================
// //   // STATS
// //   // =========================================================

// //   const totalOrders = orders.length;

// //   const pendingOrders = orders.filter(
// //     (order) =>
// //       order.status === 'pending' ||
// //       order.status === 'confirmed' ||
// //       order.status === 'preparing' ||
// //       order.status === 'out_for_delivery',
// //   ).length;

// //   const completedOrders = orders.filter(
// //     (order) => order.status === 'delivered',
// //   ).length;

// //   // =========================================================
// //   // STATUS
// //   // =========================================================

// //   const getStatusStyle = (status) => {
// //     switch (status) {
// //       case 'delivered':
// //         return 'bg-emerald-50 text-emerald-700 border-emerald-100';

// //       case 'cancelled':
// //         return 'bg-red-50 text-red-700 border-red-100';

// //       case 'out_for_delivery':
// //         return 'bg-blue-50 text-blue-700 border-blue-100';

// //       case 'preparing':
// //         return 'bg-amber-50 text-amber-700 border-amber-100';

// //       case 'confirmed':
// //         return 'bg-purple-50 text-purple-700 border-purple-100';

// //       default:
// //         return 'bg-orange-50 text-orange-700 border-orange-100';
// //     }
// //   };

// //   const getStatusIcon = (status) => {
// //     if (status === 'delivered') {
// //       return <CheckCircle2 size={14} />;
// //     }

// //     if (status === 'cancelled') {
// //       return <XCircle size={14} />;
// //     }

// //     return <Clock3 size={14} />;
// //   };

// //   const formatStatus = (status) => {
// //     if (!status) {
// //       return 'pending';
// //     }

// //     return status.replaceAll('_', ' ');
// //   };

// //   // =========================================================
// //   // DATE
// //   // =========================================================

// //   const formatDate = (date) => {
// //     if (!date) {
// //       return '-';
// //     }

// //     return new Date(date).toLocaleDateString('en-IN', {
// //       day: '2-digit',
// //       month: 'short',
// //       year: 'numeric',
// //     });
// //   };

// //   // =========================================================
// //   // RATING
// //   // =========================================================

// //   const openRatingModal = (orderId, food) => {
// //     setSelectedOrderId(orderId);
// //     setSelectedFood(food);
// //     setSelectedRating(0);
// //     setReview('');
// //   };

// //   const closeRatingModal = () => {
// //     if (ratingLoading) {
// //       return;
// //     }

// //     setSelectedFood(null);
// //     setSelectedOrderId(null);
// //     setSelectedRating(0);
// //     setReview('');
// //   };

// //   const handleRating = async () => {
// //     if (!selectedFood || !selectedOrderId) {
// //       return;
// //     }

// //     if (!selectedRating) {
// //       alert('Please select a rating');
// //       return;
// //     }

// //     try {
// //       setRatingLoading(true);

// //       await api.post(
// //         '/ratings',
// //         {
// //           orderId: selectedOrderId,
// //           foodId: selectedFood.food_id,
// //           rating: selectedRating,
// //           review: review.trim() || null,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       setOrders((previousOrders) =>
// //         previousOrders.map((order) => {
// //           if (order.id !== selectedOrderId) {
// //             return order;
// //           }

// //           return {
// //             ...order,
// //             items: order.items.map((item) => {
// //               if (item.food_id !== selectedFood.food_id) {
// //                 return item;
// //               }

// //               return {
// //                 ...item,
// //                 user_rating: selectedRating,
// //               };
// //             }),
// //           };
// //         }),
// //       );

// //       alert('Rating submitted successfully');

// //       closeRatingModal();
// //     } catch (error) {
// //       console.error('rating error:', error);

// //       alert(error.response?.data?.message || 'Failed to submit rating');
// //     } finally {
// //       setRatingLoading(false);
// //     }
// //   };

// //   // =========================================================
// //   // ORDER ITEMS
// //   // =========================================================

// //   const renderOrderItems = (items = []) => {
// //     if (!items.length) {
// //       return <p className="text-sm text-gray-400">Items unavailable</p>;
// //     }

// //     return (
// //       <div className="space-y-2">
// //         {items.slice(0, 3).map((item) => (
// //           <div key={item.id} className="flex min-w-0 items-center gap-3">
// //             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50">
// //               <Utensils size={15} className="text-orange-500" />
// //             </div>

// //             <div className="min-w-0 flex-1">
// //               <p className="truncate text-sm font-semibold text-gray-800">
// //                 {item.name || 'Food item'}
// //               </p>

// //               <p className="mt-0.5 text-xs text-gray-400">
// //                 Quantity: {item.quantity || 1}
// //               </p>
// //             </div>
// //           </div>
// //         ))}

// //         {items.length > 3 && (
// //           <p className="pl-12 text-xs font-semibold text-orange-500">
// //             +{items.length - 3} more item
// //             {items.length - 3 > 1 ? 's' : ''}
// //           </p>
// //         )}
// //       </div>
// //     );
// //   };

// //   // =========================================================
// //   // BILL BUTTON
// //   // =========================================================

// //   const BillButton = ({ order }) => {
// //     if (order.has_bill || order.bill_pdf) {
// //       return (
// //         <button
// //           type="button"
// //           onClick={() => handleDownloadBill(order)}
// //           className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100 transition hover:bg-emerald-100 active:scale-[0.98] sm:w-auto"
// //         >
// //           <Download size={16} />
// //           Download Bill
// //         </button>
// //       );
// //     }

// //     return (
// //       <div className="flex min-h-11 items-center rounded-xl bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-400">
// //         Bill not available
// //       </div>
// //     );
// //   };

// //   // =========================================================
// //   // RATING ITEMS
// //   // =========================================================

// //   const RatingItems = ({ order }) => {
// //     if (order.status !== 'delivered' || !order.items?.length) {
// //       return null;
// //     }

// //     return (
// //       <div className="border-t border-gray-100 bg-orange-50/40 p-4 sm:p-5 lg:p-6">
// //         <div className="mb-4">
// //           <div className="flex items-center gap-2">
// //             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
// //               <Star size={15} className="text-orange-500" fill="currentColor" />
// //             </div>

// //             <h3 className="text-sm font-bold text-gray-900 sm:text-base">
// //               Rate your food
// //             </h3>
// //           </div>

// //           <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm">
// //             Share your experience with the food you ordered.
// //           </p>
// //         </div>

// //         <div className="grid gap-3 sm:grid-cols-2">
// //           {order.items.map((item) => (
// //             <div
// //               key={item.id}
// //               className="flex min-w-0 items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
// //             >
// //               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
// //                 <Utensils size={16} className="text-orange-500" />
// //               </div>

// //               <div className="min-w-0 flex-1">
// //                 <p className="truncate text-sm font-semibold text-gray-800">
// //                   {item.name || 'Food item'}
// //                 </p>

// //                 <p className="mt-1 text-xs text-gray-400">
// //                   Quantity: {item.quantity}
// //                 </p>
// //               </div>

// //               {item.user_rating ? (
// //                 <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1.5 text-xs font-bold text-orange-500">
// //                   <Star size={14} fill="currentColor" />
// //                   {item.user_rating}/5
// //                 </div>
// //               ) : (
// //                 <button
// //                   type="button"
// //                   onClick={() => openRatingModal(order.id, item)}
// //                   className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-xl bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 active:scale-[0.97]"
// //                 >
// //                   <Star size={14} />
// //                   <span className="hidden xs:inline">Rate</span>
// //                   <span className="xs:hidden">Rate</span>
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   };

// //   // =========================================================
// //   // ORDER CARD
// //   // =========================================================

// //   const OrderCard = ({ order }) => {
// //     return (
// //       <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_8px_35px_rgba(0,0,0,0.04)] transition hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
// //         {/* ================================================= */}
// //         {/* CARD HEADER */}
// //         {/* ================================================= */}

// //         <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:p-6">
// //           <div className="flex min-w-0 items-center gap-3">
// //             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
// //               <Package size={19} className="text-orange-500" />
// //             </div>

// //             <div className="min-w-0">
// //               <div className="flex flex-wrap items-center gap-2">
// //                 <p className="text-base font-extrabold text-gray-900 sm:text-lg">
// //                   Order #{order.id}
// //                 </p>

// //                 <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

// //                 <p className="hidden text-xs font-medium text-gray-400 sm:block">
// //                   Savory Restaurant
// //                 </p>
// //               </div>

// //               <p className="mt-1 text-xs text-gray-400 sm:hidden">
// //                 Savory Restaurant
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex items-center justify-between gap-3 lg:justify-end">
// //             <div className="flex items-center gap-2 text-xs text-gray-500">
// //               <CalendarDays size={15} className="text-gray-400" />

// //               {formatDate(order.created_at)}
// //             </div>

// //             <span
// //               className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(
// //                 order.status,
// //               )}`}
// //             >
// //               {getStatusIcon(order.status)}
// //               {formatStatus(order.status)}
// //             </span>
// //           </div>
// //         </div>

// //         {/* ================================================= */}
// //         {/* MAIN ORDER CONTENT */}
// //         {/* ================================================= */}

// //         <div className="p-4 sm:p-5 lg:p-6">
// //           <div className="grid gap-5 lg:grid-cols-[1.25fr_0.85fr]">
// //             {/* LEFT */}
// //             <div className="min-w-0">
// //               <div className="mb-3 flex items-center gap-2">
// //                 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
// //                   <Utensils size={15} className="text-orange-500" />
// //                 </div>

// //                 <h3 className="text-sm font-bold text-gray-900">
// //                   Ordered Items
// //                 </h3>
// //               </div>

// //               <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-3 sm:p-4">
// //                 {renderOrderItems(order.items)}
// //               </div>
// //             </div>

// //             {/* RIGHT */}
// //             <div className="grid grid-cols-2 gap-3">
// //               <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-3 sm:p-4">
// //                 <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
// //                   Payment
// //                 </p>

// //                 <div className="mt-2 flex items-center gap-2">
// //                   <CreditCard size={15} className="shrink-0 text-gray-400" />

// //                   <p className="truncate text-sm font-semibold capitalize text-gray-700">
// //                     {order.payment_method || 'not specified'}
// //                   </p>
// //                 </div>

// //                 <p className="mt-1 truncate text-xs capitalize text-gray-400">
// //                   {order.payment_status || 'pending'}
// //                 </p>
// //               </div>

// //               <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-3 sm:p-4">
// //                 <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-500">
// //                   Order Total
// //                 </p>

// //                 <p className="mt-2 text-lg font-extrabold text-gray-900 sm:text-xl">
// //                   ₹{Number(order.total_amount || 0).toFixed(2)}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* ================================================= */}
// //           {/* DELIVERY */}
// //           {/* ================================================= */}

// //           <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/60 p-4 sm:p-5">
// //             <div className="flex items-start gap-3">
// //               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
// //                 <MapPin size={17} className="text-orange-500" />
// //               </div>

// //               <div className="min-w-0 flex-1">
// //                 <p className="text-[11px] font-bold uppercase tracking-[1px] text-orange-500">
// //                   Delivery Address
// //                 </p>

// //                 <p className="mt-1.5 break-words text-sm font-medium leading-5 text-gray-700">
// //                   {order.delivery_address || 'Address not available'}
// //                 </p>

// //                 {(order.delivery_city || order.delivery_pincode) && (
// //                   <p className="mt-1 text-xs text-gray-500">
// //                     {order.delivery_city}

// //                     {order.delivery_city && order.delivery_pincode ? ', ' : ''}

// //                     {order.delivery_pincode}
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* ================================================= */}
// //           {/* BILL */}
// //           {/* ================================================= */}

// //           <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50">
// //                 <Receipt size={16} className="text-gray-500" />
// //               </div>

// //               <div>
// //                 <p className="text-sm font-bold text-gray-900">Order Bill</p>

// //                 <p className="text-xs text-gray-400">
// //                   Download your receipt PDF
// //                 </p>
// //               </div>
// //             </div>

// //             <BillButton order={order} />
// //           </div>
// //         </div>

// //         {/* ================================================= */}
// //         {/* RATING */}
// //         {/* ================================================= */}

// //         <RatingItems order={order} />
// //       </article>
// //     );
// //   };

// //   // =========================================================
// //   // LOADING
// //   // =========================================================

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#fff8f1] px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
// //         <Container>
// //           <div className="flex min-h-[65vh] items-center justify-center">
// //             <div className="text-center">
// //               <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

// //               <p className="mt-4 text-sm font-medium text-gray-500 sm:text-base">
// //                 Loading your dashboard...
// //               </p>
// //             </div>
// //           </div>
// //         </Container>
// //       </div>
// //     );
// //   }

// //   // =========================================================
// //   // LOGIN REQUIRED
// //   // =========================================================

// //   if (!token) {
// //     return (
// //       <div className="min-h-screen bg-[#fff8f1] px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
// //         <Container>
// //           <div className="flex min-h-[70vh] items-center justify-center">
// //             <div className="w-full max-w-md rounded-[2rem] border border-gray-100 bg-white p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10">
// //               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 sm:h-20 sm:w-20">
// //                 <User className="text-orange-500" size={32} strokeWidth={2} />
// //               </div>

// //               <h1 className="mt-5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
// //                 Please Login
// //               </h1>

// //               <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
// //                 Sign in with Google to access your customer dashboard and view
// //                 your orders.
// //               </p>

// //               <Link
// //                 to="/"
// //                 className="mx-auto mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98] sm:w-auto sm:rounded-full"
// //               >
// //                 Go to Home
// //                 <ChevronRight size={18} />
// //               </Link>
// //             </div>
// //           </div>
// //         </Container>
// //       </div>
// //     );
// //   }

// //   // =========================================================
// //   // MAIN DASHBOARD
// //   // =========================================================

// //   return (
// //     <div className="min-h-screen bg-[#fff8f1] px-3 pb-10 pt-24 sm:px-5 sm:pb-14 sm:pt-28 md:px-6 lg:px-8 lg:pb-20">
// //       <Container>
// //         {/* ================================================= */}
// //         {/* HEADER */}
// //         {/* ================================================= */}

// //         <header className="mb-6 sm:mb-8 lg:mb-10">
// //           <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
// //             <div className="min-w-0">
// //               <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-orange-500 sm:text-xs">
// //                 <User size={13} />
// //                 My Account
// //               </div>

// //               <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-gray-900">
// //                 Customer Dashboard
// //               </h1>

// //               <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
// //                 Manage your account, view your orders and track your deliveries.
// //               </p>
// //             </div>

// //             <button
// //               onClick={handleLogout}
// //               className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] sm:w-auto sm:rounded-full"
// //             >
// //               <LogOut size={17} />
// //               Logout
// //             </button>
// //           </div>
// //         </header>

// //         {/* ================================================= */}
// //         {/* PROFILE + STATS */}
// //         {/* ================================================= */}

// //         <section className="grid gap-4 lg:grid-cols-[minmax(280px,0.85fr)_1.5fr] lg:gap-5">
// //           {/* PROFILE */}

// //           <div className="rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-6">
// //             <div className="flex items-center gap-4">
// //               <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 text-2xl font-extrabold text-orange-600 sm:h-20 sm:w-20 sm:text-3xl">
// //                 {user?.name?.charAt(0)?.toUpperCase() || 'U'}
// //               </div>

// //               <div className="min-w-0">
// //                 <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
// //                   Welcome back
// //                 </p>

// //                 <h2 className="mt-1 truncate text-xl font-extrabold text-gray-900 sm:text-2xl">
// //                   {user?.name || 'Customer'}
// //                 </h2>
// //               </div>
// //             </div>

// //             <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-5">
// //               <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-gray-50 p-3">
// //                 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
// //                   <Mail size={16} className="text-orange-500" />
// //                 </div>

// //                 <div className="min-w-0">
// //                   <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
// //                     Email
// //                   </p>

// //                   <p className="mt-0.5 truncate text-sm font-medium text-gray-700">
// //                     {user?.email || 'Not available'}
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-gray-50 p-3">
// //                 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
// //                   <Phone size={16} className="text-orange-500" />
// //                 </div>

// //                 <div className="min-w-0">
// //                   <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
// //                     Phone
// //                   </p>

// //                   <p className="mt-0.5 truncate text-sm font-medium text-gray-700">
// //                     {user?.phone || 'Not added'}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* STATS */}

// //           <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
// //             <div className="rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-5 lg:p-6">
// //               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
// //                 <ShoppingBag size={21} className="text-orange-500" />
// //               </div>

// //               <p className="mt-4 text-xs font-semibold text-gray-400 sm:text-sm">
// //                 Total Orders
// //               </p>

// //               <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
// //                 {totalOrders}
// //               </p>
// //             </div>

// //             <div className="rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-5 lg:p-6">
// //               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
// //                 <Clock3 size={21} className="text-amber-600" />
// //               </div>

// //               <p className="mt-4 text-xs font-semibold text-gray-400 sm:text-sm">
// //                 Active Orders
// //               </p>

// //               <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
// //                 {pendingOrders}
// //               </p>
// //             </div>

// //             <div className="rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-5 lg:p-6">
// //               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
// //                 <CheckCircle2 size={21} className="text-emerald-600" />
// //               </div>

// //               <p className="mt-4 text-xs font-semibold text-gray-400 sm:text-sm">
// //                 Delivered
// //               </p>

// //               <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
// //                 {completedOrders}
// //               </p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* ================================================= */}
// //         {/* ORDER HISTORY */}
// //         {/* ================================================= */}

// //         <section className="mt-5 overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-[0_12px_50px_rgba(0,0,0,0.05)] sm:mt-7 sm:rounded-[2rem]">
// //           {/* SECTION HEADER */}

// //           <div className="border-b border-gray-100 p-4 sm:p-6 lg:p-7">
// //             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
// //               <div className="flex min-w-0 items-start gap-3">
// //                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
// //                   <Package size={18} className="text-orange-500" />
// //                 </div>

// //                 <div className="min-w-0">
// //                   <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
// //                     Order History
// //                   </h2>

// //                   <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
// //                     View your previous orders, items, payments and delivery
// //                     status.
// //                   </p>
// //                 </div>
// //               </div>

// //               <Link
// //                 to="/menu"
// //                 className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98] sm:w-auto sm:shrink-0 sm:rounded-full"
// //               >
// //                 Order Food
// //                 <ArrowRight size={17} />
// //               </Link>
// //             </div>
// //           </div>

// //           {/* ================================================= */}
// //           {/* NO ORDERS */}
// //           {/* ================================================= */}

// //           {orders.length === 0 ? (
// //             <div className="px-5 py-14 text-center sm:px-10 sm:py-20">
// //               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 sm:h-20 sm:w-20">
// //                 <Package className="text-orange-500" size={32} />
// //               </div>

// //               <h3 className="mt-5 text-xl font-extrabold text-gray-900 sm:text-2xl">
// //                 No Orders Yet
// //               </h3>

// //               <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
// //                 You haven't placed an order yet. Explore our menu and discover
// //                 something delicious.
// //               </p>

// //               <Link
// //                 to="/menu"
// //                 className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-orange-600 active:scale-[0.98] sm:w-auto sm:rounded-full"
// //               >
// //                 Browse Menu
// //                 <ChevronRight size={18} />
// //               </Link>
// //             </div>
// //           ) : (
// //             /* ================================================= */
// //             /* ORDERS */
// //             /* ================================================= */

// //             <div className="space-y-4 p-3 sm:space-y-5 sm:p-5 lg:p-6">
// //               {orders.map((order) => (
// //                 <OrderCard key={order.id} order={order} />
// //               ))}
// //             </div>
// //           )}
// //         </section>
// //       </Container>

// //       {/* ===================================================== */}
// //       {/* RATING MODAL */}
// //       {/* ===================================================== */}

// //       {selectedFood && (
// //         <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4">
// //           <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[1.75rem] bg-white shadow-2xl sm:rounded-[2rem]">
// //             <div className="p-5 sm:p-7">
// //               {/* MODAL HEADER */}

// //               <div className="text-center">
// //                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
// //                   <Star
// //                     size={27}
// //                     className="text-orange-500"
// //                     fill="currentColor"
// //                   />
// //                 </div>

// //                 <h2 className="mt-4 text-lg font-extrabold text-gray-900 sm:text-xl">
// //                   Rate {selectedFood.name || 'this food'}
// //                 </h2>

// //                 <p className="mt-1 text-sm text-gray-500">How was your food?</p>
// //               </div>

// //               {/* STARS */}

// //               <div className="mt-6 flex justify-center gap-1.5 sm:gap-2">
// //                 {[1, 2, 3, 4, 5].map((star) => (
// //                   <button
// //                     key={star}
// //                     type="button"
// //                     onClick={() => setSelectedRating(star)}
// //                     className="rounded-xl p-1.5 transition hover:scale-110 active:scale-95"
// //                     aria-label={`Rate ${star} stars`}
// //                   >
// //                     <Star
// //                       size={30}
// //                       className={
// //                         star <= selectedRating
// //                           ? 'text-orange-500'
// //                           : 'text-gray-300'
// //                       }
// //                       fill={star <= selectedRating ? 'currentColor' : 'none'}
// //                     />
// //                   </button>
// //                 ))}
// //               </div>

// //               {/* REVIEW */}

// //               <textarea
// //                 value={review}
// //                 onChange={(event) => setReview(event.target.value)}
// //                 placeholder="Write a review (optional)"
// //                 rows={4}
// //                 className="mt-6 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
// //               />

// //               {/* BUTTONS */}

// //               <div className="mt-4 grid grid-cols-2 gap-3">
// //                 <button
// //                   type="button"
// //                   onClick={closeRatingModal}
// //                   disabled={ratingLoading}
// //                   className="min-h-12 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 sm:rounded-full"
// //                 >
// //                   Cancel
// //                 </button>

// //                 <button
// //                   type="button"
// //                   onClick={handleRating}
// //                   disabled={ratingLoading || !selectedRating}
// //                   className="min-h-12 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-full"
// //                 >
// //                   {ratingLoading ? 'Submitting...' : 'Submit Rating'}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Orders;

// import { useEffect, useState } from 'react';
// import Container from '../components/common/Container';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   Package,
//   LogOut,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   CalendarDays,
//   ChevronRight,
//   ShoppingBag,
//   Clock3,
//   CheckCircle2,
//   XCircle,
//   Star,
//   CreditCard,
//   Utensils,
//   Download,
//   Eye,
//   X,
//   Receipt,
// } from 'lucide-react';
// import api from '../services/api';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [ratingLoading, setRatingLoading] = useState(false);

//   const [selectedFood, setSelectedFood] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [review, setReview] = useState('');

//   // ORDER DETAILS MODAL
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = localStorage.getItem('token');
//   const storedUser = localStorage.getItem('user');
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   // =========================================================
//   // FETCH ORDERS
//   // =========================================================

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);

//         const response = await api.get('/orders/my-orders', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = response.data;

//         let myOrders = [];

//         if (Array.isArray(data)) {
//           myOrders = data;
//         } else if (Array.isArray(data.orders)) {
//           myOrders = data.orders;
//         }

//         const ordersWithItems = await Promise.all(
//           myOrders.map(async (order) => {
//             try {
//               const orderResponse = await api.get(`/orders/${order.id}`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               });

//               return {
//                 ...order,
//                 items: orderResponse.data.order?.items || [],
//               };
//             } catch (error) {
//               console.error(
//                 `failed to fetch items for order ${order.id}:`,
//                 error,
//               );

//               return {
//                 ...order,
//                 items: [],
//               };
//             }
//           }),
//         );

//         setOrders(ordersWithItems);
//       } catch (error) {
//         console.error('failed to fetch orders:', error);
//         setOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [token, location.key]);

//   // =========================================================
//   // LOGOUT
//   // =========================================================

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');

//     navigate('/');
//   };

//   // =========================================================
//   // DOWNLOAD BILL
//   // =========================================================

//   const handleDownloadBill = async (order) => {
//     try {
//       if (!order.has_bill) {
//         alert('Bill is not available for this order.');
//         return;
//       }

//       const response = await api.get(`/orders/${order.id}/bill`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         responseType: 'blob',
//       });

//       const blob = new Blob([response.data], {
//         type: 'application/pdf',
//       });

//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement('a');

//       link.href = url;
//       link.download = order.bill_pdf_name || `order-${order.id}-bill.pdf`;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('download bill error:', error);

//       alert('Bill is not available for this order.');
//     }
//   };

//   // =========================================================
//   // STATS
//   // =========================================================

//   const totalOrders = orders.length;

//   const pendingOrders = orders.filter(
//     (order) =>
//       order.status === 'pending' ||
//       order.status === 'confirmed' ||
//       order.status === 'preparing' ||
//       order.status === 'out_for_delivery',
//   ).length;

//   const completedOrders = orders.filter(
//     (order) => order.status === 'delivered',
//   ).length;

//   // =========================================================
//   // STATUS
//   // =========================================================

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'delivered':
//         return 'bg-emerald-50 text-emerald-700 border-emerald-100';

//       case 'cancelled':
//         return 'bg-red-50 text-red-700 border-red-100';

//       case 'out_for_delivery':
//         return 'bg-blue-50 text-blue-700 border-blue-100';

//       case 'preparing':
//         return 'bg-amber-50 text-amber-700 border-amber-100';

//       case 'confirmed':
//         return 'bg-purple-50 text-purple-700 border-purple-100';

//       default:
//         return 'bg-orange-50 text-orange-700 border-orange-100';
//     }
//   };

//   const getStatusIcon = (status) => {
//     if (status === 'delivered') {
//       return <CheckCircle2 size={14} />;
//     }

//     if (status === 'cancelled') {
//       return <XCircle size={14} />;
//     }

//     return <Clock3 size={14} />;
//   };

//   const formatStatus = (status) => {
//     if (!status) {
//       return 'pending';
//     }

//     return status.replaceAll('_', ' ');
//   };

//   // =========================================================
//   // DATE
//   // =========================================================

//   const formatDate = (date) => {
//     if (!date) {
//       return '-';
//     }

//     return new Date(date).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   // =========================================================
//   // RATING
//   // =========================================================

//   const openRatingModal = (orderId, food) => {
//     setSelectedOrderId(orderId);
//     setSelectedFood(food);
//     setSelectedRating(0);
//     setReview('');
//   };

//   const closeRatingModal = () => {
//     if (ratingLoading) {
//       return;
//     }

//     setSelectedFood(null);
//     setSelectedOrderId(null);
//     setSelectedRating(0);
//     setReview('');
//   };

//   const handleRating = async () => {
//     if (!selectedFood || !selectedOrderId) {
//       return;
//     }

//     if (!selectedRating) {
//       alert('Please select a rating');
//       return;
//     }

//     try {
//       setRatingLoading(true);

//       await api.post(
//         '/ratings',
//         {
//           orderId: selectedOrderId,
//           foodId: selectedFood.food_id,
//           rating: selectedRating,
//           review: review.trim() || null,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setOrders((previousOrders) =>
//         previousOrders.map((order) => {
//           if (order.id !== selectedOrderId) {
//             return order;
//           }

//           return {
//             ...order,
//             items: order.items.map((item) => {
//               if (item.food_id !== selectedFood.food_id) {
//                 return item;
//               }

//               return {
//                 ...item,
//                 user_rating: selectedRating,
//               };
//             }),
//           };
//         }),
//       );

//       alert('Rating submitted successfully');

//       closeRatingModal();
//     } catch (error) {
//       console.error('rating error:', error);

//       alert(error.response?.data?.message || 'Failed to submit rating');
//     } finally {
//       setRatingLoading(false);
//     }
//   };

//   // =========================================================
//   // OPEN / CLOSE ORDER DETAILS
//   // =========================================================

//   const openOrderDetails = (order) => {
//     setSelectedOrder(order);
//   };

//   const closeOrderDetails = () => {
//     setSelectedOrder(null);
//   };

//   // =========================================================
//   // ORDER ITEMS
//   // =========================================================

//   const renderOrderItems = (items = []) => {
//     if (!items.length) {
//       return <p className="text-sm text-gray-400">Items unavailable</p>;
//     }

//     return (
//       <div className="space-y-2.5">
//         {items.map((item) => (
//           <div key={item.id} className="flex min-w-0 items-center gap-3">
//             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50">
//               <Utensils size={15} className="text-orange-500" />
//             </div>

//             <div className="min-w-0 flex-1">
//               <p className="truncate text-sm font-semibold text-gray-800">
//                 {item.name || 'Food item'}
//               </p>

//               <p className="mt-0.5 text-xs text-gray-400">
//                 Quantity: {item.quantity || 1}
//               </p>
//             </div>

//             {item.user_rating ? (
//               <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1.5 text-xs font-bold text-orange-500">
//                 <Star size={13} fill="currentColor" />
//                 {item.user_rating}/5
//               </div>
//             ) : orderCanRate(item) ? null : null}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // =========================================================
//   // CHECK WHETHER ITEM CAN BE RATED
//   // =========================================================

//   const orderCanRate = (item) => {
//     return !item.user_rating;
//   };

//   // =========================================================
//   // RATING SECTION
//   // =========================================================

//   const RatingSection = ({ order }) => {
//     if (order.status !== 'delivered' || !order.items?.length) {
//       return null;
//     }

//     return (
//       <div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50/50 p-3 sm:p-4">
//         <div className="mb-3">
//           <div className="flex items-center gap-2">
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
//               <Star size={15} className="text-orange-500" fill="currentColor" />
//             </div>

//             <div>
//               <p className="text-sm font-bold text-gray-900">Rate your food</p>

//               <p className="text-xs text-gray-500">Share your experience</p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-2">
//           {order.items.map((item) => (
//             <div
//               key={item.id}
//               className="flex min-w-0 items-center gap-3 rounded-xl bg-white p-3"
//             >
//               <div className="min-w-0 flex-1">
//                 <p className="truncate text-sm font-semibold text-gray-800">
//                   {item.name || 'Food item'}
//                 </p>

//                 <p className="mt-0.5 text-xs text-gray-400">
//                   Qty {item.quantity || 1}
//                 </p>
//               </div>

//               {item.user_rating ? (
//                 <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-orange-500">
//                   <Star size={14} fill="currentColor" />
//                   {item.user_rating}/5
//                 </div>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => openRatingModal(order.id, item)}
//                   className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-xl bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 active:scale-[0.97]"
//                 >
//                   <Star size={13} />
//                   Rate
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // =========================================================
//   // ORDER CARD
//   // =========================================================

//   const OrderCard = ({ order }) => {
//     return (
//       <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
//         {/* HEADER */}

//         <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:p-5">
//           <div className="flex items-center justify-between gap-3">
//             <div className="flex min-w-0 items-center gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
//                 <Package size={18} className="text-orange-500" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-base font-extrabold text-gray-900 sm:text-lg">
//                   Order #{order.id}
//                 </p>

//                 <p className="mt-0.5 text-xs text-gray-400">
//                   {formatDate(order.created_at)}
//                 </p>
//               </div>
//             </div>

//             <span
//               className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold capitalize sm:text-xs ${getStatusStyle(
//                 order.status,
//               )}`}
//             >
//               {getStatusIcon(order.status)}
//               {formatStatus(order.status)}
//             </span>
//           </div>
//         </div>

//         {/* MAIN CONTENT */}

//         <div className="p-4 sm:p-5">
//           {/* ITEMS */}

//           <div>
//             <div className="mb-3 flex items-center gap-2">
//               <Utensils size={16} className="text-orange-500" />

//               <p className="text-sm font-bold text-gray-900">Items</p>
//             </div>

//             <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-3 sm:p-4">
//               {order.items?.length ? (
//                 <div className="space-y-2.5">
//                   {order.items.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex min-w-0 items-center gap-3"
//                     >
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
//                         <Utensils size={14} className="text-orange-500" />
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p className="truncate text-sm font-semibold text-gray-800">
//                           {item.name || 'Food item'}
//                         </p>

//                         <p className="mt-0.5 text-xs text-gray-400">
//                           Qty {item.quantity || 1}
//                         </p>
//                       </div>

//                       {item.user_rating && (
//                         <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1.5 text-xs font-bold text-orange-500">
//                           <Star size={13} fill="currentColor" />
//                           {item.user_rating}/5
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-400">Items unavailable</p>
//               )}
//             </div>
//           </div>

//           {/* AMOUNT + ACTION */}

//           <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <p className="text-xs font-medium text-gray-400">Total Amount</p>

//               <p className="mt-0.5 text-xl font-extrabold text-gray-900">
//                 ₹{Number(order.total_amount || 0).toFixed(2)}
//               </p>
//             </div>

//             <div className="flex w-full gap-2 sm:w-auto">
//               <button
//                 type="button"
//                 onClick={() => openOrderDetails(order)}
//                 className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 active:scale-[0.98] sm:flex-none"
//               >
//                 <Eye size={16} />
//                 Details
//               </button>

//               {order.has_bill || order.bill_pdf ? (
//                 <button
//                   type="button"
//                   onClick={() => handleDownloadBill(order)}
//                   className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100 transition hover:bg-emerald-100 active:scale-[0.98] sm:flex-none"
//                 >
//                   <Download size={16} />
//                   <span className="hidden sm:inline">Bill</span>
//                   <span className="sm:hidden">Bill</span>
//                 </button>
//               ) : null}
//             </div>
//           </div>

//           {/* RATING */}

//           <RatingSection order={order} />
//         </div>
//       </article>
//     );
//   };

//   // =========================================================
//   // LOADING
//   // =========================================================

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#fff8f1] px-3 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
//         <Container>
//           <div className="flex min-h-[65vh] items-center justify-center">
//             <div className="text-center">
//               <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

//               <p className="mt-4 text-sm font-medium text-gray-500 sm:text-base">
//                 Loading your dashboard...
//               </p>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   // =========================================================
//   // LOGIN REQUIRED
//   // =========================================================

//   if (!token) {
//     return (
//       <div className="min-h-screen bg-[#fff8f1] px-3 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
//         <Container>
//           <div className="flex min-h-[70vh] items-center justify-center">
//             <div className="w-full max-w-md rounded-[2rem] border border-gray-100 bg-white p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-10">
//               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 sm:h-20 sm:w-20">
//                 <User className="text-orange-500" size={32} />
//               </div>

//               <h1 className="mt-5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
//                 Please Login
//               </h1>

//               <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
//                 Sign in with Google to access your customer dashboard and view
//                 your orders.
//               </p>

//               <Link
//                 to="/"
//                 className="mx-auto mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600 active:scale-[0.98] sm:w-auto sm:rounded-full"
//               >
//                 Go to Home
//                 <ChevronRight size={18} />
//               </Link>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   // =========================================================
//   // MAIN PAGE
//   // =========================================================

//   return (
//     <div className="min-h-screen bg-[#fff8f1] px-3 pb-10 pt-24 sm:px-5 sm:pb-14 sm:pt-28 md:px-6 lg:px-8 lg:pb-20">
//       <Container>
//         {/* PAGE HEADER */}

//         <header className="mb-6 sm:mb-8">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
//             <div className="min-w-0">
//               <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-orange-500 sm:text-xs">
//                 <User size={13} />
//                 My Account
//               </div>

//               <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-gray-900">
//                 Customer Dashboard
//               </h1>

//               <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
//                 Manage your account and keep track of your orders.
//               </p>
//             </div>

//             <button
//               onClick={handleLogout}
//               className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] sm:w-auto sm:rounded-full"
//             >
//               <LogOut size={17} />
//               Logout
//             </button>
//           </div>
//         </header>

//         {/* PROFILE + STATS */}

//         <section className="grid gap-4 lg:grid-cols-[minmax(280px,0.85fr)_1.5fr]">
//           {/* PROFILE */}

//           <div className="rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-6">
//             <div className="flex items-center gap-4">
//               <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 text-2xl font-extrabold text-orange-600 sm:h-20 sm:w-20 sm:text-3xl">
//                 {user?.name?.charAt(0)?.toUpperCase() || 'U'}
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
//                   Welcome back
//                 </p>

//                 <h2 className="mt-1 truncate text-xl font-extrabold text-gray-900 sm:text-2xl">
//                   {user?.name || 'Customer'}
//                 </h2>
//               </div>
//             </div>

//             <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-5">
//               <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-gray-50 p-3">
//                 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
//                   <Mail size={16} className="text-orange-500" />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
//                     Email
//                   </p>

//                   <p className="truncate text-sm font-medium text-gray-700">
//                     {user?.email || 'Not available'}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-gray-50 p-3">
//                 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
//                   <Phone size={16} className="text-orange-500" />
//                 </div>

//                 <div>
//                   <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
//                     Phone
//                   </p>

//                   <p className="text-sm font-medium text-gray-700">
//                     {user?.phone || 'Not added'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* STATS */}

//           <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
//             <div className="rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-6">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
//                 <ShoppingBag size={21} className="text-orange-500" />
//               </div>

//               <p className="mt-4 text-xs font-semibold text-gray-400 sm:text-sm">
//                 Total Orders
//               </p>

//               <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
//                 {totalOrders}
//               </p>
//             </div>

//             <div className="rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-6">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
//                 <Clock3 size={21} className="text-amber-600" />
//               </div>

//               <p className="mt-4 text-xs font-semibold text-gray-400 sm:text-sm">
//                 Active Orders
//               </p>

//               <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
//                 {pendingOrders}
//               </p>
//             </div>

//             <div className="rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-6">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
//                 <CheckCircle2 size={21} className="text-emerald-600" />
//               </div>

//               <p className="mt-4 text-xs font-semibold text-gray-400 sm:text-sm">
//                 Delivered
//               </p>

//               <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
//                 {completedOrders}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* ORDER HISTORY */}

//         <section className="mt-5 overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-[0_12px_50px_rgba(0,0,0,0.05)] sm:mt-7 sm:rounded-[2rem]">
//           <div className="border-b border-gray-100 p-4 sm:p-6">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex items-start gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
//                   <Package size={18} className="text-orange-500" />
//                 </div>

//                 <div>
//                   <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
//                     Order History
//                   </h2>

//                   <p className="mt-1 text-xs text-gray-500 sm:text-sm">
//                     Your recent orders
//                   </p>
//                 </div>
//               </div>

//               <Link
//                 to="/menu"
//                 className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 active:scale-[0.98] sm:w-auto sm:rounded-full"
//               >
//                 Order Food
//                 <ChevronRight size={17} />
//               </Link>
//             </div>
//           </div>

//           {/* NO ORDERS */}

//           {orders.length === 0 ? (
//             <div className="px-5 py-14 text-center sm:px-10 sm:py-20">
//               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 sm:h-20 sm:w-20">
//                 <Package className="text-orange-500" size={32} />
//               </div>

//               <h3 className="mt-5 text-xl font-extrabold text-gray-900 sm:text-2xl">
//                 No Orders Yet
//               </h3>

//               <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
//                 You haven't placed an order yet. Explore our menu and discover
//                 something delicious.
//               </p>

//               <Link
//                 to="/menu"
//                 className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-orange-600 sm:w-auto sm:rounded-full"
//               >
//                 Browse Menu
//                 <ChevronRight size={18} />
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-4 p-3 sm:p-5">
//               {orders.map((order) => (
//                 <OrderCard key={order.id} order={order} />
//               ))}
//             </div>
//           )}
//         </section>
//       </Container>

//       {/* ===================================================== */}
//       {/* ORDER DETAILS MODAL */}
//       {/* ===================================================== */}

//       {selectedOrder && (
//         <div
//           className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4"
//           onClick={closeOrderDetails}
//         >
//           <div
//             className="max-h-[92vh] w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-white shadow-2xl sm:rounded-[2rem]"
//             onClick={(event) => event.stopPropagation()}
//           >
//             {/* MODAL HEADER */}

//             <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
//               <div className="flex min-w-0 items-center gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
//                   <Package size={18} className="text-orange-500" />
//                 </div>

//                 <div className="min-w-0">
//                   <h2 className="text-lg font-extrabold text-gray-900">
//                     Order #{selectedOrder.id}
//                   </h2>

//                   <p className="text-xs text-gray-400">
//                     {formatDate(selectedOrder.created_at)}
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeOrderDetails}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
//                 aria-label="Close"
//               >
//                 <X size={19} />
//               </button>
//             </div>

//             {/* MODAL BODY */}

//             <div className="max-h-[calc(92vh-75px)] overflow-y-auto p-5 sm:p-6">
//               {/* STATUS */}

//               <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
//                 <div>
//                   <p className="text-xs font-medium text-gray-400">
//                     Order Status
//                   </p>

//                   <p className="mt-1 text-sm font-bold capitalize text-gray-800">
//                     {formatStatus(selectedOrder.status)}
//                   </p>
//                 </div>

//                 <span
//                   className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(
//                     selectedOrder.status,
//                   )}`}
//                 >
//                   {getStatusIcon(selectedOrder.status)}
//                   {formatStatus(selectedOrder.status)}
//                 </span>
//               </div>

//               {/* ITEMS */}

//               <div className="mt-5">
//                 <div className="mb-3 flex items-center gap-2">
//                   <Utensils size={16} className="text-orange-500" />

//                   <h3 className="text-sm font-bold text-gray-900">
//                     Ordered Items
//                   </h3>
//                 </div>

//                 <div className="rounded-2xl border border-gray-100 bg-white">
//                   {selectedOrder.items?.length ? (
//                     <div className="divide-y divide-gray-100">
//                       {selectedOrder.items.map((item) => (
//                         <div
//                           key={item.id}
//                           className="flex items-center gap-3 p-3.5"
//                         >
//                           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
//                             <Utensils size={15} className="text-orange-500" />
//                           </div>

//                           <div className="min-w-0 flex-1">
//                             <p className="truncate text-sm font-semibold text-gray-800">
//                               {item.name || 'Food item'}
//                             </p>

//                             <p className="mt-1 text-xs text-gray-400">
//                               Quantity: {item.quantity || 1}
//                             </p>
//                           </div>

//                           {item.user_rating && (
//                             <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1.5 text-xs font-bold text-orange-500">
//                               <Star size={13} fill="currentColor" />
//                               {item.user_rating}/5
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="p-4 text-sm text-gray-400">
//                       Items unavailable
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* DELIVERY */}

//               <div className="mt-5">
//                 <div className="mb-3 flex items-center gap-2">
//                   <MapPin size={16} className="text-orange-500" />

//                   <h3 className="text-sm font-bold text-gray-900">
//                     Delivery Details
//                   </h3>
//                 </div>

//                 <div className="rounded-2xl bg-orange-50/70 p-4">
//                   <p className="text-xs font-bold uppercase tracking-wide text-orange-500">
//                     Delivery Address
//                   </p>

//                   <p className="mt-2 break-words text-sm font-medium leading-6 text-gray-700">
//                     {selectedOrder.delivery_address || 'Address not available'}
//                   </p>

//                   {(selectedOrder.delivery_city ||
//                     selectedOrder.delivery_pincode) && (
//                     <p className="mt-1 text-xs text-gray-500">
//                       {selectedOrder.delivery_city}

//                       {selectedOrder.delivery_city &&
//                       selectedOrder.delivery_pincode
//                         ? ', '
//                         : ''}

//                       {selectedOrder.delivery_pincode}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* PAYMENT */}

//               <div className="mt-5">
//                 <div className="mb-3 flex items-center gap-2">
//                   <CreditCard size={16} className="text-orange-500" />

//                   <h3 className="text-sm font-bold text-gray-900">
//                     Payment Details
//                   </h3>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="rounded-2xl bg-gray-50 p-4">
//                     <p className="text-xs text-gray-400">Payment Method</p>

//                     <p className="mt-1.5 break-words text-sm font-bold capitalize text-gray-700">
//                       {selectedOrder.payment_method || 'Not specified'}
//                     </p>
//                   </div>

//                   <div className="rounded-2xl bg-gray-50 p-4">
//                     <p className="text-xs text-gray-400">Payment Status</p>

//                     <p className="mt-1.5 break-words text-sm font-bold capitalize text-gray-700">
//                       {selectedOrder.payment_status || 'Pending'}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* TOTAL */}

//               <div className="mt-5 flex items-center justify-between rounded-2xl bg-gray-900 p-4">
//                 <div className="flex items-center gap-2">
//                   <Receipt size={17} className="text-white" />

//                   <p className="text-sm font-semibold text-white">
//                     Total Amount
//                   </p>
//                 </div>

//                 <p className="text-lg font-extrabold text-white">
//                   ₹{Number(selectedOrder.total_amount || 0).toFixed(2)}
//                 </p>
//               </div>

//               {/* BILL */}

//               <div className="mt-5">
//                 {selectedOrder.has_bill || selectedOrder.bill_pdf ? (
//                   <button
//                     type="button"
//                     onClick={() => handleDownloadBill(selectedOrder)}
//                     className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 active:scale-[0.98]"
//                   >
//                     <Download size={17} />
//                     Download Bill
//                   </button>
//                 ) : (
//                   <div className="rounded-xl bg-gray-50 p-3 text-center text-sm font-medium text-gray-400">
//                     Bill is not available for this order.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===================================================== */}
//       {/* RATING MODAL */}
//       {/* ===================================================== */}

//       {selectedFood && (
//         <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4">
//           <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[1.75rem] bg-white shadow-2xl sm:rounded-[2rem]">
//             <div className="p-5 sm:p-7">
//               <div className="text-center">
//                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
//                   <Star
//                     size={27}
//                     className="text-orange-500"
//                     fill="currentColor"
//                   />
//                 </div>

//                 <h2 className="mt-4 text-lg font-extrabold text-gray-900 sm:text-xl">
//                   Rate {selectedFood.name || 'this food'}
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">How was your food?</p>
//               </div>

//               {/* STARS */}

//               <div className="mt-6 flex justify-center gap-1.5">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => setSelectedRating(star)}
//                     className="rounded-xl p-1.5 transition hover:scale-110 active:scale-95"
//                     aria-label={`Rate ${star} stars`}
//                   >
//                     <Star
//                       size={30}
//                       className={
//                         star <= selectedRating
//                           ? 'text-orange-500'
//                           : 'text-gray-300'
//                       }
//                       fill={star <= selectedRating ? 'currentColor' : 'none'}
//                     />
//                   </button>
//                 ))}
//               </div>

//               {/* REVIEW */}

//               <textarea
//                 value={review}
//                 onChange={(event) => setReview(event.target.value)}
//                 placeholder="Write a review (optional)"
//                 rows={4}
//                 className="mt-6 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
//               />

//               {/* BUTTONS */}

//               <div className="mt-4 grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   onClick={closeRatingModal}
//                   disabled={ratingLoading}
//                   className="min-h-12 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleRating}
//                   disabled={ratingLoading || !selectedRating}
//                   className="min-h-12 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {ratingLoading ? 'Submitting...' : 'Submit Rating'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import { useEffect, useState } from 'react';
import Container from '../components/common/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Package,
  LogOut,
  User,
  MapPin,
  CalendarDays,
  ChevronRight,
  Clock3,
  CheckCircle2,
  XCircle,
  Star,
  CreditCard,
  Utensils,
  Download,
  Eye,
  X,
  Receipt,
} from 'lucide-react';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState('');
  const [ratingLoading, setRatingLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');

  const storedUser = localStorage.getItem('user');

  const user = storedUser ? JSON.parse(storedUser) : null;

  // =========================================================
  // FETCH ORDERS
  // =========================================================

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

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
  }, [token, location.key]);

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/');
  };

  // =========================================================
  // DOWNLOAD BILL
  // =========================================================

  const handleDownloadBill = async (order) => {
    try {
      if (!order.has_bill) {
        alert('Bill is not available for this order.');
        return;
      }

      const response = await api.get(`/orders/${order.id}/bill`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], {
        type: 'application/pdf',
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = order.bill_pdf_name || `order-${order.id}-bill.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('download bill error:', error);

      alert('Bill is not available for this order.');
    }
  };

  // =========================================================
  // STATUS
  // =========================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-100';

      case 'cancelled':
        return 'bg-red-50 text-red-700 ring-red-100';

      case 'out_for_delivery':
        return 'bg-blue-50 text-blue-700 ring-blue-100';

      case 'preparing':
        return 'bg-amber-50 text-amber-700 ring-amber-100';

      case 'confirmed':
        return 'bg-purple-50 text-purple-700 ring-purple-100';

      default:
        return 'bg-orange-50 text-orange-700 ring-orange-100';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'delivered') {
      return <CheckCircle2 size={14} />;
    }

    if (status === 'cancelled') {
      return <XCircle size={14} />;
    }

    return <Clock3 size={14} />;
  };

  const formatStatus = (status) => {
    if (!status) {
      return 'pending';
    }

    return status.replaceAll('_', ' ');
  };

  // =========================================================
  // DATE
  // =========================================================

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

  // =========================================================
  // RATING
  // =========================================================

  const openRatingModal = (orderId, food) => {
    setSelectedOrderId(orderId);
    setSelectedFood(food);
    setSelectedRating(0);
    setReview('');
  };

  const closeRatingModal = () => {
    if (ratingLoading) {
      return;
    }

    setSelectedFood(null);
    setSelectedOrderId(null);
    setSelectedRating(0);
    setReview('');
  };

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

      // Update modal data too if it is open
      setSelectedOrder((previousOrder) => {
        if (!previousOrder || previousOrder.id !== selectedOrderId) {
          return previousOrder;
        }

        return {
          ...previousOrder,
          items: previousOrder.items.map((item) => {
            if (item.food_id !== selectedFood.food_id) {
              return item;
            }

            return {
              ...item,
              user_rating: selectedRating,
            };
          }),
        };
      });

      closeRatingModal();
    } catch (error) {
      console.error('rating error:', error);

      alert(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setRatingLoading(false);
    }
  };

  // =========================================================
  // ORDER DETAILS
  // =========================================================

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  // =========================================================
  // ORDER ITEM NAME
  // =========================================================

  const getPrimaryItem = (order) => {
    if (!order.items?.length) {
      return {
        name: 'Food item',
        quantity: 0,
      };
    }

    return {
      name: order.items[0].name || 'Food item',
      quantity: order.items[0].quantity || 1,
    };
  };

  // =========================================================
  // ACTIVE / COMPLETED COUNTS
  // =========================================================

  const activeOrders = orders.filter((order) =>
    ['pending', 'confirmed', 'preparing', 'out_for_delivery'].includes(
      order.status,
    ),
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === 'delivered',
  ).length;

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff9f4] px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
        <Container>
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

              <p className="mt-4 text-sm font-medium text-gray-500">
                Loading your orders...
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // =========================================================
  // LOGIN REQUIRED
  // =========================================================

  if (!token) {
    return (
      <div className="min-h-screen bg-[#fff9f4] px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
        <Container>
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-md rounded-[2rem] border border-gray-100 bg-white p-7 text-center shadow-[0_20px_70px_rgba(0,0,0,0.06)] sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
                <User size={30} className="text-orange-500" />
              </div>

              <h1 className="mt-5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Sign in to view your orders
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
                Sign in with Google to access your order history, bills and
                ratings.
              </p>

              <Link
                to="/"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 active:scale-[0.98] sm:w-auto sm:rounded-full"
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

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-[#fff9f4] px-3 pb-12 pt-24 sm:px-5 sm:pt-28 md:px-6 lg:px-8 lg:pb-20">
      <Container>
        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <header className="mx-auto mb-7 max-w-5xl sm:mb-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.8px] text-orange-500 sm:text-xs">
                <Package size={13} />
                My Orders
              </div>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                Your orders
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Track your recent orders, view details and download your bills.
              </p>
            </div>

            <div className="flex w-full gap-2 sm:w-auto">
              <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:flex-none">
                <span className="text-lg font-extrabold text-gray-900">
                  {orders.length}
                </span>

                <span className="text-xs font-medium text-gray-500">
                  Orders
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] sm:flex-none sm:rounded-full"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* ================================================= */}
        {/* QUICK SUMMARY */}
        {/* ================================================= */}

        {orders.length > 0 && (
          <div className="mx-auto mb-6 grid max-w-5xl grid-cols-2 gap-3 sm:mb-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 sm:text-xs">
                Total Orders
              </p>

              <p className="mt-1 text-2xl font-extrabold text-gray-950 sm:text-3xl">
                {orders.length}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 sm:text-xs">
                Active
              </p>

              <p className="mt-1 text-2xl font-extrabold text-orange-500 sm:text-3xl">
                {activeOrders}
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:col-span-1 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 sm:text-xs">
                Delivered
              </p>

              <p className="mt-1 text-2xl font-extrabold text-emerald-600 sm:text-3xl">
                {deliveredOrders}
              </p>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* ORDER LIST */}
        {/* ================================================= */}

        <section className="mx-auto max-w-5xl">
          {orders.length === 0 ? (
            <div className="rounded-[2rem] border border-gray-100 bg-white px-5 py-16 text-center shadow-[0_15px_50px_rgba(0,0,0,0.05)] sm:px-10 sm:py-20">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50">
                <Package size={34} className="text-orange-500" />
              </div>

              <h2 className="mt-6 text-2xl font-extrabold text-gray-950 sm:text-3xl">
                No orders yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                You haven't placed an order yet. Explore our menu and discover
                something delicious.
              </p>

              <Link
                to="/menu"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 active:scale-[0.98] sm:w-auto sm:rounded-full"
              >
                Browse Menu
                <ChevronRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {orders.map((order) => {
                const primaryItem = getPrimaryItem(order);

                return (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.045)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(0,0,0,0.07)] sm:rounded-[2rem]"
                  >
                    {/* CARD TOP */}
                    <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 sm:h-11 sm:w-11">
                          <Package
                            size={18}
                            className="text-orange-500 sm:h-5 sm:w-5"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-extrabold text-gray-950 sm:text-base">
                            Order #{order.id}
                          </p>

                          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-400">
                            <CalendarDays size={12} />
                            {formatDate(order.created_at)}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold capitalize ring-1 sm:text-xs ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {formatStatus(order.status)}
                      </span>
                    </div>

                    {/* CARD BODY */}
                    <div className="p-4 sm:p-6">
                      {/* ITEM + AMOUNT */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 sm:h-16 sm:w-16">
                          <Utensils
                            size={23}
                            className="text-orange-500 sm:h-6 sm:w-6"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-extrabold text-gray-950 sm:text-lg">
                            {primaryItem.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                            Qty {primaryItem.quantity}
                            {order.items?.length > 1 &&
                              ` · +${order.items.length - 1} more`}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs">
                            Total
                          </p>

                          <p className="mt-0.5 text-lg font-extrabold text-gray-950 sm:text-xl">
                            ₹{Number(order.total_amount || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* RATING */}
                      {order.status === 'delivered' &&
                        order.items?.length > 0 && (
                          <div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50/60 p-3 sm:p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex min-w-0 items-center gap-2.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                                  <Star
                                    size={15}
                                    className="text-orange-500"
                                    fill="currentColor"
                                  />
                                </div>

                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-gray-900 sm:text-sm">
                                    How was your food?
                                  </p>

                                  <p className="truncate text-[11px] text-gray-500 sm:text-xs">
                                    {primaryItem.name}
                                  </p>
                                </div>
                              </div>

                              {primaryItem.user_rating ? (
                                <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-orange-500 ring-1 ring-orange-100">
                                  <Star size={13} fill="currentColor" />
                                  Rated {primaryItem.user_rating}/5
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openRatingModal(order.id, order.items[0])
                                  }
                                  className="inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.97] sm:w-auto"
                                >
                                  <Star size={14} />
                                  Rate Food
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                      {/* ACTIONS */}
                      <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
                        <button
                          type="button"
                          onClick={() => openOrderDetails(order)}
                          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 active:scale-[0.98] sm:text-sm"
                        >
                          <Eye size={16} />
                          View Details
                        </button>

                        {(order.has_bill || order.bill_pdf) && (
                          <button
                            type="button"
                            onClick={() => handleDownloadBill(order)}
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100 transition hover:bg-emerald-100 active:scale-[0.98] sm:text-sm"
                          >
                            <Download size={16} />

                            <span className="hidden sm:inline">
                              Download Bill
                            </span>

                            <span className="sm:hidden">Bill</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </Container>

      {/* ===================================================== */}
      {/* ORDER DETAILS MODAL */}
      {/* ===================================================== */}

      {selectedOrder && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4"
          onClick={closeOrderDetails}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-2xl sm:rounded-[2rem]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <Package size={18} className="text-orange-500" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-extrabold text-gray-950 sm:text-lg">
                    Order #{selectedOrder.id}
                  </h2>

                  <p className="text-xs text-gray-400">
                    {formatDate(selectedOrder.created_at)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeOrderDetails}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                aria-label="Close order details"
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="overflow-y-auto p-5 sm:p-6">
              {/* STATUS */}

              <div className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 p-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                    Current Status
                  </p>

                  <p className="mt-1 text-sm font-bold capitalize text-gray-800">
                    {formatStatus(selectedOrder.status)}
                  </p>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ${getStatusStyle(
                    selectedOrder.status,
                  )}`}
                >
                  {getStatusIcon(selectedOrder.status)}
                  {formatStatus(selectedOrder.status)}
                </span>
              </div>

              {/* ITEMS */}

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <Utensils size={16} className="text-orange-500" />

                  <h3 className="text-sm font-bold text-gray-950">
                    Ordered Items
                  </h3>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-100">
                  {selectedOrder.items?.length ? (
                    <div className="divide-y divide-gray-100">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3.5"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                            <Utensils size={15} className="text-orange-500" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-gray-800">
                              {item.name || 'Food item'}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Quantity: {item.quantity || 1}
                            </p>
                          </div>

                          {item.user_rating && (
                            <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1.5 text-xs font-bold text-orange-500">
                              <Star size={13} fill="currentColor" />
                              {item.user_rating}/5
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="p-4 text-sm text-gray-400">
                      Items unavailable
                    </p>
                  )}
                </div>
              </div>

              {/* DELIVERY */}

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-orange-500" />

                  <h3 className="text-sm font-bold text-gray-950">
                    Delivery Details
                  </h3>
                </div>

                <div className="rounded-2xl bg-orange-50/70 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-orange-500">
                    Delivery Address
                  </p>

                  <p className="mt-2 break-words text-sm font-medium leading-6 text-gray-700">
                    {selectedOrder.delivery_address || 'Address not available'}
                  </p>

                  {(selectedOrder.delivery_city ||
                    selectedOrder.delivery_pincode) && (
                    <p className="mt-1 text-xs text-gray-500">
                      {selectedOrder.delivery_city}

                      {selectedOrder.delivery_city &&
                      selectedOrder.delivery_pincode
                        ? ', '
                        : ''}

                      {selectedOrder.delivery_pincode}
                    </p>
                  )}
                </div>
              </div>

              {/* PAYMENT */}

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2">
                  <CreditCard size={16} className="text-orange-500" />

                  <h3 className="text-sm font-bold text-gray-950">
                    Payment Details
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      Method
                    </p>

                    <p className="mt-1.5 break-words text-sm font-bold capitalize text-gray-700">
                      {selectedOrder.payment_method || 'Not specified'}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                      Status
                    </p>

                    <p className="mt-1.5 break-words text-sm font-bold capitalize text-gray-700">
                      {selectedOrder.payment_status || 'Pending'}
                    </p>
                  </div>
                </div>
              </div>

              {/* TOTAL */}

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-gray-950 p-4">
                <div className="flex items-center gap-2">
                  <Receipt size={17} className="text-orange-400" />

                  <p className="text-sm font-semibold text-white">
                    Total Amount
                  </p>
                </div>

                <p className="text-lg font-extrabold text-white">
                  ₹{Number(selectedOrder.total_amount || 0).toFixed(2)}
                </p>
              </div>

              {/* BILL */}

              <div className="mt-4">
                {selectedOrder.has_bill || selectedOrder.bill_pdf ? (
                  <button
                    type="button"
                    onClick={() => handleDownloadBill(selectedOrder)}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-600 active:scale-[0.98]"
                  >
                    <Download size={17} />
                    Download Bill
                  </button>
                ) : (
                  <div className="rounded-xl bg-gray-50 p-3 text-center text-sm font-medium text-gray-400">
                    Bill is not available for this order.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* RATING MODAL */}
      {/* ===================================================== */}

      {selectedFood && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4">
          <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[1.75rem] bg-white shadow-2xl sm:rounded-[2rem]">
            <div className="p-5 sm:p-7">
              {/* HEADER */}

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
                  <Star
                    size={27}
                    className="text-orange-500"
                    fill="currentColor"
                  />
                </div>

                <h2 className="mt-4 text-lg font-extrabold text-gray-950 sm:text-xl">
                  Rate {selectedFood.name || 'this food'}
                </h2>

                <p className="mt-1 text-sm text-gray-500">How was your food?</p>
              </div>

              {/* STARS */}

              <div className="mt-6 flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    className="rounded-xl p-1.5 transition hover:scale-110 active:scale-95"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      size={30}
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

              {/* REVIEW */}

              <textarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                placeholder="Write a review (optional)"
                rows={4}
                className="mt-6 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />

              {/* BUTTONS */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={closeRatingModal}
                  disabled={ratingLoading}
                  className="min-h-12 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleRating}
                  disabled={ratingLoading || !selectedRating}
                  className="min-h-12 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {ratingLoading ? 'Submitting...' : 'Submit Rating'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
