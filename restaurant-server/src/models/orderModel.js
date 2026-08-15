const db = require('../config/database');
const crypto = require('crypto');

const createOrder = async (
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
) => {
  return db.tx(async (transaction) => {
    const guestToken = userId ? null : crypto.randomUUID();

    const order = await transaction.one(
      `
      insert into orders
      (
        user_id,
        customer_name,
        guest_order_token,
        customer_phone,
        customer_email,
        delivery_address,
        delivery_city,
        delivery_pincode,
        payment_method,
        payment_status,
        total_amount,
        status
      )
      values
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12
      )
      returning *
      `,
      [
        userId,
        customerName,
        guestToken,
        customerPhone,
        customerEmail || null,
        deliveryAddress,
        deliveryCity,
        deliveryPincode,
        paymentMethod,
        paymentStatus,
        totalAmount,
        'pending',
      ],
    );

    for (const item of items) {
      await transaction.none(
        `
        insert into order_items
        (
          order_id,
          food_id,
          quantity,
          price
        )
        values
        (
          $1,
          $2,
          $3,
          $4
        )
        `,
        [order.id, item.foodId, item.quantity, item.price],
      );
    }

    return order;
  });
};

const getOrders = async (userId) => {
  return db.any(
    `
    select
      o.id,
      o.user_id,
      o.customer_name,
      o.customer_phone,
      o.customer_email,
      o.delivery_address,
      o.delivery_city,
      o.delivery_pincode,
      o.payment_method,
      o.payment_status,
      o.total_amount,
      o.status,
      o.created_at
    from orders o
    where o.user_id = $1
    order by o.id desc
    `,
    [userId],
  );
};

const getOrdersByUserId = async (userId) => {
  return db.any(
    `
    select
      o.id,
      o.user_id,
      o.customer_name,
      o.customer_phone,
      o.customer_email,
      o.delivery_address,
      o.delivery_city,
      o.delivery_pincode,
      o.payment_method,
      o.payment_status,
      o.total_amount,
      o.status,
      o.created_at,

      coalesce(
        (
          select json_agg(
            json_build_object(
              'id', oi.id,
              'food_id', oi.food_id,
              'quantity', oi.quantity,
              'price', oi.price,
              'name', f.name,
              'image_url', f.image_url
            )
            order by oi.id
          )
          from order_items oi
          left join foods f
            on oi.food_id = f.id
          where oi.order_id = o.id
        ),
        '[]'::json
      ) as items

    from orders o
    where o.user_id = $1
    order by o.id desc
    `,
    [userId],
  );
};

const getOrderById = async (orderId, userId) => {
  const order = await db.oneOrNone(
    `
    select
      o.id,
      o.user_id,
      o.customer_name,
      o.customer_phone,
      o.customer_email,
      o.delivery_address,
      o.delivery_city,
      o.delivery_pincode,
      o.payment_method,
      o.payment_status,
      o.total_amount,
      o.status,
      o.created_at
    from orders o
    where o.id = $1
      and o.user_id = $2
    `,
    [orderId, userId],
  );

  if (!order) {
    throw new Error('order not found');
  }

  const items = await db.any(
    `
    select
      oi.id,
      oi.food_id,
      oi.quantity,
      oi.price,
      f.name
    from order_items oi
    left join foods f
      on oi.food_id = f.id
    where oi.order_id = $1
    order by oi.id asc
    `,
    [orderId],
  );

  return {
    ...order,
    items,
  };
};

const attachGuestOrder = async (guestOrderToken, userId) => {
  return db.oneOrNone(
    `
    update orders
    set user_id = $1
    where guest_order_token = $2
      and user_id is null
    returning *
    `,
    [userId, guestOrderToken],
  );
};

const getAllOrders = async () => {
  return db.any(
    `
    select
      o.id,
      o.user_id,
      o.customer_name,
      o.customer_phone,
      o.customer_email,
      o.delivery_address,
      o.delivery_city,
      o.delivery_pincode,
      o.payment_method,
      o.payment_status,
      o.total_amount,
      o.status,
      o.created_at
    from orders o
    order by o.id desc
    `,
  );
};

const getAdminOrderById = async (orderId) => {
  const order = await db.oneOrNone(
    `
    select
      o.id,
      o.user_id,
      o.customer_name,
      o.guest_order_token,
      o.customer_phone,
      o.customer_email,
      o.delivery_address,
      o.delivery_city,
      o.delivery_pincode,
      o.payment_method,
      o.payment_status,
      o.total_amount,
      o.status,
      o.created_at
    from orders o
    where o.id = $1
    `,
    [orderId],
  );

  if (!order) {
    throw new Error('order not found');
  }

  const items = await db.any(
    `
    select
      oi.id,
      oi.food_id,
      oi.quantity,
      oi.price,
      f.name
    from order_items oi
    left join foods f
      on oi.food_id = f.id
    where oi.order_id = $1
    order by oi.id asc
    `,
    [orderId],
  );

  return {
    ...order,
    items,
  };
};

const updateOrderStatus = async (orderId, status) => {
  return db.oneOrNone(
    `
    update orders
    set status = $1
    where id = $2
    returning
      id,
      user_id,
      customer_name,
      customer_phone,
      customer_email,
      delivery_address,
      delivery_city,
      delivery_pincode,
      payment_method,
      payment_status,
      total_amount,
      status,
      created_at
    `,
    [status, orderId],
  );
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersByUserId,
  getOrderById,
  attachGuestOrder,
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus,
};
