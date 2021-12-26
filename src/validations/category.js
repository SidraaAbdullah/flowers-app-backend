import joi from 'joi';

export const createCategoryValidate = {
  name: joi.string().required(),
  created_by: joi.string().required(),
  image: joi.string().optional(),
};

export const deleteCategoryValidate = {
  id: joi.string().required(),
};
