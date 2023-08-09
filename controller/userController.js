const Users = require("../model/userModel.js");
const { successResponse } = require("./responseController.js");

const getAllUsers = async (req, res, next) => {
  try {
    const user = await Users.find();

    return successResponse(res, {
      statusCode: 200,
      message: "User were return successful",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const getUserRole = async (req, res, next) => {
  try {
    const email = req.params.email;
    const query = { email: email };

    const user = await Users.findOne(query);

    const role = { role: user?.role };

    return successResponse(res, {
      statusCode: 200,
      message: "user role was returned successful",
      payload: { role },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserRole,
};
