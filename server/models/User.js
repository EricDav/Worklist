import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
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
  })

const User = mongoose.model('User', UserSchema);

export default User;
