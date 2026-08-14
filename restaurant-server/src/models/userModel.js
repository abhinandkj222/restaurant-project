const db = require('../config/database');

const createUser = async (name, email, password, phone) => {
  return db.one(
    `insert into users
    (
      name,
      email,
      password,
      phone
    )
    values
    (
      $1,
      $2,
      $3,
      $4
    )
    returning id, name, email, phone, created_at`,
    [name, email, password, phone],
  );
};

const createGoogleUser = async (name, email, googleId) => {
  return db.one(
    `insert into users
    (
      name,
      email,
      google_id
    )
    values
    (
      $1,
      $2,
      $3
    )
    returning id, name, email, phone, google_id, created_at`,
    [name, email, googleId],
  );
};

const getUserByEmail = async (email) => {
  return db.oneOrNone(
    `select
      id,
      name,
      email,
      password,
      phone,
      google_id,
      created_at
    from users
    where email = $1`,
    [email],
  );
};

const getUserByGoogleId = async (googleId) => {
  return db.oneOrNone(
    `select
      id,
      name,
      email,
      phone,
      google_id,
      created_at
    from users
    where google_id = $1`,
    [googleId],
  );
};

const getUserById = async (id) => {
  return db.oneOrNone(
    `select
      id,
      name,
      email,
      phone,
      google_id,
      created_at
    from users
    where id = $1`,
    [id],
  );
};
const updateGoogleId = async (userId, googleId) => {
  return db.one(
    `
    update users
    set google_id = $1
    where id = $2
    returning id, name, email, phone, google_id, created_at
    `,
    [googleId, userId],
  );
};

module.exports = {
  createUser,
  createGoogleUser,
  getUserByEmail,
  getUserByGoogleId,
  getUserById,
  updateGoogleId,
};
