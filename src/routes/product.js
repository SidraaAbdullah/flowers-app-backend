import express from 'express';
import { createProduct, getProducts, deleteProducts } from '../controllers/product';
import { auth } from '../middlewares';
import { validate } from '../middlewares/schemaValidate';
import {
  createProductValidate,
  deleteProductValidate,
  getProductValidate,
} from '../validations/product';

const router = express.Router();

router.post('/product', [auth, validate(createProductValidate)], createProduct);
router.get('/product', [auth, validate(getProductValidate)], getProducts);
router.delete('/product', [auth, validate(deleteProductValidate)], deleteProducts);

export default router;
