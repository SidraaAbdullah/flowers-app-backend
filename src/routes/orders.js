import express from 'express';
import { createOrders, getOrders } from '../controllers/orders';
import { auth } from '../middlewares';
import { validate } from '../middlewares/schemaValidate';
import { createOrderValidate, getOrderValidate } from '../validations/orders';

const router = express.Router();

router.post('/order', [validate(createOrderValidate), auth], createOrders);
router.get('/order', [validate(getOrderValidate), auth], getOrders);
// router.delete('/product', [auth, validate(deleteProductValidate)], deleteProducts);

export default router;
