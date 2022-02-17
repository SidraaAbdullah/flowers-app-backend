import express from 'express';
import {
  approveDriver,
  getDrivers,
  login,
  patchUpdateDriver,
  register,
} from '../controllers/driver';
import { auth, IS_ADMIN } from '../middlewares';
import { IS_DRIVER } from '../middlewares/driver';
import { validate } from '../middlewares/schemaValidate';
import { approveDriverValidate, patchUpdateDriverValidate } from '../validations/driver';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', [auth], getDrivers);
router.put('/approve', [auth, IS_ADMIN, validate(approveDriverValidate)], approveDriver);
router.patch('/', [auth, IS_DRIVER, validate(patchUpdateDriverValidate)], patchUpdateDriver);
router.post('/order-assigned', [auth], login);

export default router;
