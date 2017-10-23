import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
userSchema.index({ userName: 'text' });
const user = mongoose.model('User', userSchema);

export default user;
