const express=require("express")
const app=express();
const authrouter=require("./router/auth.route.js");
const connectToDB = require("./config/db.js");
require('dotenv').config();

app.use(express.json());

connectToDB();

app.use('/api/auth',authrouter)

module.exports=app;