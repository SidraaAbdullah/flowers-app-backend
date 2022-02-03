import joi from 'joi';

export const createOrderValidate = {
  product_id: joi.array().required(),
};
