const AdminModel = require("../models/adminModel")


const adminLogin = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const Admin = await AdminModel.findOne({email:email});

        if(!Admin){
            res.status(401).send({msg:"Invalid email id"});
        }

        if(Admin.password  != password){
             res.status(200).json({msg:"invalid Password"});
        }

        res.status(200).send({Admin:Admin,msg:"Succesfully Login"});

    }catch(err){
        res.status(500).send(err.message);
    }

}

module.exports = {adminLogin};