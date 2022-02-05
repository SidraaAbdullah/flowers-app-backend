import express from 'express';
import { changeOrderStatus, createOrders, getOrders } from '../controllers/orders';
import { auth } from '../middlewares';
import { canUpdateOrder } from '../middlewares/order';
import { validate } from '../middlewares/schemaValidate';
import {
  createOrderValidate,
  getOrderValidate,
  validateChangeOrderStatus,
} from '../validations/orders';

const router = express.Router();

router.post('/order', [auth, validate(createOrderValidate)], createOrders);
router.get('/order', [auth, validate(getOrderValidate)], getOrders);
router.put(
  '/order-status/:id',
  [auth, validate(validateChangeOrderStatus), canUpdateOrder],
  changeOrderStatus,
);
// router.delete('/product', [auth, validate(deleteProductValidate)], deleteProducts);

export default router;
