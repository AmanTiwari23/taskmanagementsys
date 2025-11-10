const express = require("express");
const route = express.Router();
const AdminController = require("../controllers/adminController");

route.post("/login",AdminController.adminLogin);
route.post("/usercreate", AdminController.userCreate);

route.get("/empdisplay", AdminController.empDisplay);
route.post("/tasksave", AdminController.taskSave);

route.get("/dashboard-stats", AdminController.getDashboardStats); // New route for stats
route.get("/recent-tasks", AdminController.getRecentTasks);

route.get("/submittedreports", AdminController.getSubmittedReports);

module.exports = route;