const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({ 
    task: String,
    duration: Number,
    priority: String,
    empid: String,
   
    status: { type: String, default: "Pending" }, // Add status with a default value
    completionDays: { type: Number, default: null }, // To store the days submitted in the report
    reportSubmittedAt: { type: Date, default: null }, // Optional: track when the employee reported
    
});

module.exports = mongoose.model("TaskModel", taskSchema);