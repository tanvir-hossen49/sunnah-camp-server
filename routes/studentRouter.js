const studentRouter = require("express").Router();
const { addSelectedClass } = require("../controller/addSelectedClass");
const verifyJWT = require("../middleware/verifyJWT");

studentRouter.post("/addSelectedClass", verifyJWT, addSelectedClass);

module.exports = studentRouter;
