import express from 'express';
import {
  createDeliveryAddress,
  getDeliveryAddress,
  deliveryUpdatePatch,
  updateUserProfile,
} from '../controllers/user';
import { auth } from '../middlewares';
import { validate } from '../middlewares/schemaValidate';
import {
  validateCreateDeliveryAddress,
  validatePatchDeliveryUpdate,
  validatePatchUser,
} from '../validations/user';

const router = express.Router();

router.post(
  '/user/delivery-address',
  [auth, validate(validateCreateDeliveryAddress)],
  createDeliveryAddress,
);
router.patch(
  '/user/delivery-address',
  [auth, validate(validatePatchDeliveryUpdate)],
  deliveryUpdatePatch,
);
router.get('/user/delivery-address', [auth], getDeliveryAddress);
router.patch('/user', [validate(validatePatchUser), auth], updateUserProfile);
// router.delete('/product', [auth, validate(deleteProductValidate)], deleteProducts);

export default router;
