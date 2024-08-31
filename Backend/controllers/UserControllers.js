const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config()

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;
    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    return res.status(201).json({
        success : true ,
        message : "User Created Successfully"
    })
  } catch (error) {
    return res.status(400).json({
        success : false ,
        message : "Something Went Wrong while Creating Account"
    })
  }
};

exports.login = async(req,res)=>{
    try{
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
          return res.status(400).json({
            success: false,
            message: "All Fields are Required",
          });
        }
        let existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(400).json({
                success : false ,
                message : "User Not Registered"
            })
        }
        if(role !== existingUser.role){
            return res.status(400).json({
                success : false ,
                message : "Role not match with the user"
            })
        }
        if(await bcrypt.compare(password,existingUser.password)){
            const payload = {
                userId : existingUser._id
            }
            existingUser = {
                _id : existingUser._id ,
                fullName : existingUser.fullName ,
                email : existingUser.email ,
                phoneNumber : existingUser.phoneNumber ,
                role : existingUser.role ,
                profile : existingUser.profile
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "1d"});
            return res.cookie("token",token,{maxAge : 1*24*60*60*1000,httpOnly : true}).json({
                success : true ,
                message : `Welcome Back ${existingUser.fullName}` ,
                existingUser ,
                token
            })
        }
    }catch(error){
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong while Logging into Your Account"
        })
    }
}

exports.logout = async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge : 0}).json({
            success : true ,
            message : "Logged Out Successfully"
        })
    }catch(error){
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong while Logging out"
        })
    }
}

exports.updateProfile = async(req,res)=>{
  try {
    const {fullName , email , phoneNumber , bio , skills} = req.body ;
    const file = req.files ;
    let skillsArray ;
    if(skills){
      skillsArray = skills.split(",") ;
    }
    const userId = req.userId ;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        success : false ,
        msessage : "User Not Found"
      })
    }
    if(fullName){
      user.fullName = fullName ;
    }
    if(email){
      user.email = email ;
    }
    if(skills){
      user.profile.skills = skillsArray ;
    }
    if(phoneNumber){
      user.phoneNumber = phoneNumber ;
    }
    if(bio){
      user.profile.bio = bio ;
    }
    await user.save();
    return res.status(200).json({
      success : true ,
      message : "Profile updated Successfully",
      user,
    })

  } catch (error) {
    return res.status(400).json({
      success : false ,
      message : "Something Went Wrong while Updating Profile"
  })
  }
}