import Joi from 'joi';

export const patchUpdateDriverValidate = {
  email: Joi.string().optional(),
  name: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  availableForDelivery: Joi.boolean().optional(),
};
