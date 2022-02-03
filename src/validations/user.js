import joi from 'joi';

export const validateCreateDeliveryAddress = {
  address: joi.string().required(),
};
export const validatePatchDeliveryUpdate = {
  delivery_address_id: joi.string().required(),
  primary: joi.boolean().optional(),
};