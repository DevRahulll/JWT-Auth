const express=require("express")
const app=express();
const authrouter=require("./router/auth.route.js")

app.use(express.json());

app.use('/api/auth',authrouter)

module.exports=app;