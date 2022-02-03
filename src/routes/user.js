import express from 'express';
import { createDeliveryAddress, getDeliveryAddress } from '../controllers/user';
import { auth } from '../middlewares';
import { validate } from '../middlewares/schemaValidate';
import { validateCreateDeliveryAddress } from '../validations/user';

const router = express.Router();

router.post(
  '/user/delivery-address',
  [auth, validate(validateCreateDeliveryAddress)],
  createDeliveryAddress,
);
router.get('/user/delivery-address', [auth], getDeliveryAddress);
// router.delete('/product', [auth, validate(deleteProductValidate)], deleteProducts);

export default router;
