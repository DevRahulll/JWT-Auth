const {User} = require('../model/user.model.js');
const emailValidator=require("email-validator")
const JWT=require('jsonwebtoken')

const signup = async (req, res) => {
    const { name, email,username, password, confirmPassword } = req.body;
    // console.log(name, email,username, password, confirmPassword);

    if(!name || !email||!username||!password||!confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Every field is required"
        })
    }

    const validEmail=emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:"please provide a valid email id"
        })
    }

    if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password not matched"
        })
    }

    try {
        const userInfo = User(req.body);

        const result = await userInfo.save();

        return res.status(200).json({
            data: result,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const signin=async(req,res)=>{
    const{email,password}=req.body;
    console.log(email,password);

    if(!email||!password){
        return res.status(400).json({
            success:false,
            message:"Every field is mandatory"
        })
    }

    try {
        const user=await User.findOne({
            email
        }).select("+password");
    
        if(!user||user.password===password){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials password"
            })
        }
    
        const token= user.jwtToken();
        user.password=undefined;
    
        const cookieOption={
            maxAge:24*60*60*1000,
            httpOnly:true
        };
        res.cookie("token",token,cookieOption);
        res.status(200).json({
            success:true,
            data:user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error while login"
        })
        
    }

}

module.exports = {
    signup,
    signin
}