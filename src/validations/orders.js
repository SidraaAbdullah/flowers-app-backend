import joi from 'joi';
import { ORDER_STATUSES } from '../constants';
import { validatePagination } from './common';

export const createOrderValidate = {
  products: joi
    .array()
    .items(
      joi.object({
        product_id: joi.string().required(),
        price: joi.number().optional(),
        quantity: joi.number().optional(),
      }),
    )
    .required(),
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

export const validateRateOrderedProducts = {
  productsRating: joi
    .array()
    .items(
      joi.object({
        product_id: joi.string().required(),
        rating: joi.number().required(),
      }),
    )
    .required(),
  comment: joi.string().optional(),
};
