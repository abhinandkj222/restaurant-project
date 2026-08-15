const express = require('express');

const {
  createRating,
  getRatingForOrderFood,
} = require('../controllers/ratingController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createRating);

router.get(
  '/order/:orderId/food/:foodId',
  authMiddleware,
  getRatingForOrderFood,
);

module.exports = router;