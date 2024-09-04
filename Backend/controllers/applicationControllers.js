const Applications = require("../models/ApplicationModel");
const Job = require("../models/JobModel");
const User = require("../models/UserModel");

exports.applyJob = async (req, res) => {
  try {
    console.log("hiiiii")
    const userId = req.userId;
    const { jobId } = req.body;
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "This field is required",
      });
    }
    const existingOrNot = await Applications.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingOrNot) {
      return res.status(400).json({
        success: false,
        message: "Already Applied For the job",
      });
    }
    const newApplication = await Applications.create({
      job: jobId,
      applicant: userId,
    });
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        $push: { applications: newApplication._id },
      },
      { new: true }
    )
    const updateUser = await User.findByIdAndUpdate(userId,{ $push : {jobsApplied : jobId}},{new:true})
    console.log(updateUser)
    return res.status(200).json({
      success: true,
      message: "Job Applied",
      updateUser,
      updatedJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Someting Went Wrong",
    });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    console.log("Inside Appled Job");
    const userId = req.userId;
    console.log(userId);
    const appliedJobs = await Applications.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    console.log(appliedJobs);
    if (!appliedJobs) {
      return res.status(404).json({
        success: false,
        message: "No Applied Jobs Found",
      });
    }
    console.log("one");
    return res.status(200).json({
      success: true,
      message: "Applied Jobs Fetched Successfully",
      appliedJobs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Someting Went Wrong While Fetching Applied Jobs",
    });
  }
};

//admin will show how much user has been applied to the job
exports.getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      succees: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "This Field is required",
      });
    }
    const application = await Applications.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    (application.status = status), await application.save();
    return res.status(200).json({
      success: true,
      message: "Status Updated",
      application,
    });
  } catch (error) {
    console.log(error.message);
  }
};
