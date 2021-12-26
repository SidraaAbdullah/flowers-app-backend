import joi from 'joi';

export const createProductValidate = {
  name: joi.string().required(),
  created_by: joi.string().required(),
  category_id: joi.string().optional(),
  image: joi.string().optional(),
};

export const deleteProductValidate = {
  id: joi.string().required(),
};