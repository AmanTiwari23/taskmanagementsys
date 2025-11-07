const EmpModel = require("../models/empModel");


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


module.exports={
    empLogin
}