import joi from 'joi';
// import { nanoid } from "nanoid";
import { User } from '../models';
import { hashPassword, comparePassword } from '../utils';
import { CustomErrorHandler, JwtService } from '../services';

export const register = async (req, res, next) => {
  const { phone_number, email, password, cpassword } = req.body;
  const registerSchema = joi.object({
    phone_number: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    cpassword: joi.ref('password'),
  });

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  try {
    const exist = await User.exists({ email: email });
    if (exist) {
      return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
    }
  } catch (err) {
    return next(err);
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({
    email,
    password: hashedPassword,
    phone_number,
    cpassword,
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
    },
  });
};

export const login = async (req, res, next) => {
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
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    const access_token = JwtService.sign({
      _id: user._id,
      secret: user.secret,
    });

    user.password = undefined;
    user.secret = undefined;

    const { _id, name, username, following, followers } = user;

    res.json({
      message: 'Login success',
      data: {
        _id,
        name,
        email,
        username,
        following,
        followers,
        access_token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const currentUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findOne({ _id: _id }).select('-password -secret -updatedAt -__v');
    if (!user) {
      return next(CustomErrorHandler.notFound());
    }

    res.json({
      messgae: 'User successfully found',
      data: user,
    });
  } catch (error) {
    return next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email, newPassword, secret } = req.body;

  const forgotPasswordSchema = joi.object({
    email: joi.string().email().required(),
    newPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    secret: joi.string().required(),
  });
  const { error } = forgotPasswordSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  try {
    const user = await User.findOne({ email, secret });
    if (!user) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    const hashedPassword = await hashPassword(newPassword);

    await User.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.json({
      message: 'Password successfully changed',
    });
  } catch (error) {
    return next(error);
  }
};

export const profileUpdate = async (req, res, next) => {
  const { _id } = req.user;
  const { password } = req.body;

  const updateSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    username: joi.string().required(),
    about: joi.string().required(),
    secret: joi.string().required(),
    password: joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

  const { error } = updateSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const hashedPassword = await hashPassword(password);

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { ...req.body, password: hashedPassword },
      { new: true },
    );

    user.password = undefined;
    user.secret = undefined;

    res.json({
      message: 'User successfully updated',
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(CustomErrorHandler.alreadyExist('Duplicate username'));
    } else {
      return next(error);
    }
  }
};
