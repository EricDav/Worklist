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
  },
  imageUrl: {
    type: String,
    unique: false,
    default: 'http://res.cloudinary.com/dbczzmftw/image/upload/v1509127904/pojdk9ajmdgase3esgg2.png'
  }
}, {
  timestamps: true
});
userSchema.index({ userName: 'text' });
const user = mongoose.model('User', userSchema);

export default user;
