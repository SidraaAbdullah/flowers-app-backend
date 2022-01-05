import joi from 'joi';

export const registerSchema = joi.object({
  name: joi.string().required(),
  phone_number: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  cpassword: joi.ref('password'),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
