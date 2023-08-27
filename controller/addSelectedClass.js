const { errorResponse, successResponse } = require("./responseController");
const Students = require("../model/studentModel");

const addSelectedClass = async (req, res, next) => {
  try {
    const courseId = req.body.courseId;
    const userId = req.body.userId;

    const student = await Students.findOne({ userId });

    if (!student) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Student not found",
      });
    }

    if (student.selectedClasses.includes(courseId)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Course already selected",
      });
    }

    student.selectedClasses.push(courseId);

    const result = await student.save();

    return successResponse(res, {
      statusCode: 200,
      message: "course added successful",
      payload: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addSelectedClass };
