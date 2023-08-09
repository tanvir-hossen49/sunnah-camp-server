const { Schema, model } = require("mongoose");

const userModel = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, "The length of user name can be maximum 31 characters"],
      maxlength: [31, "The length of user name can be maximum 3 characters"],
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "User email is required"],
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          );
        },
        message: "Please enter a valid email",
      },
    },

    image: {
      type: String,
      required: [true, "User image is required"],
    },

    student: Number,
  },
  { timestamps: true }
);

const instructor = model("instructors", userModel);

module.exports = instructor;
