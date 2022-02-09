import mongoose, { Schema } from 'mongoose';

const stock = new Schema({
  product_id: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Product',
    unique: true,
  },
  quantity: {
    type: Number,
    default: 0,
    min: [0, 'Quantity cannot be in minus'],
  },
});
stock.set('timestamps', true);
export default mongoose.model('Stock', stock, 'stocks');
