import joi from 'joi';
import { validatePagination } from './common';

export const createProductValidate = {
  name: joi.string().required(),
  price: joi.string().required(),
  category_id: joi.string().optional(),
  image: joi.string().optional().allow(''),
  status: joi.string().optional(),
  description: joi.string().optional(),
  quantity: joi.number().optional(),
};

export const patchUpdateProductValidate = {
  product_id: joi.string().required(),
  name: joi.string().optional(),
  price: joi.string().optional(),
  category_id: joi.string().optional(),
  image: joi.string().optional().allow(''),
  status: joi.string().optional(),
  description: joi.string().optional(),
  quantity: joi.number().optional(),
};

export const deleteProductValidate = {
  id: joi.string().required(),
};
export const getProductValidate = {
  category_id: joi.string().optional(),
  search: joi.string().optional(),
  ...validatePagination,
};
