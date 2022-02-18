import joi from 'joi';
import { ORDER_STATUSES, USER_TYPES } from '../constants';
import { validatePagination } from './common';

export const createOrderValidate = {
  products: joi
    .array()
    .items(
      joi.object({
        product_id: joi.string().required(),
        price: joi.number().required(),
        quantity: joi.number().required(),
      }),
    )
    .required(),
  deliveryAddress: joi.string().required(),
  delivery_charges: joi.string().required(),
  special_note: joi.string().optional(),
};

export const getOrderValidate = {
  status: joi.string().optional(),
  order_id: joi.string().optional(),
  ...validatePagination,
};
export const validateChangeOrderStatus = {
  status: joi
    .string()
    .valid(...Object.keys(ORDER_STATUSES))
    .required(),
  type: joi
    .string()
    .valid(...Object.keys(USER_TYPES))
    .optional(),
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
  driver_rating: joi.number().optional(),
};
