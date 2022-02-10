import { Driver } from '../models';

export const IS_DRIVER = async (req, res, next) => {
  try {
    const isDriver = await Driver.findById(req.user._id);
    if (!isDriver) {
      return res.status(400).json({
        message: 'You are not the user!',
      });
    }
    next();
  } catch (error) {
    return next(error);
  }
};
