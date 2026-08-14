const express = require('express');

const {
  createOffer,
  getOffers,
  getActiveOffer,
  updateOffer,
  deleteOffer,
} = require('../controllers/offerController');

const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', upload.single('image'), createOffer);

router.get('/', getOffers);

router.get('/active', getActiveOffer);

router.put('/:id', upload.single('image'), updateOffer);

router.delete('/:id', deleteOffer);

module.exports = router;
