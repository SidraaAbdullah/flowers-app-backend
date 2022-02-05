import Joi from 'joi';

export const validatePagination = {
  sort_by: Joi.string().optional(),
  page_no: Joi.string().optional(),
  records_per_page: Joi.string().optional(),
};
