const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const foodRoutes = require('./routes/foodRoutes');
const path = require('path');

const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const offerRoutes = require('./routes/offerRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRoutes);
app.use('/api/admin/foods', foodRoutes);
app.use('/api/foods', foodRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/categories', categoryRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/chat', chatRoutes);

app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Restaurant API Running 🚀',
  });
});

module.exports = app;
