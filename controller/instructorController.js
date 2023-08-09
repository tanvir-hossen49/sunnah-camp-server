const Instructor = require("../model/intructorModel");
const { successResponse } = require("./responseController");

const getAllInstructor = async (req, res, next) => {
  try {
    const instructor = await Instructor.find();

    return successResponse(res, {
      statusCode: 200,
      message: "instructor were return successful",
      payload: { instructor },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInstructor,
};
