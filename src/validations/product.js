import joi from 'joi';

export const createProductValidate = {
  name: joi.string().required(),
  category_id: joi.string().optional(),
  image: joi.string().optional().allow(''),
  status: joi.string().optional(),
  description: joi.string().optional(),
};

export const deleteProductValidate = {
  id: joi.string().required(),
};
export const getProductValidate = {
  category_id: joi.string().optional(),
  search: joi.string().optional(),
};
