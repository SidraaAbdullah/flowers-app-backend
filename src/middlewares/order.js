import { ORDER_STATUSES, USER_TYPES } from '../constants';
import { Stock } from '../models';
import orders from '../models/orders';
import product from '../models/product';
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

export const canRateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orders.findById(id);
    if (order.status === ORDER_STATUSES.DELIVERED) {
      next();
    } else {
      return CustomErrorHandler.notPossible("You cannot rate this order until it's delivered");
    }
  } catch (error) {
    return next(error);
  }
};

export const canUpdateOrderWithDriver = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const order = await orders.findById(id);
    if (!order) {
      return next(CustomErrorHandler.unAuthorized('No order found'));
    }
    if (
      _id === (order.user_id && order.user_id.toString()) ||
      (order.status === ORDER_STATUSES['IN-PROGRESS']
        ? req.body.type === USER_TYPES.DRIVER
        : order.driver_id === _id)
    ) {
      next();
    } else {
      return next(CustomErrorHandler.unAuthorized("You don't have access to update this order"));
    }
  } catch (error) {
    return next(error);
  }
};

// CHECKING IF PRODUCTS ARE AVAILABLE

export const CHECK_IS_PRODUCT_QUANTITY = async (req, res, next) => {
  try {
    const { products } = req.body;
    let erroredProduct = {};
    for (const product of products) {
      const productStock = await Stock.findOne({ product_id: product.product_id }).select(
        'quantity product_id',
      );
      if (productStock.quantity <= 0 || product.quantity > productStock.quantity) {
        erroredProduct.product_id = productStock.product_id;
        break;
      }
    }
    if (erroredProduct.product_id) {
      const notInStockProduct = await product.findById(erroredProduct.product_id);
      return res.status(400).json({
        message: 'Product in your cart is not in stock OR you have exceeded the quantity',
        data: notInStockProduct,
      });
    }
    next();
  } catch (error) {
    return next(error);
  }
};
