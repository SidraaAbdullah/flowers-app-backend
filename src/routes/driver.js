import express from 'express';
import { login, register } from '../controllers/driver';
import { auth } from '../middlewares';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/order-assigned', [auth], login);

export default router;
