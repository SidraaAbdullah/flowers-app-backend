import { Stock } from '../models';
import product from '../models/product';
import { paginateData } from '../utils';
import { getProductsQuery, patchProductUpdate } from '../utils/products';

export const createProduct = async (req, res) => {
  try {
    const { quantity, ...remaining } = req.body;
    const newProduct = await product.create({ ...remaining, created_by: req.user._id });
    const stock = await Stock.create({ quantity, product_id: newProduct._id });
    await product.updateOne({ _id: newProduct._id }, { stock_id: stock._id });
    return res.status(200).json({
      message: 'Flower successfully created',
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const patchUpdateProduct = async (req, res) => {
  try {
    const { product_id } = req.body;
    const { quantity, ...query } = patchProductUpdate(req.body);
    await product.updateOne({ _id: product_id }, query);
    if (quantity) {
      await Stock.updateOne({ product_id: product_id }, { quantity });
    }
    return res.status(200).json({
      message: 'Flower successfully updated',
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const query = getProductsQuery(req.query);
    const { data, pagination } = await paginateData(product, query, req.query, [
      'category_id',
      { path: 'stock_id', select: 'quantity' },
    ]);
    return res.json({
      message: 'Gathered all flowers!',
      pagination,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    await product.deleteOne({ _id: req.body.id });
    return res.json({
      message: 'Flower deleted!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};
