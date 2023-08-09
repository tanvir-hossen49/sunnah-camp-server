const { getAllInstructor } = require("../controller/instructorController");

const instructorRouter = require("express").Router();

instructorRouter.get("/", getAllInstructor);

module.exports = instructorRouter;
