import joi from 'joi';

export const validateCreateDeliveryAddress = {
  address: joi.string().required(),
};
