const offerModel = require('../models/offerModel');

const createOffer = async (req, res) => {
  try {
    const { title, description, discount, couponCode, buttonText, isActive } =
      req.body;

    if (!title) {
      return res.status(400).json({
        message: 'title is required',
      });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (isActive === true || isActive === 'true') {
      await offerModel.deactivateAllOffers();
    }

    const offer = await offerModel.createOffer(
      title,
      description,
      discount || 0,
      couponCode || null,
      imageUrl,
      buttonText || 'order now',
      isActive === true || isActive === 'true',
    );

    return res.status(201).json({
      message: 'offer created successfully',
      offer,
    });
  } catch (error) {
    console.error('create offer error:', error);

    return res.status(500).json({
      message: 'failed to create offer',
    });
  }
};

const getOffers = async (req, res) => {
  try {
    const offers = await offerModel.getOffers();

    return res.json({
      offers,
    });
  } catch (error) {
    console.error('get offers error:', error);

    return res.status(500).json({
      message: 'failed to get offers',
    });
  }
};

const getActiveOffer = async (req, res) => {
  try {
    const offer = await offerModel.getActiveOffer();

    return res.json({
      offer,
    });
  } catch (error) {
    console.error('get active offer error:', error);

    return res.status(500).json({
      message: 'failed to get active offer',
    });
  }
};

const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, discount, couponCode, buttonText, isActive } =
      req.body;

    if (!title) {
      return res.status(400).json({
        message: 'title is required',
      });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (isActive === true || isActive === 'true') {
      await offerModel.deactivateAllOffers();
    }

    const offer = await offerModel.updateOffer(
      id,
      title,
      description,
      discount || 0,
      couponCode || null,
      imageUrl,
      buttonText || 'order now',
      isActive === true || isActive === 'true',
    );

    return res.json({
      message: 'offer updated successfully',
      offer,
    });
  } catch (error) {
    console.error('update offer error:', error);

    return res.status(500).json({
      message: 'failed to update offer',
    });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    await offerModel.deleteOffer(id);

    return res.json({
      message: 'offer deleted successfully',
    });
  } catch (error) {
    console.error('delete offer error:', error);

    return res.status(500).json({
      message: 'failed to delete offer',
    });
  }
};

module.exports = {
  createOffer,
  getOffers,
  getActiveOffer,
  updateOffer,
  deleteOffer,
};
