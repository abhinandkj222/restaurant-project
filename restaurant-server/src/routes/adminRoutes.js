const express = require('express');

const { loginAdmin } = require('../controllers/adminController');

const {
  getAdminOrders,
  getAdminOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');

const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);

router.get('/orders', adminAuthMiddleware, getAdminOrders);

router.get('/orders/:id', adminAuthMiddleware, getAdminOrderById);

router.put('/orders/:id/status', adminAuthMiddleware, updateOrderStatus);

module.exports = router;
