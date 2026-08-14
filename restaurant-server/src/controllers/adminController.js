const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { findAdminByEmail } = require('../models/adminModel');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'email and password are required',
      });
    }

    const admin = await findAdminByEmail(email);

    if (!admin) {
      return res.status(401).json({
        message: 'invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'invalid email or password',
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: 'admin',
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );

    return res.status(200).json({
      message: 'login successful',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error('admin login error:', error);

    return res.status(500).json({
      message: 'internal server error',
    });
  }
};

module.exports = {
  loginAdmin,
};
