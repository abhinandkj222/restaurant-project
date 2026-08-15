const db = require('../config/database');

const createFood = async (categoryId, name, description, price, imageUrl) => {
  return db.one(
    `insert into foods
      (category_id, name, description, price, image_url)
     values
      ($1, $2, $3, $4, $5)
     returning *`,
    [categoryId, name, description, price, imageUrl],
  );
};

const getFoods = async () => {
  return db.any(`
    select
      f.id,
      f.name,
      f.description,
      f.price,
      f.image_url,
      f.is_available,
      f.category_id,
      c.name as category,

      coalesce(round(avg(fr.rating), 1), 0) as rating,
      count(fr.id) as rating_count

    from foods f

    left join categories c
      on f.category_id = c.id

    left join food_ratings fr
      on f.id = fr.food_id

    group by
      f.id,
      c.name

    order by f.id desc
  `);
};

const getPopularFoods = async () => {
  return db.any(
    `
    select
      f.id,
      f.name,
      f.description,
      f.price,
      f.image_url,
      f.is_available,
      f.category_id,
      c.name as category,
      coalesce(r.rating, 0) as rating,
      coalesce(r.rating_count, 0) as rating_count,
      s.total_sold
    from foods f

    join (
      select
        oi.food_id,
        sum(oi.quantity) as total_sold
      from order_items oi
      join orders o
        on oi.order_id = o.id
      where o.status != 'cancelled'
      group by oi.food_id
    ) s
      on f.id = s.food_id

    left join (
      select
        fr.food_id,
        round(avg(fr.rating), 1) as rating,
        count(fr.id) as rating_count
      from food_ratings fr
      group by fr.food_id
    ) r
      on f.id = r.food_id

    left join categories c
      on f.category_id = c.id

    where f.is_available = true

    order by s.total_sold desc
    limit 4
    `,
  );
};

const updateFood = async (
  id,
  categoryId,
  name,
  description,
  price,
  imageUrl,
) => {
  if (imageUrl) {
    return db.one(
      `update foods
       set
         category_id = $1,
         name = $2,
         description = $3,
         price = $4,
         image_url = $5
       where id = $6
       returning *`,
      [categoryId, name, description, price, imageUrl, id],
    );
  }

  return db.one(
    `update foods
     set
       category_id = $1,
       name = $2,
       description = $3,
       price = $4
     where id = $5
     returning *`,
    [categoryId, name, description, price, id],
  );
};

const deleteFood = async (id) => {
  return db.none(
    `delete from foods
     where id = $1`,
    [id],
  );
};

module.exports = {
  createFood,
  getFoods,
  getPopularFoods,
  updateFood,
  deleteFood,
};
