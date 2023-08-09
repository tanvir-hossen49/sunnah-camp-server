const userRouter = require("express").Router();
const { getUserRole, getAllUsers } = require("../controller/userController");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyJWT = require("../middleware/verifyJWT");

userRouter.get("/", verifyJWT, verifyAdmin, getAllUsers);
userRouter.get("/user/:email", verifyJWT, getUserRole);

module.exports = userRouter;
