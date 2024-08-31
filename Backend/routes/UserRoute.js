const express = require("express");
const router = express.Router();

const {register,login,logout,updateProfile} = require("../controllers/UserControllers")
const {isAuthanticated} = require("../middlewares/isAuthanticated")

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.put("/updateProfile",isAuthanticated,updateProfile)

module.exports = router;