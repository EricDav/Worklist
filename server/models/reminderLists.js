import mongoose from 'mongoose';

const { Schema } = mongoose;

const reminderSchema = new Schema({
  needReminder: {
    type: Boolean,
    default: true
  },
  todoId: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true,
  },
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
  ownerUsername: {
    type: String
  },
  time: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    default: ''
  }
});

const reminderLists = mongoose.model('Reminder', reminderSchema);

export default reminderLists;
