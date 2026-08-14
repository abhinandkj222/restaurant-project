const slotModel = require('../models/slotModel');

const getSlots = async (req, res) => {
  try {
    const slots = await slotModel.getSlots();

    return res.json({
      slots,
    });
  } catch (error) {
    console.error('get slots error:', error);

    return res.status(500).json({
      message: 'failed to get slots',
    });
  }
};

const getActiveSlots = async (req, res) => {
  try {
    const slots = await slotModel.getActiveSlots();

    return res.json({
      slots,
    });
  } catch (error) {
    console.error('get active slots error:', error);

    return res.status(500).json({
      message: 'failed to get active slots',
    });
  }
};

const createSlot = async (req, res) => {
  try {
    const { slotTime } = req.body;

    if (!slotTime) {
      return res.status(400).json({
        message: 'slot time is required',
      });
    }

    const slot = await slotModel.createSlot(slotTime);

    return res.status(201).json({
      message: 'slot created successfully',
      slot,
    });
  } catch (error) {
    console.error('create slot error:', error);

    return res.status(500).json({
      message: 'failed to create slot',
    });
  }
};

const updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { slotTime, isActive } = req.body;

    if (!slotTime || typeof isActive !== 'boolean') {
      return res.status(400).json({
        message: 'slot time and active status are required',
      });
    }

    const slot = await slotModel.updateSlot(id, slotTime, isActive);

    return res.json({
      message: 'slot updated successfully',
      slot,
    });
  } catch (error) {
    console.error('update slot error:', error);

    return res.status(500).json({
      message: 'failed to update slot',
    });
  }
};

const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await slotModel.deleteSlot(id);

    if (!slot) {
      return res.status(404).json({
        message: 'slot not found',
      });
    }

    return res.json({
      message: 'slot deleted successfully',
      slot,
    });
  } catch (error) {
    console.error('delete slot error:', error);

    return res.status(500).json({
      message: 'failed to delete slot',
    });
  }
};

module.exports = {
  getSlots,
  getActiveSlots,
  createSlot,
  updateSlot,
  deleteSlot,
};
