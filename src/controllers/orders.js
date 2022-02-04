import orders from '../models/orders';

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
    const data = await orders.find({ user_id: req.user._id }).populate('products.product_id');
    return res.status(200).json({
      data,
      user_id: req.user._id
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};
