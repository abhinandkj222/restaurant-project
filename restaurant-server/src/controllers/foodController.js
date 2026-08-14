const foodModel = require('../models/foodModel');

const addFood = async (req, res) => {
  try {
    const { categoryId, name, description, price } = req.body;

    if (!categoryId || !name || !price) {
      return res.status(400).json({
        message: 'category, name and price are required',
      });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const food = await foodModel.createFood(
      categoryId,
      name,
      description,
      price,
      imageUrl,
    );

    return res.status(201).json({
      message: 'food added successfully',
      food,
    });
  } catch (error) {
    console.error('add food error:', error);

    return res.status(500).json({
      message: 'failed to add food',
    });
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await foodModel.getFoods();

    return res.json({
      foods,
    });
  } catch (error) {
    console.error('get foods error:', error);

    return res.status(500).json({
      message: 'failed to get foods',
    });
  }
};

const getPopularFoods = async (req, res) => {
  try {
    const foods = await foodModel.getPopularFoods();

    return res.json({
      foods,
    });
  } catch (error) {
    console.error('get popular foods error:', error);

    return res.status(500).json({
      message: 'failed to get popular foods',
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, name, description, price } = req.body;

    if (!categoryId || !name || !price) {
      return res.status(400).json({
        message: 'category, name and price are required',
      });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const food = await foodModel.updateFood(
      id,
      categoryId,
      name,
      description,
      price,
      imageUrl,
    );

    return res.json({
      message: 'food updated successfully',
      food,
    });
  } catch (error) {
    console.error('update food error:', error);

    return res.status(500).json({
      message: 'failed to update food',
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    await foodModel.deleteFood(id);

    return res.json({
      message: 'food deleted successfully',
    });
  } catch (error) {
    console.error('delete food error:', error);

    return res.status(500).json({
      message: 'failed to delete food',
    });
  }
};

module.exports = {
  addFood,
  getFoods,
  getPopularFoods,
  updateFood,
  deleteFood,
};
