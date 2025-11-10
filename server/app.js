const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const bodyparser = require('body-parser');

const cors = require('cors');
const AdminRoute = require("./routes/adminRoute");
const EmpRoute = require("./routes/employeeRoute")

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());


app.use("/admin",AdminRoute);
app.use("/employee",EmpRoute);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Db connected succesfully !");
});


const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server run on ${port} Port!`);
})