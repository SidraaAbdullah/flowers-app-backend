import joi from 'joi';
// import { nanoid } from "nanoid";
import { Admin } from '../models';
import { hashPassword, comparePassword } from '../utils';
import { CustomErrorHandler, JwtService } from '../services';

export const AdminRegister = async (req, res, next) => {
  const {name, email, password} = req.body;
  const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    cpassword: joi.ref('password'),
  });

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  try {
    const exist = await Admin.exists({ email: email });
    if (exist) {
      return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
    }
  } catch (err) {
    return next(err);
  }

  const hashedPassword = await hashPassword(password);

  const user = new Admin({
    name,
    email,
    password: hashedPassword,
  });
  let result;
  let access_token;
  try {
    result = await user.save();
    access_token = JwtService.sign({ _id: result._id });
  } catch (error) {
    return next(error);
  }

  res.json({
    message: 'User successfully registered',
    data: {
      access_token,
      id: result._id,
      email,
      name
    },
  });
};

export const AdminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  try {
    const user = await Admin.findOne({ email: email });
    if (!user) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return next(CustomErrorHandler.wrongCredentials());
    }
    const { _id, name } = user;

    const access_token = JwtService.sign({
      _id,
    });

    res.json({
      message: 'Login success',
      data: {
        _id,
        name,
        email,
        access_token,
      },
    });
  } catch (error) {
    return next(error);
  }
};