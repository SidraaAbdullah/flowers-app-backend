import product from '../models/product';

export const createProduct = async (req, res) => {
  try {
    console.log(req.user);
    const newProduct = await product.create({ ...req.body, created_by: req.user._id });
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

export const getProducts = async (req, res) => {
  try {
    const products = await product.find(req.query).populate('category_id');
    return res.json({
      message: 'Gathered all flowers!',
      data: products,
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
