const user = require('../model/user.model.js')
const emailValidator=require("email-validator")

const signup = async (req, res) => {
    const { name, email,username, password, confirmPassword } = req.body;
    console.log(name, email,username, password, confirmPassword);

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
        const userInfo = user(req.body);

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


module.exports = {
    signup
}