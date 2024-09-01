const Job = require("../models/JobModel");

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
      company : companyId,
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
    const keyword = req.query.keyword || "";
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
    const jobRes = await Job.findOne({}).populate("company");
    console.log(jobRes)
    const job = await Job.find(query).populate("company").sort({createdAt:-1});
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }
    return res.status(200).json({
      succes: true,
      job,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong while Finding the job",
    });
  }
};

exports.findJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
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
    const jobs = await Job.find({ createdBy: adminId });
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
