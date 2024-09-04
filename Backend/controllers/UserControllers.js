const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { uploadImageToCloudinary } = require("../utils/UploadImageToCloudinary");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;
    const file = req.files.file;
    if (!fullName || !email || !password || !phoneNumber || !role || !file) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered",
      });
    }
    const Image = await uploadImageToCloudinary(file, process.env.FOLDER_NAME);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      password: hashedPassword,
      role,
      email,
      phoneNumber,
      profile: {
        profilePhoto: Image.secure_url,
      },
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong while Creating Account",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Registered",
      });
    }
    if (role !== existingUser.role) {
      return res.status(400).json({
        success: false,
        message: "Role not match with the user",
      });
    }
    if (await bcrypt.compare(password, existingUser.password)) {
      const payload = {
        userId: existingUser._id,
        role : existingUser.role
      };
      existingUser = {
        _id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
        role: existingUser.role,
        profile: existingUser.profile,
        jobsApplied : existingUser.jobsApplied
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          success: true,
          message: `Welcome Back ${existingUser.fullName}`,
          existingUser,
          token,
        });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong while Logging into Your Account",
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    let file ;
    if(req.files){
      file = req.files.file;
    }
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        msessage: "User Not Found",
      });
    }
    if(file){
      const My_resume = await uploadImageToCloudinary(file,process.env.FOLDER_NAME)
      console.log("My Resume",My_resume)
      user.profile.resume = My_resume.secure_url
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }
    if (skills) {
      user.profile.skills = skillsArray;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong while Updating Profile",
    });
  }
};
