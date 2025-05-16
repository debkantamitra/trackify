const mongoose = require("mongoose");

const allowedTags = ["work", "personal", "urgent", "low-priority"];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task must have a title"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [
        {
          type: String,
          enum: {
            values: allowedTags,
            message: "{VALUE} is not a valid tag",
          },
        },
      ],
      required: [true, "Task must have atleast one tag"],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
