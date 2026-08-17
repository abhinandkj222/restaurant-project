const express = require('express');

const { loginAdmin } = require('../controllers/adminController');

const {
  getAdminOrders,
  getAdminOrderById,
  uploadBill,
  updateOrderStatus,
  updatePaymentStatus,
  printAllOrders,
} = require('../controllers/orderController');

const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const uploadBillMiddleware = require('../middleware/uploadBillMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);

router.get('/orders', adminAuthMiddleware, getAdminOrders);

router.get('/orders/print', adminAuthMiddleware, printAllOrders);
router.post(
  '/orders/:id/bill',
  adminAuthMiddleware,
  uploadBillMiddleware.single('bill'),
  uploadBill,
);

router.get('/orders/:id', adminAuthMiddleware, getAdminOrderById);

router.put('/orders/:id/status', adminAuthMiddleware, updateOrderStatus);

router.patch(
  '/orders/:id/payment-status',
  adminAuthMiddleware,
  updatePaymentStatus,
);

module.exports = router;
