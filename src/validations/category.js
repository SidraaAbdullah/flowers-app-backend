import joi from 'joi';

export const createCategoryValidate = {
  name: joi.string().required(),
  created_by: joi.string().required(),
  image: joi.string().optional(),
  description: joi.string().optional().allow(null),
};

export const deleteCategoryValidate = {
  id: joi.string().required(),
};

export const getCategoryValidate = {
  search: joi.string().optional(),
};
