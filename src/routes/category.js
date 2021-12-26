import express from 'express';
import { createCategory, getCategories, deleteCategories } from '../controllers/category';
import { validate } from '../middlewares/schemaValidate';
import { createCategoryValidate, deleteCategoryValidate } from '../validations/category';

const router = express.Router();

router.post('/category', [validate(createCategoryValidate)], createCategory);
router.get('/category', getCategories);
router.delete('/category', [validate(deleteCategoryValidate)], deleteCategories);

export default router;
