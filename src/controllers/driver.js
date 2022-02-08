import { Driver } from '../models';
import { hashPassword, comparePassword } from '../utils';
import { CustomErrorHandler, JwtService } from '../services';
import { registerSchema, loginSchema } from '../validations/user-auth';
import Delivery from '../models/delivery-address';
import { USER_TYPES } from '../constants';

export const register = async (req, res, next) => {
  try {
    const { name, phone_number, email, password } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const exist = await Driver.exists({ email: email });
    if (exist) {
      return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
    }
    const hashedPassword = await hashPassword(password);
    const driver = new Driver({
      name,
      email,
      password: hashedPassword,
      phone_number,
    });
    const result = await driver.save();
    const access_token = JwtService.sign({ _id: result._id });
    res.json({
      message: 'Driver successfully registered',
      data: {
        access_token,
        id: result._id,
        email,
        name,
        type: USER_TYPES.CONSUMER,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const user = await Driver.findOne({ email: email });
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
    const primaryDeliveryAddress = await Delivery.findOne({
      user_id: _id,
      primary: true,
    });
    res.json({
      message: 'Login success',
      data: {
        _id,
        name,
        email,
        access_token,
        primaryDeliveryAddress,
        type: USER_TYPES.DRIVER,
      },
    });
  } catch (error) {
    return next(error);
  }
};
