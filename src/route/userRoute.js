const express = require("express");
const userController = require("../controller/userController");

let userRoute = express();
userRoute.post("/", userController.createUser);
userRoute.post("/login", userController.userLogin);
userRoute.put("/:id", userController.updateUser);
userRoute.get("/:id", userController.getUserById);
userRoute.get("/", userController.getAllUser);
userRoute.delete("/", userController.userDelete);
module.exports = userRoute;
