
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({ 
    task:String,
    duration:Number,
    priority:String,
    empid:String
})

module.exports = mongoose.model("Task", taskSchema);