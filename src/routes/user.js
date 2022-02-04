import express from 'express';
import { createDeliveryAddress, getDeliveryAddress, deliveryUpdatePatch } from '../controllers/user';
import { auth } from '../middlewares';
import { validate } from '../middlewares/schemaValidate';
import { validateCreateDeliveryAddress, validatePatchDeliveryUpdate } from '../validations/user';

const router = express.Router();

router.post(
  '/user/delivery-address',
  [auth, validate(validateCreateDeliveryAddress)],
  createDeliveryAddress,
  );
router.patch('/user/delivery-address', [auth, validate(validatePatchDeliveryUpdate)], deliveryUpdatePatch);
router.get('/user/delivery-address', [auth], getDeliveryAddress);

// router.delete('/product', [auth, validate(deleteProductValidate)], deleteProducts);

export default router;
