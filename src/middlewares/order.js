import orders from '../models/orders';
import { CustomErrorHandler } from '../services';

export const canUpdateOrder = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const order = await orders.findById(id);
    if (!order) {
      return next(CustomErrorHandler.unAuthorized('No order found'));
    }
    if (_id !== (order.user_id && order.user_id.toString())) {
      return next(
        CustomErrorHandler.unAuthorized("You don't have access to update / delete this order"),
      );
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
};
