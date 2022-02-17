import Joi from 'joi';

export const patchUpdateDriverValidate = {
  email: Joi.string().optional(),
  name: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  availableForDelivery: Joi.boolean().optional(),
  expo_notification_token: Joi.string().optional(),
};

export const approveDriverValidate = {
  driver_id: Joi.string().required(),
};
