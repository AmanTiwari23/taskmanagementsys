const AdminModel = require("../models/adminModel");
const UserPassword = require("../middlewares/randomPassword");
const emailSend = require("../middlewares/empMailSen");
const Employee = require("../models/empModel");


const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Admin = await AdminModel.findOne({ email: email });

    if (!Admin) {
      return res.status(401).json({ msg: "Invalid email id" });
    }

    if (Admin.password !== password) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    res.status(200).json({ Admin: Admin, msg: "Successfully Logged In" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const userCreate = async (req, res) => {
  const { empname, empemail, designation } = req.body;

  try {
   
    const emppass = UserPassword.myPassword();
   
    emailSend.userMailsender(empname,empemail,emppass);

    const employee = await Employee.create({
      name:empname,
      email:empemail,
      designation:designation,
      password:emppass
    });

    res.status(200).json({ msg: "User created and email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
};

const empDisplay = async(req,res)=>{
  const employee = await Employee.find();
  res.status(200).send(employee);
}

const TaskModel = require("../models/taskModel"); // Make sure you import the TaskModel

const taskSave = async (req, res) => {
    const { id, task, duration, priority } = req.body;

    try {
        const emptask = await TaskModel.create({
            task: task,
            duration: duration,
            priority: priority,
            empid: id
        });
        // 201 Created is the correct status code for a successful creation
        return res.status(201).json({ msg: "Task Successfully Created!" }); 
    } catch (error) {
        // Log the error for debugging on the server side
        console.error("Task Save Error:", error);

        // Check if it's a Mongoose validation error (likely the duration type error)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: "Validation failed. Check data types (e.g., duration must be a number).", details: error.message });
        }
        
        // General server error
        return res.status(500).json({ msg: "Failed to save task due to a server error.", details: error.message });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const totalTasks = await TaskModel.countDocuments();
        
        // Count tasks by priority (simulating status since your model lacks 'status')
        const pendingTasks = await TaskModel.countDocuments({ priority: { $in: ["High", "Medium"] } });
        const completedTasks = await TaskModel.countDocuments({ 
        status: "Fully Completed" 
    });

        res.status(200).json({
            totalEmployees: totalEmployees,
            totalTasks: totalTasks,
            pendingTasks: pendingTasks,
            completedTasks: completedTasks,
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ msg: "Failed to fetch dashboard statistics.", details: error.message });
    }
};

// New Controller Function 2: Get recent tasks
const getRecentTasks = async (req, res) => {
    try {
        // Find the 5 most recent tasks, sort by creation date descending, and limit to 5
        const recentTasks = await TaskModel.find()
            .sort({ _id: -1 }) // Sort by descending ID/creation time
            .limit(5);

        res.status(200).json(recentTasks);
    } catch (error) {
        console.error("Recent Tasks Error:", error);
        res.status(500).json({ msg: "Failed to fetch recent tasks.", details: error.message });
    }
};

const getSubmittedReports = async (req, res) => {
    try {
        // 1. Fetch all tasks where a report status has been submitted.
        // We look for tasks where 'status' is NOT the initial "Pending" state.
        //  This assumes you updated your TaskModel with a 'status' field.
        const reportedTasks = await TaskModel.find({
            status: { $ne: "Pending" } 
        });

        // If no reports exist, return an empty array
        if (reportedTasks.length === 0) {
            return res.status(200).json([]);
        }

        // 2. Extract unique Employee IDs from the reported tasks
        const employeeIds = [...new Set(reportedTasks.map(task => task.empid))];

        // 3. Fetch all necessary Employee details in one query
        const employees = await Employee.find({ 
            _id: { $in: employeeIds } 
        }).select('name email'); // Only retrieve the necessary fields

        // Convert the employee array to a map for quick lookup: { '_id': {name, email} }
        const employeeMap = employees.reduce((map, emp) => {
            map[emp._id.toString()] = { name: emp.name, email: emp.email };
            return map;
        }, {});

        // 4. Combine Task data with Employee data
        const finalReports = reportedTasks.map(task => {
            const employee = employeeMap[task.empid];
            
            // Convert the Mongoose document to a plain object before adding new properties
            const taskObj = task.toObject ? task.toObject() : task; 

            return {
                ...taskObj,
                employeeName: employee ? employee.name : "Unknown Employee",
                employeeEmail: employee ? employee.email : "N/A"
            };
        });

        res.status(200).json(finalReports);

    } catch (error) {
        console.error("Error fetching submitted reports:", error);
        res.status(500).json({ msg: "Failed to fetch submitted reports.", details: error.message });
    }
};


module.exports = { adminLogin, userCreate,empDisplay,taskSave ,getDashboardStats,getRecentTasks, getSubmittedReports};
