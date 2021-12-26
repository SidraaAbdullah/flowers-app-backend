import category from '../models/category';

export const createCategory = async (req, res) => {
  try {
    const newCategory = await category.create(req.body);
    return res.status(200).json({
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await category.find(req.query);
    return res.json({
      message: 'Gathered all categories!',
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    await category.deleteOne({ _id: req.body.id });
    return res.json({
      message: 'Category deleted!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};
