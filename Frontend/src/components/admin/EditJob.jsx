import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import {
  deleteJob,
  fetchJobById,
  updateJob,
} from "@/services/operations/JobOperations";
import { toast } from "sonner";
import Footer from "../shared/Footer";

const EditJob = () => {
  const { id } = useParams();
  console.log(id);
  const [job, setJob] = useState("");
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const findJob = async () => {
    try {
      const response = await fetchJobById({ jobId: id }, token);
      console.log(response);
      setJob(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [input, setInput] = useState(() => ({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
    jobType: "",
    experiance: "",
    position: "",
  }));

  const handleDeleteJob = async () => {
    try {
      await deleteJob({ jobId: id }, token);
      toast.success("Job Deleted Successfully");
      navigate("/admin/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    console.log("input", input);
    try {
      await updateJob(
        {
          title: input.title,
          description: input.description,
          salary: input.salary,
          location: input.location,
          requirements: input.requirements,
          jobType: input.jobType,
          position: input.position,
          experiance: input.experiance,
          jobId: id,
        },
        token
      );
      navigate("/admin/jobs");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e?.target?.name]: e?.target?.value });
  };

  useEffect(() => {
    if (job) {
      setInput({
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        salary: job.salary || "",
        position: job.position || "",
        requirements: job.requirements || "",
        jobType: job.jobType || "",
        experiance: job.experiance || "",
      });
    }
  }, [job]);

  useEffect(() => {
    findJob();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between sm:gap-y-6 gap-y-4">
      <div>
        <Navbar />
        <div className="flex flex-col sm:gap-y-6 gap-y-3 max-w-4xl mx-auto sm:mt-10 mt-5 bg-white shadow-xl rounded-lg sm:p-8 p-3">
          <h1 className="sm:text-4xl text-2xl font-bold text-gray-800">
            Edit Job Details
          </h1>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm sm:text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:sm:p-3  p-1.5"
              value={input.title}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm sm:text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
              value={input.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="location"
              className="text-sm sm:text-lg font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
              value={input.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex sm:flex-row flex-col sm:items-center justify-between">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="experiance"
                className="text-sm sm:text-lg font-medium text-gray-700"
              >
                Experiance
              </label>
              <input
                id="experiance"
                type="number"
                name="experiance"
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
                value={input.experiance}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="position"
                className="text-sm sm:text-lg font-medium text-gray-700"
              >
                Position
              </label>
              <input
                id="position"
                name="position"
                type="number"
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
                value={input.position}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="salary"
                className="text-sm sm:text-lg font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                id="salary"
                type="number"
                name="salary"
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
                value={input.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="requirements"
              className="text-sm sm:text-lg font-medium text-gray-700"
            >
              Requirements
            </label>
            <input
              id="requirements"
              name="requirements"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
              value={input.requirements}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="jobType"
              className="text-sm sm:text-lg font-medium text-gray-700"
            >
              Job Type
            </label>
            <input
              id="jobType"
              name="jobType"
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
              value={input.jobType}
              onChange={handleChange}
            />
          </div>

          <div className="flex sm:flex-row flex-col gap-4 sm:mt-6 mt-3">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 sm:text-lg text-sm text-white sm:px-6 sm:py-3 px-3 py-1.5 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
            >
              {loading ? "Please Wait..." : "Save Changes"}
            </button>
            <button
              onClick={handleDeleteJob}
              className="bg-red-600 sm:text-lg text-sm text-white sm:px-6 sm:py-3 px-3 py-1.5  rounded-lg shadow-md hover:bg-red-700 transition-all duration-200"
            >
              Delete Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
