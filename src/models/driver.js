import mongoose, { Schema } from 'mongoose';
import { DRIVER_STATUS } from '../constants';

const driverSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phone_number: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 64,
  },
  availableForDelivery: {
    type: Boolean,
    default: true,
  },
  expo_notification_token: {
    type: String,
  },
  status: {
    type: String,
    default: DRIVER_STATUS.PENDING,
  },
  rating: {
    type: String,
  },
});

export default mongoose.model('Driver', driverSchema, 'drivers');
