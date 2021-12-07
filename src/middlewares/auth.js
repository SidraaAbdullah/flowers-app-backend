import { CustomErrorHandler, JwtService } from "../services";

export const auth = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  const token = authHeader.split(" ")[1];
  try {
    const { _id, secret } = JwtService.verify(token);
    req.user = {
      _id,
      secret,
    };
    next();
  } catch (error) {
    return next(CustomErrorHandler.serverError());
  }
};
