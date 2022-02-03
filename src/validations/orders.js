import joi from 'joi';

export const createOrderValidate = {
  products: joi.array().required(),
  deliveryAddress: joi.string().required(),
};
