const jwtRouter = require("express").Router();
const { createJsonWebToken } = require("../controller/jwtController");

jwtRouter.post("/", createJsonWebToken);

module.exports = jwtRouter;
