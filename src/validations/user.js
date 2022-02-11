import joi from 'joi';

export const validateCreateDeliveryAddress = {
  address: joi.string().required(),
  locationDetails: joi
    .object({
      latitude: joi.number().required(),
      longitude: joi.number().required(),
      accuracy: joi.number().optional().allow(null).allow(''),
      altitude: joi.number().optional().allow(null).allow(''),
    })
    .optional(),
  addressPaths: joi
    .object({
      city: joi.string().optional().allow('').allow(null),
      country: joi.string().optional().allow('').allow(null),
      district: joi.string().optional().allow('').allow(null),
      isoCountryCode: joi.string().optional().allow('').allow(null),
      name: joi.string().optional().allow('').allow(null),
      postalCode: joi.string().optional().allow('').allow(null),
      region: joi.string().optional().allow('').allow(null),
      street: joi.string().optional().allow('').allow(null),
      subregion: joi.string().optional().allow('').allow(null),
      timezone: joi.string().optional().allow('').allow(null),
    })
    .optional(),
};
export const validatePatchDeliveryUpdate = {
  delivery_address_id: joi.string().required(),
  primary: joi.boolean().optional(),
};
export const validatePatchUser = {
  email: joi.string().optional(),
  name: joi.string().optional(),
  phone_number: joi.string().optional(),
  expo_notification_token: joi.string().optional(),
};
export const validateChangePassword = {
  newPassword: joi.string().required(),
  password: joi.string().required(),
};
