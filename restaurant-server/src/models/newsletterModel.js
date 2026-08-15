const db = require('../config/database');

const createSubscriber = async (email) => {
  return db.one(
    `
    insert into newsletter_subscribers
    (
      email
    )
    values
    (
      $1
    )
    returning *
    `,
    [email],
  );
};

const getAllSubscribers = async () => {
  return db.any(
    `
    select
      id,
      email,
      created_at
    from newsletter_subscribers
    order by id desc
    `,
  );
};

module.exports = {
  createSubscriber,
  getAllSubscribers,
};
