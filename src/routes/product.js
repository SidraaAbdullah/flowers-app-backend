import express from 'express';
import { createProduct, getProducts, deleteProducts } from '../controllers/product';
import { auth } from '../middlewares';
import { validate } from '../middlewares/schemaValidate';
import { createProductValidate, deleteProductValidate } from '../validations/product';

const router = express.Router();

router.post('/product', [validate(createProductValidate), auth], createProduct);
router.get('/product', [auth], getProducts);
router.delete('/product', [validate(deleteProductValidate)], deleteProducts);

export default router;
