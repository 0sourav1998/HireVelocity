const express = require("express");
const router = express.Router();

const {registerCompany,getComapanies,getCompanyById,updateCompany} = require("../controllers/companyControllers")
const {isAuthanticated} = require("../middlewares/isAuthanticated")

router.post("/register",isAuthanticated,registerCompany);
router.post("/getComapanies",isAuthanticated,getComapanies);
router.post("/getCompany/:id",isAuthanticated,getCompanyById);
router.put("/updateCompany/:id",isAuthanticated,updateCompany)

module.exports = router;