const db = require('../config/database');

const createOffer = async (
  title,
  description,
  discount,
  couponCode,
  imageUrl,
  buttonText,
  isActive,
) => {
  return db.one(
    `
      insert into offers
      (
        title,
        description,
        discount,
        coupon_code,
        image_url,
        button_text,
        is_active
      )
      values
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )
      returning *
    `,
    [title, description, discount, couponCode, imageUrl, buttonText, isActive],
  );
};

const getOffers = async () => {
  return db.any(`
    select
      id,
      title,
      description,
      discount,
      coupon_code,
      image_url,
      button_text,
      is_active,
      created_at
    from offers
    order by id desc
  `);
};

const getActiveOffer = async () => {
  return db.oneOrNone(`
    select
      id,
      title,
      description,
      discount,
      coupon_code,
      image_url,
      button_text,
      is_active,
      created_at
    from offers
    where is_active = true
    order by id desc
    limit 1
  `);
};

const updateOffer = async (
  id,
  title,
  description,
  discount,
  couponCode,
  imageUrl,
  buttonText,
  isActive,
) => {
  if (imageUrl) {
    return db.one(
      `
        update offers
        set
          title = $1,
          description = $2,
          discount = $3,
          coupon_code = $4,
          image_url = $5,
          button_text = $6,
          is_active = $7
        where id = $8
        returning *
      `,
      [
        title,
        description,
        discount,
        couponCode,
        imageUrl,
        buttonText,
        isActive,
        id,
      ],
    );
  }

  return db.one(
    `
      update offers
      set
        title = $1,
        description = $2,
        discount = $3,
        coupon_code = $4,
        button_text = $5,
        is_active = $6
      where id = $7
      returning *
    `,
    [title, description, discount, couponCode, buttonText, isActive, id],
  );
};

const deleteOffer = async (id) => {
  return db.none(
    `
      delete from offers
      where id = $1
    `,
    [id],
  );
};

const deactivateAllOffers = async () => {
  return db.none(`
    update offers
    set is_active = false
  `);
};

module.exports = {
  createOffer,
  getOffers,
  getActiveOffer,
  updateOffer,
  deleteOffer,
  deactivateAllOffers,
};
