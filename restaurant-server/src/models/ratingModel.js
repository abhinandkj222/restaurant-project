const db = require('../config/database');

const createRating = async (userId, foodId, orderId, rating, review) => {
  // Check whether this order belongs to the logged-in user
  const order = await db.oneOrNone(
    `
    select id, status
    from orders
    where id = $1
      and user_id = $2
    `,
    [orderId, userId],
  );

  if (!order) {
    throw new Error('order not found');
  }

  // Only delivered orders can be rated
  if (order.status !== 'delivered') {
    throw new Error('order not delivered');
  }

  // Check whether the food was actually included in this order
  const orderItem = await db.oneOrNone(
    `
    select id
    from order_items
    where order_id = $1
      and food_id = $2
    `,
    [orderId, foodId],
  );

  if (!orderItem) {
    throw new Error('food was not ordered');
  }

  // Save rating
  return db.one(
    `
    insert into food_ratings
    (
      food_id,
      order_id,
      rating,
      review
    )
    values
    (
      $1,
      $2,
      $3,
      $4
    )
    on conflict (food_id, order_id)
    do update set
      rating = excluded.rating,
      review = excluded.review
    returning *
    `,
    [foodId, orderId, rating, review || null],
  );
};

const getRatingForOrderFood = async (orderId, foodId) => {
  return db.oneOrNone(
    `
    select
      id,
      food_id,
      order_id,
      rating,
      review,
      created_at
    from food_ratings
    where order_id = $1
      and food_id = $2
    `,
    [orderId, foodId],
  );
};

module.exports = {
  createRating,
  getRatingForOrderFood,
};
