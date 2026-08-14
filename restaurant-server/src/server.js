require('dotenv').config();

const app = require('./app');
const db = require('./config/database');

const PORT = process.env.PORT || 5000;

db.one('SELECT 1')
  .then(() => {
    console.log('✅ PostgreSQL Connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database Connection Failed');
    console.error(error.message);
  });
