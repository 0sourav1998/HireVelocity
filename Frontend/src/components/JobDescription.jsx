import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "./redux/Slice/jobSlice";
import { applyJobs } from "@/services/operations/applicationOperation";
import axios from "axios";
import { jobEndPoints } from "../services/apis";
import { setUser } from "./redux/Slice/authslice";

const { GET_JOB_BY_JOBID } = jobEndPoints;

const JobDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const job = useSelector((state) => state.job.singleJob);
  const { token } = useSelector((state) => state.user);
  const isApplied = user?.jobsApplied?.includes(id);

  const handleApplyJobFunction = async () => {
    try {
      const { result, resultTwo } = await applyJobs({ jobId: id }, token);
      if (result) {
        sessionStorage.setItem("user", JSON.stringify(result));
        dispatch(setUser(result));
      }
      if (resultTwo) {
        sessionStorage.setItem("job", JSON.stringify(resultTwo));
        dispatch(setSingleJob(resultTwo));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const singleJobId = async () => {
    const result = await axios.post(`${GET_JOB_BY_JOBID}/${id}`, {
      Authorization: `Bearer ${token}`,
    });
    if (result) {
      sessionStorage.setItem("job", JSON.stringify(result?.data?.job));
      dispatch(setSingleJob(result?.data?.job));
    }
  };

  useEffect(() => {
    singleJobId();
  }, [id, user._id]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8 my-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl text-gray-800">{job?.title}</h1>
            <div className="flex items-center gap-4 mt-4">
              <Badge className="bg-purple-600 text-white px-4 py-1 rounded-full">
                {job?.jobType}
              </Badge>
              <Badge className="bg-red-600 text-white px-4 py-1 rounded-full">
                {job?.position} Positions
              </Badge>
              <Badge className="bg-blue-500 text-white px-4 py-1 rounded-full">
                {job?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={handleApplyJobFunction}
            disabled={isApplied}
            className={`rounded-lg text-white ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 transition duration-300"
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-gray-300 mt-8 pb-2 text-xl font-semibold text-gray-800">
          Job Description
        </h1>
        <div className="flex flex-col gap-y-4 mt-6 text-gray-700">
          <h2 className="font-semibold">
            Role:{" "}
            <span className="font-normal ml-4">{job?.title}</span>
          </h2>
          <h2 className="font-semibold">
            Description:{" "}
            <span className="font-normal ml-4">{job?.description}</span>
          </h2>
          <h2 className="font-semibold">
            Location:{" "}
            <span className="font-normal ml-4">{job?.location}</span>
          </h2>
          <h2 className="font-semibold">
            Experience:{" "}
            <span className="font-normal ml-4">{job?.experiance} years</span>
          </h2>
          <h2 className="font-semibold">
            Salary:{" "}
            <span className="font-normal ml-4">{job?.salary} LPA</span>
          </h2>
          <h2 className="font-semibold">
            Total Applicants:{" "}
            <span className="font-normal ml-4">{job?.applications?.length}</span>
          </h2>
          <h2 className="font-semibold">
            Posted Date:{" "}
            <span className="font-normal ml-4">{job?.createdAt?.split("T")[0]}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
