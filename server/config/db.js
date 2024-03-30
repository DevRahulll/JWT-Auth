const mongoose=require("mongoose")

const connectToDB=async()=>{
   await mongoose
   .connect(process.env.MONGODB_URI)
   .then((conn)=>{
    console.log(`Db connected successfully...${mongoose.connection.host}`)
   })
   .catch(`Error in connecting to Db`)
}

module.exports=connectToDB