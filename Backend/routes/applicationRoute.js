const express = require("express");
const router = express.Router() ;

const {isAuthanticated} = require("../middlewares/isAuthanticated");
const {applyJob, getAppliedJobs, getApplicants, updateStatus} = require("../controllers/applicationControllers")

router.get("/applyJob/:id",isAuthanticated,applyJob);
router.get("/getAppliedJobs",isAuthanticated,getAppliedJobs);
router.get("/applicants/:id",isAuthanticated,getApplicants);
router.put("/updateStatus/:id",isAuthanticated,updateStatus)


module.exports = router ;