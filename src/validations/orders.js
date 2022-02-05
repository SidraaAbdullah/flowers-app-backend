import joi from 'joi';
import { ORDER_STATUSES } from '../constants';
import { validatePagination } from './common';

export const createOrderValidate = {
  products: joi.array().required(),
  deliveryAddress: joi.string().required(),
};

export const getOrderValidate = {
  status: joi.string().optional(),
  ...validatePagination,
};
export const validateChangeOrderStatus = {
  status: joi
    .string()
    .valid(...Object.keys(ORDER_STATUSES))
    .required(),
};
