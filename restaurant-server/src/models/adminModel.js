const db = require('../config/database');

const findAdminByEmail = async (email) => {
  return db.oneOrNone('select * from admins where email = $1', [email]);
};

module.exports = {
  findAdminByEmail,
};
