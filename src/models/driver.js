import mongoose, { Schema } from 'mongoose';

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
});

export default mongoose.model('Driver', driverSchema, 'drivers');