// import joi from 'joi';
// import { nanoid } from "nanoid";
import { User } from '../models';
import { hashPassword, comparePassword } from '../utils';
import { CustomErrorHandler, JwtService } from '../services';
import { registerSchema, loginSchema } from '../validations/user-auth';
import Delivery from '../models/delivery-address';

export const register = async (req, res, next) => {
  const { name, phone_number, email, password } = req.body;

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
    name,
    email,
    password: hashedPassword,
    phone_number,
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
      name,
    },
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

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
    const { _id, name } = user;
    const access_token = JwtService.sign({
      _id,
    });
    const primaryDeliveryAddress = await Delivery.findOne({ user_id: _id, primary: true });
    res.json({
      message: 'Login success',
      data: {
        _id,
        name,
        email,
        access_token,
        primaryDeliveryAddress,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }
  const token = authHeader.split(' ')[1];
  try {
    JwtService.verify(token);
    res
      .json({
        message: 'User is verified',
      })
      .status(200);
  } catch (error) {
    console.log({ error });
    return res
      .json({
        message: 'Token expired',
      })
      .status(400);
  }
};
export const changePassword = async (req, res, next) => {
  try {
    const { newPassword, password } = req.body;
    const user = await User.findById(req.user._id);
    const match = await comparePassword(password, user.password);
    if (!match) {
      return next(CustomErrorHandler.wrongCredentials());
    }
    const hashedPassword = await hashPassword(newPassword);
    await User.updateOne({ _id: user._id }, { password: hashedPassword });
    return res
      .json({
        message: 'Password has been updated!',
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};
