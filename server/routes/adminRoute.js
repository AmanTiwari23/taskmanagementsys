const express = require("express");
const route = express.Router();
const AdminController = require("../controllers/adminController");

route.post("/login",AdminController.adminLogin);

module.exports = route;