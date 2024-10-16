import UserSubmission from "../models/user_model.js";


export const usersubmit=async(req,res)=>{
    try {
        const {images,socialHandle,name}=req.body;
        const user= await new UserSubmission(req.body)
         await user.save();
         res.status(200).json({message:" Data saved successfully"})
    } catch (error) {
        console.log(error)
    }
}

export const adminloginpannel=async(req,res)=>{
    const {password}=req.body;
    try {
        const setpassword=12345678
        if( parseInt(password)===setpassword)
     return   res.status(200).json("Login Successfully")
      else
      {
       return   res.status(201).json("Wrong Cridentials")
       }
    } catch (error) {
        console.log(error)
    }
}

export  const fetchuserdata=async(req,res)=>{
    try {
        const data=await UserSubmission.find();
        res.status(200).json(data)
    } catch (error) {
       console.log(error) 
    }
}