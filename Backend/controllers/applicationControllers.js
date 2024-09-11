const Applications = require("../models/ApplicationModel");
const Job = require("../models/JobModel");
const User = require("../models/UserModel");

exports.applyJob = async (req, res) => {
  try {
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
    const updateUser = await User.findByIdAndUpdate(userId,{ $push : {jobsApplied : jobId}},{new:true}) ;
    return res.status(200).json({
      success: true,
      message: "Job Applied",
      updateUser,
      updatedJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;
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
    if (!appliedJobs) {
      return res.status(404).json({
        success: false,
        message: "No Applied Jobs Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Applied Jobs Fetched Successfully",
      appliedJobs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Applied Jobs",
    });
  }
};


exports.getApplicants = async (req, res) => {
  try {
    const jobId = req.body.id;
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
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const applicationId = req.body.id;
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
    application.status = status, 
    await application.save();
    return res.status(200).json({
      success: true,
      message: "Status Updated",
      application,
    });
  } catch (error) {
    console.log(error.message);
  }
};
