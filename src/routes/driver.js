import express from 'express';
import { getDrivers, login, patchUpdateDriver, register } from '../controllers/driver';
import { auth } from '../middlewares';
import { IS_DRIVER } from '../middlewares/driver';
import { validate } from '../middlewares/schemaValidate';
import { patchUpdateDriverValidate } from '../validations/driver';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', [auth, IS_DRIVER], getDrivers);
router.patch('/', [auth, IS_DRIVER, validate(patchUpdateDriverValidate)], patchUpdateDriver);
router.post('/order-assigned', [auth], login);

export default router;
