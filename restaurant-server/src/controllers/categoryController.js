const categoryModel = require('../models/categoryModel');

const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getCategories();

    return res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error('get categories error:', error);

    return res.status(500).json({
      message: 'Failed to get categories',
    });
  }
};
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: 'category name is required',
      });
    }

    const category = await categoryModel.createCategory(name.trim());

    return res.status(201).json({
      message: 'category added successfully',
      category,
    });
  } catch (error) {
    console.error('add category error:', error);

    return res.status(500).json({
      message: 'failed to add category',
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: 'category name is required',
      });
    }

    const category = await categoryModel.updateCategory(id, name.trim());

    return res.json({
      message: 'category updated successfully',
      category,
    });
  } catch (error) {
    console.error('update category error:', error);

    return res.status(500).json({
      message: 'failed to update category',
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categoryModel.deleteCategory(id);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'category not found',
      });
    }

    return res.json({
      message: 'category deleted successfully',
    });
  } catch (error) {
    console.error('delete category error:', error);

    return res.status(500).json({
      message: 'failed to delete category',
    });
  }
};



module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
