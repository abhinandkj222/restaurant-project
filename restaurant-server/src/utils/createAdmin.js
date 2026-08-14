require('dotenv').config();

const bcrypt = require('bcrypt');

const db = require('../config/database');

const createAdmin = async () => {
  try {
    const name = 'Restaurant Admin';
    const email = 'admin@savory.com';
    const password = 'Admin@12345';

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.none(
      `insert into admins (name, email, password)
       values ($1, $2, $3)`,
      [name, email, hashedPassword],
    );

    console.log('✅ admin created successfully');
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ failed to create admin');
    console.error(error.message);

    process.exit(1);
  }
};

createAdmin();
