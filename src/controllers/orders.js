import orders from '../models/orders';

export const createOrders = async (req, res) => {
  try {
    console.log(req.user);
    const newProduct = await orders.create({ ...req.body, user_id: req.user._id });
    return res.status(200).json({
      message: 'Flower successfully created',
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
