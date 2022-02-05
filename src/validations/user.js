import joi from 'joi';

export const validateCreateDeliveryAddress = {
  address: joi.string().required(),
};
export const validatePatchDeliveryUpdate = {
  delivery_address_id: joi.string().required(),
  primary: joi.boolean().optional(),
};
export const validatePatchUser = {
  email: joi.string().optional(),
  name: joi.string().optional(),
  phone_number: joi.string().optional(),
};
export const validateChangePassword = {
  newPassword: joi.string().required(),
  password: joi.string().required(),
};
