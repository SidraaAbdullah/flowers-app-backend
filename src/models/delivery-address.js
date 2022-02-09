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
  locationPoints: {
    latitude: String,
    longitude: String,
    accuracy: String,
    altitude: String,
  },
  addressPaths: {
    city: String,
    country: String,
    district: String,
    isoCountryCode: String,
    name: String,
    postalCode: String,
    region: String,
    street: String,
    subregion: String,
    timezone: String,
  },
});
deliveryAddress.set('timestamps', true);
export default mongoose.model('delivery-address', deliveryAddress, 'delivery-addresses');
