const db = require('../config/database');

const createContact = async (name, email, subject, message) => {
  return db.one(
    `
    insert into contacts
    (
      name,
      email,
      subject,
      message
    )
    values
    (
      $1,
      $2,
      $3,
      $4
    )
    returning *
    `,
    [name, email, subject, message],
  );
};

const getAllContacts = async () => {
  return db.any(
    `
    select
      id,
      name,
      email,
      subject,
      message,
      created_at
    from contacts
    order by id desc
    `,
  );
};

const getContactById = async (id) => {
  return db.oneOrNone(
    `
    select
      id,
      name,
      email,
      subject,
      message,
      created_at
    from contacts
    where id = $1
    `,
    [id],
  );
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
};
