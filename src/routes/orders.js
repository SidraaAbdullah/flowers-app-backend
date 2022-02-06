import express from 'express';
import {
  changeOrderStatus,
  createOrders,
  getOrders,
  rateOrderedProducts,
} from '../controllers/orders';
import { auth } from '../middlewares';
import { canUpdateOrder } from '../middlewares/order';
import { validate } from '../middlewares/schemaValidate';
import {
  createOrderValidate,
  getOrderValidate,
  validateChangeOrderStatus,
  validateRateOrderedProducts,
} from '../validations/orders';

const router = express.Router();

router.post('/order', [auth, validate(createOrderValidate)], createOrders);
router.get('/order', [auth, validate(getOrderValidate)], getOrders);
router.put(
  '/order-status/:id',
  [auth, validate(validateChangeOrderStatus), canUpdateOrder],
  changeOrderStatus,
);
router.put(
  '/order-rating/:id',
  [auth, validate(validateRateOrderedProducts), canUpdateOrder],
  rateOrderedProducts,
);

export default router;
