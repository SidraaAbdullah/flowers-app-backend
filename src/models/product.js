import mongoose, { Schema } from 'mongoose';

const product = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  created_by: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Admin',
  },
  category_id: {
    type: Schema.ObjectId,
    ref: 'Category',
  },
});
product.set('timestamps', true);
export default mongoose.model('Product', product, 'products');
