const newsletterModel = require('../models/newsletterModel');

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'email is required',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: 'please enter a valid email address',
      });
    }

    try {
      const subscriber =
        await newsletterModel.createSubscriber(normalizedEmail);

      return res.status(201).json({
        message: 'subscribed successfully',
        subscriber,
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          message: 'this email is already subscribed',
        });
      }

      throw error;
    }
  } catch (error) {
    console.error('newsletter subscription error:', error);

    return res.status(500).json({
      message: 'failed to subscribe',
    });
  }
};

const getNewsletterSubscribers = async (req, res) => {
  try {
    const subscribers = await newsletterModel.getAllSubscribers();

    return res.json({
      subscribers,
    });
  } catch (error) {
    console.error('get newsletter subscribers error:', error);

    return res.status(500).json({
      message: 'failed to get subscribers',
    });
  }
};

module.exports = {
  subscribeNewsletter,
  getNewsletterSubscribers,
};
