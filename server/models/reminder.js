import mongoose from 'mongoose';

const { Schema } = mongoose;

const reminderSchema = new Schema({
  todoName: {
    type: String,
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
});

const reminder = mongoose.model('Reminder', reminderSchema);

export default reminder;