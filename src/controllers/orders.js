import orders from '../models/orders';
import { paginateData } from '../utils';

export const createOrders = async (req, res) => {
  try {
    const newProduct = await orders.create({ ...req.body, user_id: req.user._id });
    return res.status(200).json({
      message: 'Order successfully created',
      data: newProduct,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { data, pagination } = await paginateData(orders, { user_id: req.user._id }, req.query, [
      { path: 'products.product_id', populate: ['category_id', 'created_by'] },
      { path: 'deliveryAddress' },
    ]);
    return res.status(200).json({
      pagination,
      data,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const changeOrderStatus = async (req, res) => {
  try {
    const order_id = req.params.id;
    const { status } = req.body;
    const updateQuery = { _id: order_id };
    await orders.updateOne(updateQuery, { status });
    return res.status(200).json({
      message: `Order status has been update to: ${status}`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};
