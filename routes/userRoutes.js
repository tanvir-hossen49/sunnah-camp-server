const userRouter = require("express").Router();
const {
  getUserRole,
  getAllUsers,
  createUser,
} = require("../controller/userController");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyJWT = require("../middleware/verifyJWT");

userRouter.get("/", verifyJWT, verifyAdmin, getAllUsers);
userRouter.post("/", createUser);
userRouter.get("/user/:email", verifyJWT, getUserRole);

module.exports = userRouter;
