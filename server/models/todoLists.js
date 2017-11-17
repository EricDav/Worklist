import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    assignTo: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
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

const todoLists = mongoose.model('todoList', todoListSchema);

export default todoLists;
