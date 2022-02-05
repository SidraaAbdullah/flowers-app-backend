import mongoose, { Schema } from 'mongoose';
import { ORDER_STATUSES } from '../constants/index';
const schema = mongoose.Schema;

const products = new schema({
  product_id: {
    type: Schema.ObjectId,
    ref: 'Product',
    required: true,
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
    required: true,
  },
  subTotal: {
    type: String,
  },
  status: {
    type: String,
    default: ORDER_STATUSES['IN-PROGRESS'],
    enum: Object.keys(ORDER_STATUSES),
  },
  paymentType: {
    type: String,
    default: 'COD',
  },
});
order.set('timestamps', true);
export default mongoose.model('order', order, 'orders');
