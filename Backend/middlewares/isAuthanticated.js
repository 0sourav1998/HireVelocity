const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuthanticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "") ;
        if(!token){
            return res.status(401).json({
                success : false ,
                message : "Token is Required or User not Authanticated"
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                success : false ,
                message : "Invalid Token"
            })
        }
        req.userId = decode.userId ;
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Validating Token"
        })
    }
}