const express = require("express");
const router = express.Router() ;

const {isAuthanticated} = require("../middlewares/isAuthanticated");
const {applyJob, getAppliedJobs, getApplicants, updateStatus} = require("../controllers/applicationControllers")

router.post("/applyJobb",isAuthanticated,applyJob);
router.get("/getAppliedJobs",isAuthanticated,getAppliedJobs);
router.post("/applicants",isAuthanticated,getApplicants);
router.put("/updateStatus",isAuthanticated,updateStatus)


module.exports = router ;