import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
  rating: {
    type: Number,
  },
  stock_id: {
    type: Schema.ObjectId,
    unique: true,
    ref: 'Stock',
  },
});
product.set('timestamps', true);
product.plugin(mongoosePaginate);
export default mongoose.model('Product', product, 'products');
