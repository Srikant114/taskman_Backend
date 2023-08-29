const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
  TaskModel,
};
