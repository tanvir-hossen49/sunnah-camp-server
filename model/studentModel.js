const { Schema, model } = require("mongoose");

const studentModel = new Schema(
  {
    userId: String,
    followings: [String],
    selectedClasses: [String],
    enrolledClasses: [String],
  },
  { timestamps: true }
);

const students = model("students", studentModel);

module.exports = students;
