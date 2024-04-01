const mongoose=require('mongoose')
const JWT=require("jsonwebtoken")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLenth:[5,"Name must be atleast 5 char"],
        maxLength:[20,"Name must be less than 20 char"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email is already taken"],
        lowercase:true
    },
    username:{
        type:String,
        required:[true,"username is required"],
        lowercase:true
    },
    password:{
        type:String,
        select:false
    },
    forgotPasswordToken:{
        type:String,
    },
    forPasswordExpiryDate:{
        type:Date
    }
},{timestamps:true})

userSchema.methods={
    jwToken(){
        return JWT.sign(
            {id:this._id,email:this.email},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
}

const User=mongoose.model("User",userSchema)
module.exports=User;