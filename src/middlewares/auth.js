import { Admin } from '../models';
import { CustomErrorHandler, JwtService } from '../services';

export const auth = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  const token = authHeader.split(' ')[1];
  try {
    const { _id } = JwtService.verify(token);
    req.user = {
      _id,
    };
    next();
  } catch (error) {
    console.log({ error });
    return next(CustomErrorHandler.unAuthorized());
  }
};

export const IS_ADMIN = async (req, res, next) => {
  try {
    const isAdmin = await Admin.findById(req.user._id);
    if (!isAdmin) {
      return res.status(400).json({
        message: 'Only Admin has permission to access this API',
      });
    }
    next();
  } catch (error) {
    return next(error);
  }
};
