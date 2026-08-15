const ratingModel = require('../models/ratingModel');

const createRating = async (req, res) => {
  try {
    const userId = req.user.id;

    const { foodId, orderId, rating, review } = req.body;

    if (!foodId || !orderId || rating === undefined) {
      return res.status(400).json({
        message: 'food, order and rating are required',
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message: 'rating must be between 1 and 5',
      });
    }

    const savedRating = await ratingModel.createRating(
      userId,
      foodId,
      orderId,
      numericRating,
      review,
    );

    return res.status(201).json({
      message: 'rating saved successfully',
      rating: savedRating,
    });
  } catch (error) {
    console.error('create rating error:', error);

    if (error.message === 'order not found') {
      return res.status(404).json({
        message: 'order not found',
      });
    }

    if (error.message === 'order not delivered') {
      return res.status(400).json({
        message: 'you can rate food only after delivery',
      });
    }

    if (error.message === 'food was not ordered') {
      return res.status(400).json({
        message: 'you cannot rate a food that was not ordered',
      });
    }

    return res.status(500).json({
      message: 'failed to save rating',
    });
  }
};

const getRatingForOrderFood = async (req, res) => {
  try {
    const { orderId, foodId } = req.params;

    const rating = await ratingModel.getRatingForOrderFood(orderId, foodId);

    return res.json({
      rating,
    });
  } catch (error) {
    console.error('get rating error:', error);

    return res.status(500).json({
      message: 'failed to get rating',
    });
  }
};

module.exports = {
  createRating,
  getRatingForOrderFood,
};
