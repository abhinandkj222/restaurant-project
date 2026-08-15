const express = require('express');

const {
  subscribeNewsletter,
  getNewsletterSubscribers,
} = require('../controllers/newsletterController');

const router = express.Router();

router.post('/', subscribeNewsletter);

router.get('/admin', getNewsletterSubscribers);

module.exports = router;
