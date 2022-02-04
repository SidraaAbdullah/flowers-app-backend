import joi from 'joi';

export const createOrderValidate = {
  products: joi.array().required(),
  deliveryAddress: joi.string().required(),
};

export const getOrderValidate = {
  status: joi.string().optional(),
};