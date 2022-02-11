import mongoose, { Schema } from 'mongoose';
import { ORDER_STATUSES } from '../constants/index';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = mongoose.Schema;

export const OrderedProduct = new schema({
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
  rating: {
    type: Number,
  },
});

const order = new Schema({
  products: [OrderedProduct],
  user_id: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
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
  comment: {
    type: String,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  driver_id: {
    type: Schema.ObjectId,
    ref: 'Driver',
  },
  delivery_charges: {
    type: String,
  },
  special_note: {
    type: String,
  },
});
order.set('timestamps', true);
order.plugin(mongoosePaginate);
export default mongoose.model('order', order, 'orders');
