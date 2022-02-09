import joi from 'joi';

export const validate = (schema) => (req, res, next) => {
  const Schema = joi.object(schema);

  const { error } = Schema.validate(req.body);
  if (error) {
    console.log(error);
    return next(error);
  }
  next();
};
