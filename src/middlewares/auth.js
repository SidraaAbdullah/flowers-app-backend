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
