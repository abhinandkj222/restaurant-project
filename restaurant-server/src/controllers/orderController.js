const orderModel = require('../models/orderModel');

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      deliveryCity,
      deliveryPincode,
      paymentMethod,
      paymentStatus,
      totalAmount,
      items,
    } = req.body;

    if (
      !customerName ||
      !customerPhone ||
      !deliveryAddress ||
      !deliveryCity ||
      !deliveryPincode ||
      !paymentMethod ||
      !paymentStatus ||
      totalAmount === undefined ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: 'customer, delivery, payment details and items are required',
      });
    }

    const allowedPaymentMethods = ['cash', 'online'];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        message: 'invalid payment method',
      });
    }

    const allowedPaymentStatuses = ['pending', 'paid', 'failed'];

    if (!allowedPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        message: 'invalid payment status',
      });
    }

    /*
     * Logged-in user:
     * req.user.id
     *
     * Guest:
     * null
     */
    const userId = req.user ? req.user.id : null;

    const order = await orderModel.createOrder(
      userId,
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      deliveryCity,
      deliveryPincode,
      paymentMethod,
      paymentStatus,
      totalAmount,
      items,
    );

    return res.status(201).json({
      message: 'order created successfully',
      order,
    });
  } catch (error) {
    console.error('create order error:', error);

    return res.status(500).json({
      message: 'failed to create order',
    });
  }
};

/*
 * Get only the logged-in user's orders
 */
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel.getOrders(userId);

    return res.json({
      orders,
    });
  } catch (error) {
    console.error('get orders error:', error);

    return res.status(500).json({
      message: 'failed to get orders',
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderModel.getOrdersByUserId(req.user.id);

    return res.json({
      orders,
    });
  } catch (error) {
    console.error('get my orders error:', error);

    return res.status(500).json({
      message: 'failed to get your orders',
    });
  }
};

/*
 * Get one order belonging to logged-in user
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await orderModel.getOrderById(id, userId);

    return res.json({
      order,
    });
  } catch (error) {
    console.error('get order error:', error);

    if (error.message === 'order not found') {
      return res.status(404).json({
        message: 'order not found',
      });
    }

    return res.status(500).json({
      message: 'failed to get order',
    });
  }
};

const attachGuestOrders = async (req, res) => {
  try {
    const { guestOrderTokens } = req.body;

    const userId = req.user.id;

    if (!Array.isArray(guestOrderTokens) || guestOrderTokens.length === 0) {
      return res.status(400).json({
        message: 'guest order tokens are required',
      });
    }

    const orders = await orderModel.attachGuestOrders(guestOrderTokens, userId);

    return res.json({
      message: 'guest orders attached successfully',
      orders,
    });
  } catch (error) {
    console.error('attach guest orders error:', error);

    return res.status(500).json({
      message: 'failed to attach guest orders',
    });
  }
};

const getAdminOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();

    return res.json({
      orders,
    });
  } catch (error) {
    console.error('get admin orders error:', error);

    return res.status(500).json({
      message: 'failed to get admin orders',
    });
  }
};

const getAdminOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.getAdminOrderById(id);

    return res.json({
      order,
    });
  } catch (error) {
    console.error('get admin order error:', error);

    if (error.message === 'order not found') {
      return res.status(404).json({
        message: 'order not found',
      });
    }

    return res.status(500).json({
      message: 'failed to get order',
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      'pending',
      'preparing',
      'out_for_delivery',
      'delivered',
      'cancelled',
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'invalid order status',
      });
    }

    const order = await orderModel.updateOrderStatus(id, status);

    if (!order) {
      return res.status(404).json({
        message: 'order not found',
      });
    }

    return res.json({
      message: 'order status updated successfully',
      order,
    });
  } catch (error) {
    console.error('update order status error:', error);

    return res.status(500).json({
      message: 'failed to update order status',
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  attachGuestOrders,
  getAdminOrders,
  getAdminOrderById,
  updateOrderStatus,
};
