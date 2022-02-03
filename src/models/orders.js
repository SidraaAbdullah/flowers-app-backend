import mongoose, { Schema } from 'mongoose';
const schema = mongoose.Schema;

const products = new schema({
  product_id: {
    type: Schema.ObjectId,
    ref: 'Product',
  },
  price: {
    type: String,
  },
  quantity: {
    type: String,
  },
});

const order = new Schema({
  products: [products],
  user_id: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user',
  },
  deliveryAddress: {
    type: Schema.ObjectId,
    ref: 'delivery-address',
  },
  subTotal: {
    type: String,
  },
});
order.set('timestamps', true);
export default mongoose.model('order', order, 'orders');
