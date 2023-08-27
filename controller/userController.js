const Users = require("../model/userModel.js");
const createError = require("http-errors");
const { successResponse } = require("./responseController.js");

const getAllUsers = async (_req, res, next) => {
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

const createUser = async (req, res, next) => {
  try {
    const users = req.body;
    users.role = "student";

    const query = { email: users.email };
    const existingUser = await Users.findOne(query);

    if (existingUser) {
      throw createError(409, "User already exists");
    }

    const result = await Users.create(users);
    return successResponse(res, {
      statusCode: 200,
      message: "user was created successful",
      payload: { result },
    });
  } catch (error) {
    return next(error);
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
  createUser,
};
