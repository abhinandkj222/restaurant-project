const orderModel = require('../models/orderModel');
const PDFDocument = require('pdfkit');

const createOrder = async (req, res) => {
  try {
    console.log('create order auth:', {
      user: req.user,
      authorization: req.headers.authorization ? 'present' : 'missing',
    });
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

const uploadBill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        message: 'PDF bill is required',
      });
    }

    const order = await orderModel.uploadBill(
      id,
      req.file.originalname,
      req.file.buffer,
    );

    if (!order) {
      return res.status(404).json({
        message: 'order not found',
      });
    }

    return res.json({
      message: 'bill uploaded successfully',
      order,
    });
  } catch (error) {
    console.error('upload bill error:', error);

    return res.status(500).json({
      message: 'failed to upload bill',
    });
  }
};

const getBill = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const bill = await orderModel.getBill(id, userId);

    if (!bill) {
      return res.status(404).json({
        message: 'bill not found',
      });
    }

    res.setHeader('Content-Type', 'application/pdf');

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${bill.bill_pdf_name || `order-${id}-bill.pdf`}"`,
    );

    return res.send(bill.bill_pdf);
  } catch (error) {
    console.error('get bill error:', error);

    return res.status(500).json({
      message: 'failed to download bill',
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

const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const allowedPaymentStatuses = ['pending', 'paid'];

    if (!allowedPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        message: 'invalid payment status',
      });
    }

    const order = await orderModel.getAdminOrderById(id);

    if (!order) {
      return res.status(404).json({
        message: 'order not found',
      });
    }

    if (order.payment_method !== 'cash') {
      return res.status(400).json({
        message: 'payment status can only be manually updated for cash orders',
      });
    }

    const updatedOrder = await orderModel.updatePaymentStatus(
      id,
      paymentStatus,
    );

    return res.json({
      message: 'payment status updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('update payment status error:', error);

    return res.status(500).json({
      message: 'failed to update payment status',
    });
  }
};
const printAllOrders = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({
        message: 'order ids are required',
      });
    }

    const selectedOrderIds = ids
      .split(',')
      .map((id) => Number(id.trim()))
      .filter((id) => Number.isInteger(id) && id > 0);

    if (selectedOrderIds.length === 0) {
      return res.status(400).json({
        message: 'valid order ids are required',
      });
    }

    const orders = await orderModel.getAllOrdersForPdf(selectedOrderIds);

    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true,
    });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="savory-all-orders.pdf"',
    );

    doc.pipe(res);

    const orange = '#f97316';
    const cream = '#fff7ed';
    const dark = '#1f2937';
    const gray = '#6b7280';
    const lightGray = '#e5e7eb';
    const green = '#16a34a';
    const red = '#dc2626';

    const formatDateTime = (dateTime) => {
      if (!dateTime) {
        return '-';
      }

      const date = new Date(dateTime);

      if (Number.isNaN(date.getTime())) {
        return '-';
      }

      return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    };

    const formatStatus = (status) => {
      if (!status) {
        return '-';
      }

      return status
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    const formatPaymentMethod = (method) => {
      if (method === 'online') {
        return 'Online';
      }

      if (method === 'cash') {
        return 'Cash';
      }

      return '-';
    };

    const addHeader = () => {
      doc.rect(0, 0, doc.page.width, 105).fill(cream);

      doc
        .fillColor(orange)
        .fontSize(30)
        .font('Helvetica-Bold')
        .text('SAVORY', 40, 25);

      doc
        .fillColor(gray)
        .fontSize(9)
        .font('Helvetica')
        .text('P R E M I U M   R E S T A U R A N T', 42, 59);

      doc
        .fillColor(dark)
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('ALL ORDERS REPORT', 40, 82);

      doc
        .moveTo(40, 115)
        .lineTo(doc.page.width - 40, 115)
        .strokeColor(orange)
        .lineWidth(2)
        .stroke();

      doc.y = 135;
    };

    const addFooter = () => {
      const range = doc.bufferedPageRange();

      for (let i = range.start; i < range.start + range.count; i += 1) {
        doc.switchToPage(i);

        doc
          .fontSize(8)
          .font('Helvetica')
          .fillColor(gray)
          .text(
            `Savory Premium Restaurant  •  Page ${i + 1} of ${range.count}`,
            40,
            doc.page.height - 55,
            {
              width: doc.page.width - 80,
              align: 'center',
              lineBreak: false,
            },
          );
      }
    };
    addHeader();

    if (orders.length === 0) {
      doc
        .fillColor(gray)
        .fontSize(14)
        .font('Helvetica')
        .text('No orders found.', {
          align: 'center',
        });

      addFooter();

      doc.end();

      return;
    }

    doc
      .fillColor(gray)
      .fontSize(9)
      .font('Helvetica')
      .text(`Generated: ${formatDateTime(new Date())}`);

    doc.moveDown(1);

    orders.forEach((order, index) => {
      const orderStartY = doc.y;

      const estimatedHeight = 245 + (order.items?.length || 1) * 24;

      if (orderStartY + estimatedHeight > doc.page.height - 60) {
        doc.addPage();
        addHeader();
      }

      const startX = 40;
      const contentWidth = doc.page.width - 80;

      doc.roundedRect(startX, doc.y, contentWidth, 28, 6).fill(cream);

      doc
        .fillColor(orange)
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(`ORDER #${order.id}`, startX + 12, doc.y + 7);

      doc
        .fillColor(gray)
        .fontSize(8)
        .font('Helvetica')
        .text(formatDateTime(order.created_at), startX + 12, doc.y + 10, {
          width: contentWidth - 24,
          align: 'right',
        });

      doc.y += 42;

      // Customer details

      doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('CUSTOMER');

      doc.moveDown(0.4);

      doc
        .fillColor(dark)
        .fontSize(10)
        .font('Helvetica')
        .text(`Name: ${order.customer_name || '-'}`);

      doc.text(`Phone: ${order.customer_phone || '-'}`);

      if (order.customer_email) {
        doc.text(`Email: ${order.customer_email}`);
      }

      doc.moveDown(0.7);

      // Delivery

      doc.fillColor(dark).fontSize(10).font('Helvetica-Bold').text('DELIVERY');

      doc.moveDown(0.4);

      doc
        .fillColor(dark)
        .fontSize(10)
        .font('Helvetica')
        .text(`Address: ${order.delivery_address || '-'}`);

      doc.text(
        `City: ${order.delivery_city || '-'}  •  PIN: ${
          order.delivery_pincode || '-'
        }`,
      );

      doc.moveDown(0.7);

      // Payment and status

      doc
        .fillColor(dark)
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('PAYMENT & STATUS');

      doc.moveDown(0.4);

      doc
        .fillColor(dark)
        .fontSize(10)
        .font('Helvetica')
        .text(
          `Payment: ${formatPaymentMethod(
            order.payment_method,
          )}  •  ${formatStatus(order.payment_status)}`,
        );

      const statusColor =
        order.status === 'delivered'
          ? green
          : order.status === 'cancelled'
            ? red
            : orange;

      doc
        .fillColor(statusColor)
        .font('Helvetica-Bold')
        .text(`Order Status: ${formatStatus(order.status)}`);

      doc.moveDown(0.9);

      // Items heading

      doc
        .fillColor(dark)
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('ORDER ITEMS');

      doc.moveDown(0.4);

      // Items table header

      const tableTop = doc.y;

      doc.rect(startX, tableTop, contentWidth, 23).fill(cream);

      doc
        .fillColor(dark)
        .fontSize(8)
        .font('Helvetica-Bold')
        .text('ITEM', startX + 8, tableTop + 7);

      doc.text('QTY', startX + 330, tableTop + 7, {
        width: 40,
        align: 'center',
      });

      doc.text('PRICE', startX + 380, tableTop + 7, {
        width: 65,
        align: 'right',
      });

      doc.text('TOTAL', startX + 450, tableTop + 7, {
        width: 65,
        align: 'right',
      });

      doc.y = tableTop + 28;

      const items = Array.isArray(order.items) ? order.items : [];

      if (items.length === 0) {
        doc
          .fillColor(gray)
          .fontSize(9)
          .font('Helvetica')
          .text('No items found.');

        doc.moveDown(0.5);
      } else {
        items.forEach((item, itemIndex) => {
          const itemY = doc.y;

          if (itemIndex % 2 === 0) {
            doc.rect(startX, itemY - 3, contentWidth, 21).fill('#fafafa');
          }

          const itemName = item.name || `Food #${item.food_id}`;

          const quantity = Number(item.quantity) || 0;
          const price = Number(item.price) || 0;
          const itemTotal = quantity * price;

          doc
            .fillColor(dark)
            .fontSize(9)
            .font('Helvetica')
            .text(itemName, startX + 8, itemY + 2, {
              width: 300,
              ellipsis: true,
            });

          doc.text(String(quantity), startX + 330, itemY + 2, {
            width: 40,
            align: 'center',
          });

          doc.text(`₹${price.toFixed(2)}`, startX + 380, itemY + 2, {
            width: 65,
            align: 'right',
          });

          doc.text(`₹${itemTotal.toFixed(2)}`, startX + 450, itemY + 2, {
            width: 65,
            align: 'right',
          });

          doc.y = itemY + 22;
        });
      }

      doc.moveDown(0.5);

      // Total

      const totalY = doc.y;

      doc
        .moveTo(startX, totalY)
        .lineTo(startX + contentWidth, totalY)
        .strokeColor(lightGray)
        .lineWidth(1)
        .stroke();

      doc.y = totalY + 10;

      doc
        .fillColor(dark)
        .fontSize(11)
        .font('Helvetica-Bold')
        .text('ORDER TOTAL', startX + 8, doc.y);

      doc
        .fillColor(orange)
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(
          `₹${Number(order.total_amount || 0).toFixed(2)}`,
          startX + 380,
          doc.y - 2,
          {
            width: 135,
            align: 'right',
          },
        );

      doc.y += 30;

      if (index !== orders.length - 1) {
        doc
          .moveTo(startX, doc.y)
          .lineTo(startX + contentWidth, doc.y)
          .strokeColor(lightGray)
          .lineWidth(1)
          .stroke();

        doc.y += 20;
      }
    });

    addFooter();

    doc.end();
  } catch (error) {
    console.error('print all orders error:', error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: 'failed to generate orders pdf',
      });
    }

    return null;
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
  uploadBill,
  getBill,
  updateOrderStatus,
  updatePaymentStatus,
  printAllOrders,
};
