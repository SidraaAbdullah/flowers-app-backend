import { number } from 'joi';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  phone_number: {
    type: number,
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
  cpassword: {
    type: String,
    required: true,
    min: 6,
    max: 64,
  },
});

export default mongoose.model('User', userSchema, 'users');
