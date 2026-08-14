const express = require('express');

const {
  addFood,
  getFoods,
  getPopularFoods,
  updateFood,
  deleteFood,
} = require('../controllers/foodController');

const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', upload.single('image'), addFood);

router.put('/:id', upload.single('image'), updateFood);

router.delete('/:id', deleteFood);

router.get('/popular', getPopularFoods);

router.get('/', getFoods);

module.exports = router;
