const express = require("express");
const router = express.Router();

const {createJob,findAllJob,findJobById,findAdminJobs} = require("../controllers/jobControllers")
const {isAuthanticated} = require("../middlewares/isAuthanticated")

router.post("/createJob",isAuthanticated,createJob);
router.get("/findAllJob",findAllJob);
router.get("/findJobById/:id",findJobById);
router.post("/findAdminJobs",isAuthanticated,findAdminJobs)

module.exports = router;