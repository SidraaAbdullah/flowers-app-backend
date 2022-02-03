import mongoose, { Schema } from 'mongoose';

const deliveryAddress = new Schema({
  user_id: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user',
  },
  address: {
    type: String,
    required: true,
  },
  primary: {
    type: Boolean,
  },
});
deliveryAddress.set('timestamps', true);
export default mongoose.model('delivery-address', deliveryAddress, 'delivery-addresses');
