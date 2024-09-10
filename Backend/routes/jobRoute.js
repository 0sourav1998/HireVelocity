const express = require("express");
const router = express.Router();

const {createJob,findAllJob,findJobById,findAdminJobs,findAllJobByKeyword,updateJobDetails,deleteJobById} = require("../controllers/jobControllers")
const {isAuthanticated} = require("../middlewares/isAuthanticated")

router.post("/createJob",isAuthanticated,createJob);
router.get("/findAllJob",findAllJob);
router.get("/findAllJobByKeyword",findAllJobByKeyword)
router.post("/findJobById",isAuthanticated,findJobById);
router.post("/findAdminJobs",isAuthanticated,findAdminJobs)
router.put("/updateJobDetails",isAuthanticated,updateJobDetails)
router.delete("/deleteJobById",isAuthanticated,deleteJobById)

module.exports = router;