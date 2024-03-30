

const signup=(req,res)=>{
    const {name,email}=req.body;
    console.log(name,email);
    return res.status(200).json({
        data:name,email,
        success:true
    })
}


module.exports={
    signup
}