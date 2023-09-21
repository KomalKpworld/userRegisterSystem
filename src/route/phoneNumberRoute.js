const express = require("express");
const phoneNumberController = require("../controller/phoneNumber");

let phoneNumberRoute = express();
phoneNumberRoute.post("/", phoneNumberController.sendOTP);

module.exports = phoneNumberRoute;