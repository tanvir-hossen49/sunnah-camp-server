const jwt = require("jsonwebtoken");
const { jsonAccessKey } = require("../secret");
const { successResponse } = require("./responseController");

const createJsonWebToken = (req, res, next) => {
  try {
    const payload = req.body;
    const token = jwt.sign(payload, jsonAccessKey, {
      expiresIn: "1h",
    });
    return successResponse(res, { statusCode: 200, payload: { token } });
  } catch (error) {
    console.error("Failed to sign the JWT:", error);
    next(error);
  }
};

module.exports = { createJsonWebToken };
