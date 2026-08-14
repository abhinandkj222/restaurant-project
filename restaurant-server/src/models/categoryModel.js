const db = require('../config/database');

const getCategories = async () => {
  return db.any(`
    SELECT id, name
    FROM categories
    ORDER BY name ASC
  `);
};

const createCategory = async (name) => {
  return db.one(
    `insert into categories
      (name)
     values
      ($1)
     returning *`,
    [name],
  );
};
const updateCategory = async (id, name) => {
  return db.one(
    `update categories
     set name = $1
     where id = $2
     returning *`,
    [name, id],
  );
};

const deleteCategory = async (id) => {
  return db.result(
    `delete from categories
     where id = $1`,
    [id],
  );
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
