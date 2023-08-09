const { errorResponse } = require("../controller/responseController");
const Users = require("../model/userModel");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  console.log(req.decoded);
  try {
    const user = await Users.findOne({ email: email });

    if (user?.role !== "admin") {
      return errorResponse(res, {
        statusCode: 403,
        message: "Forbidden: Access restricted to administrators.",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyAdmin;
