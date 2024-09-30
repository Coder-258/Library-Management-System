exports.userData=(req,res)=>{
    const userData={
        email:req.body.email,
        password:req.body.password
    };
    res.json(userData)
}