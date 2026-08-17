const express = require('express');

const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  attachGuestOrders,
  getBill,
} = require('../controllers/orderController');

const authMiddleware = require('../middleware/authMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');

const router = express.Router();

router.post('/', optionalAuthMiddleware, createOrder);

router.get('/', authMiddleware, getOrders);

router.get('/my-orders', authMiddleware, getMyOrders);

router.post('/attach-guest-orders', authMiddleware, attachGuestOrders);

router.get('/:id', authMiddleware, getOrderById);
router.get('/:id/bill', authMiddleware, getBill);

module.exports = router;
