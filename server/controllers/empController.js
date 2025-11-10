const EmpModel = require("../models/empModel");
const TaskModel = require("../models/taskModel")

const empLogin=async(req, res)=>{
    const { email, password } =req.body;
   
    const employee = await EmpModel.findOne({email:email});
    
    if (!employee)
    {
        res.status(401).send({msg:"Invalid Employee Email!"});
    }

    if (employee.password!=password){
        res.status(401).send({msg:"Invalid Password!"});
    }

    res.status(200).send({employee:employee, msg:"Login Succesfully!"});
}


const showTask = async(req,res)=>{
    const {id} = req.query;
    const employee = await TaskModel.find({empid:id});
    res.status(200).send(employee);
}

const getEmployeeStats = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ msg: "Employee ID is required." });
    }

    try {
        const totalTasks = await TaskModel.countDocuments({ empid: id });
        
        // NOTE: We assume 'High' and 'Medium' priority mean 'Pending' 
        // until you add a proper 'status' field to TaskModel.
        const pendingTasks = await TaskModel.countDocuments({ 
            empid: id, 
            priority: { $in: ["High", "Medium"] } 
        });

        // We assume 'Low' priority is used to represent 'Completed' tasks.
        // You should ideally update your schema to include a 'status' field.
        const completedTasks = await TaskModel.countDocuments({ 
            empid: id, 
            priority: "Low" 
        });

        return res.status(200).json({
            total: totalTasks,
            pending: pendingTasks,
            completed: completedTasks,
        });

    } catch (error) {
        console.error("Error fetching employee stats:", error);
        return res.status(500).json({ msg: "Failed to fetch employee statistics.", details: error.message });
    }
};

const submitReport = async (req, res) => {
    const { taskId, status, days } = req.body;

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            { 
                status: status, 
                completionDays: days,
                reportSubmittedAt: new Date(),
                // Optionally, update the priority based on status if needed
            },
            { new: true } // returns the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ msg: "Task not found." });
        }

        // Return a success message
        return res.status(200).json({ msg: "Task status and report updated successfully!" });

    } catch (error) {
        console.error("Submit Report Error:", error);
        return res.status(500).json({ msg: "Failed to submit report.", details: error.message });
    }
};



module.exports={
    empLogin,
    showTask,
    getEmployeeStats,submitReport
    
}