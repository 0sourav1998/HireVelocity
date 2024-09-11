const Job = require("../models/JobModel");
const Application = require("../models/ApplicationModel");
const { default: mongoose } = require("mongoose");
const User = require("../models/UserModel")

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      location,
      experiance,
      jobType,
      position,
      requirements,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !experiance ||
      !jobType ||
      !position ||
      !requirements ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const userId = req.userId;
    const createdJob = await Job.create({
      title,
      description,
      salary,
      location,
      experiance,
      jobType,
      position,
      company: companyId,
      requirements: requirements.split(","),
      createdBy: userId,
    });
    return res.status(201).json({
      success: true,
      message: "Job Cretaed Successfully",
      createdJob,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Creating the Jon",
    });
  }
};

exports.findAllJob = async (req, res) => {
  try {
    const job = await Job.find({}).populate("company").sort({ createdAt: -1 });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong while Finding the job",
    });
  }
};

exports.findAllJobByKeyword = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required for searching jobs",
      });
    }
    const query = {
      $or: [
        {
          title: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    };
    const job = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (job.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while finding the job",
    });
  }
};

exports.findJobById = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId)
      .populate({ path: "applications", populate: { path: "applicant" } })
      .exec();
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Job Successfully Fetched By job Id",
      job,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong while Finding the job",
    });
  }
};

exports.findAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId;
    const jobs = await Job.find({ createdBy: adminId }).populate("company");
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Jobs Fetched for Admins",
      jobs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong while Finding the job",
    });
  }
};

exports.updateJobDetails = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      location,
      experiance,
      jobType,
      position,
      requirements,
      jobId,
    } = req.body;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job Does Not Exist",
      });
    }
    if (title) {
      job.title = title;
    }
    if (description) {
      job.description = description;
    }
    if (location) {
      job.location = location;
    }
    if (salary) {
      job.salary = salary;
    }
    if (experiance) {
      job.experiance = experiance;
    }
    if (jobType) {
      job.jobType = jobType;
    }
    if (position) {
      job.position = position;
    }
    if (requirements) {
      job.requirements = requirements;
    }
    await job.save();
    return res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Failed to update the job",
    });
  }
};

exports.deleteJobById = async (req, res) => {
  try {
    const { jobId } = req.body;
    await Job.findByIdAndDelete(jobId);
    const appli = await Application.findOne({job:jobId})
    await Application.deleteMany({ job: jobId });
    await User.findByIdAndUpdate(appli.applicant,{$pull : {jobsApplied : jobId}})
    return res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};


exports.fetchBookmarkedJobs = async(req,res)=>{
  try {
    const userId = req.userId ;
    const user = await User.findById(userId).populate("bookmarkedJobs");
    if(user?.role === "student"){
      return res.status(200).json({
        success : true ,
        message : "Bookmarked Fetched Successfully",
        jobs : user?.bookmarkedJobs
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}