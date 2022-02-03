import express from 'express';
import { createOrders } from '../controllers/orders';
import { auth } from '../middlewares';
import { validate } from '../middlewares/schemaValidate';
import { createOrderValidate } from '../validations/orders';

const router = express.Router();

router.post('/order', [validate(createOrderValidate), auth], createOrders);
// router.get('/product', [auth], getProducts);
// router.delete('/product', [auth, validate(deleteProductValidate)], deleteProducts);

export default router;
