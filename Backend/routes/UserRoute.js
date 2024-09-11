const express = require("express");
const router = express.Router();

const {register,login,addBookmark,updateProfile} = require("../controllers/UserControllers")
const {isAuthanticated} = require("../middlewares/isAuthanticated")

router.post("/register",register);
router.post("/login",login);
router.put("/updateProfile",isAuthanticated,updateProfile)
router.post("/addBookmark",isAuthanticated,addBookmark)

module.exports = router;