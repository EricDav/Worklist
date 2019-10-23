import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: false,
    unique: false
  },

}, {
  timestamps: true
});
messageSchema.index({ email: 'text' });
const messageLists = mongoose.model('user', messageSchema);
export default messageLists;
