import express from 'express';
import {
  changeOrderStatus,
  createOrders,
  getOrders,
  rateOrderedProducts,
} from '../controllers/orders';
import { auth } from '../middlewares';
import {
  canUpdateOrder,
  canUpdateOrderWithDriver,
  CHECK_IS_PRODUCT_QUANTITY,
} from '../middlewares/order';
import { validate } from '../middlewares/schemaValidate';
import {
  createOrderValidate,
  getOrderValidate,
  validateChangeOrderStatus,
  validateRateOrderedProducts,
} from '../validations/orders';

const router = express.Router();

router.post(
  '/order',
  [auth, validate(createOrderValidate), CHECK_IS_PRODUCT_QUANTITY],
  createOrders,
);
router.get('/order', [auth, validate(getOrderValidate)], getOrders);
router.put(
  '/order-status/:id',
  [auth, validate(validateChangeOrderStatus), canUpdateOrderWithDriver],
  changeOrderStatus,
);
router.put(
  '/order-rating/:id',
  [auth, validate(validateRateOrderedProducts), canUpdateOrder],
  rateOrderedProducts,
);

export default router;
