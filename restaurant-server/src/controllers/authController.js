const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {
    const { credential, guestOrderTokens = [] } = req.body;
    if (!credential) {
      return res.status(400).json({
        message: 'google credential is required',
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        message: 'invalid google credential',
      });
    }

    const {
      sub: googleId,
      email,
      name,
      email_verified: emailVerified,
    } = payload;

    if (!email || !emailVerified || !googleId) {
      return res.status(401).json({
        message: 'google account information is invalid',
      });
    }

    let user = await userModel.getUserByGoogleId(googleId);

    if (!user) {
      user = await userModel.getUserByEmail(email);

      if (user) {
        user = await userModel.updateGoogleId(user.id, googleId);
      } else {
        user = await userModel.createGoogleUser(
          name || 'Google User',
          email,
          googleId,
        );
      }
    }
    if (Array.isArray(guestOrderTokens)) {
      for (const guestOrderToken of guestOrderTokens) {
        await orderModel.attachGuestOrder(guestOrderToken, user.id);
      }
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    return res.json({
      message: 'google login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        google_id: user.google_id,
      },
    });
  } catch (error) {
    console.error('google login error:', error);

    return res.status(500).json({
      message: 'failed to login with google',
    });
  }
};

module.exports = {
  googleLogin,
};
