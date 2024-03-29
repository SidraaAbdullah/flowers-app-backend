import { Driver } from '../models';
import { hashPassword, comparePassword } from '../utils';
import { CustomErrorHandler, JwtService } from '../services';
import { registerSchema, loginSchema } from '../validations/user-auth';
import Delivery from '../models/delivery-address';
import { DRIVER_STATUS, USER_TYPES } from '../constants';
import { getDriversQuery } from '../utils/driver';
import { sendNotification } from '../utils/notifications';

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
    const { _id } = user;
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
        access_token,
        primaryDeliveryAddress,
        type: USER_TYPES.DRIVER,
        ...user._doc,
      },
    });
  } catch (error) {
    console.log(error.toString());
    return next(error);
  }
};

export const patchUpdateDriver = async (req, res, next) => {
  try {
    await Driver.updateOne({ _id: req.user._id }, req.body);
    const data = await Driver.findById(req.user._id);
    await sendNotification('You are updated now!', { path: 'home' }, [
      data.expo_notification_token,
    ]);
    return res.json({
      message: 'Driver updated',
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getDrivers = async (req, res, next) => {
  try {
    const query = getDriversQuery(req.query, req.user);
    const driver = await Driver.find(query);
    return res.json({
      message: 'Driver updated',
      data: driver,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const approveDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.body.driver_id);
    if (driver && driver.status === DRIVER_STATUS.PENDING) {
      await Driver.updateOne({ _id: req.body.driver_id }, { status: DRIVER_STATUS.ACTIVE });
      if (driver.expo_notification_token) {
        await sendNotification('You are approved now!', { path: 'home' }, [
          driver.expo_notification_token,
        ]);
      }
    } else {
      return res.status(400).json({
        message: 'No such driver available to approve Or driver is already approved',
      });
    }
    return res.status(200).json({
      message: 'Driver is now approved',
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
