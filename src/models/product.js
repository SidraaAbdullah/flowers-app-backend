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
  created_by: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user',
  },
  category_id: {
    type: Schema.ObjectId,
  },
});
product.set('timestamps', true);
export default mongoose.model('Product', product, 'products');
