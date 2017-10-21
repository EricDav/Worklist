import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    piority: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      required: true,
      default: false,
    },
    dueDate: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const todoListSchema = new Schema({
  internalName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  collaborators: [String],
  tasks: [taskSchema]
}, {
  timestamps: true
});

const todoList = mongoose.model('todoList', todoListSchema);

export default todoList;