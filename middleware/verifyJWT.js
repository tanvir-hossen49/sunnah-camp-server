const jwt = require("jsonwebtoken");
const { jsonAccessKey } = require("../secret");
const { errorResponse } = require("../controller/responseController");

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return errorResponse(res, {
      statusCode: 401,
      message: "unauthorize",
    });
  }

  const token = authorization.split(" ")[1];
  jwt.verify(token, jsonAccessKey, (error, decoded) => {
    if (error) {
      return errorResponse(res, {
        statusCode: 401,
        message: "unauthorize",
      });
    }
    req.decoded = decoded;
    console.log(decoded);
    next();
  });
};

module.exports = verifyJWT;
