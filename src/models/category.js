import mongoose, { Schema } from 'mongoose';

const category = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
  },
  created_by: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user',
  },
});
category.set('timestamps', true);
export default mongoose.model('Category', category, 'categories');
