const express = require("express");
const route = express.Router();
const EmpController = require("../controllers/empController");

route.post("/login", EmpController.empLogin);
route.get("/showtask",EmpController.showTask);
route.get("/stats", EmpController.getEmployeeStats);
route.post("/submitreport", EmpController.submitReport);



module.exports = route;