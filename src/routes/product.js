import express from 'express';
import {
  createProduct,
  getProducts,
  deleteProducts,
  patchUpdateProduct,
} from '../controllers/product';
import { auth } from '../middlewares';
import { validate } from '../middlewares/schemaValidate';
import {
  createProductValidate,
  deleteProductValidate,
  getProductValidate,
  patchUpdateProductValidate,
} from '../validations/product';

const router = express.Router();

router.post('/product', [auth, validate(createProductValidate)], createProduct);
router.patch('/product', [auth, validate(patchUpdateProductValidate)], patchUpdateProduct);
router.get('/product', [validate(getProductValidate)], getProducts);
router.delete('/product', [auth, validate(deleteProductValidate)], deleteProducts);

export default router;
