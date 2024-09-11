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
import Footer from "./shared/Footer";

const { GET_JOB_BY_JOB_ID } = jobEndPoints;

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
    const result = await axios.post(GET_JOB_BY_JOB_ID , {jobId : id}, {
      headers :{
        Authorization: `Bearer ${token}`
      }
    });
    if (result) {
      sessionStorage.setItem("job", JSON.stringify(result?.data?.job));
      dispatch(setSingleJob(result?.data?.job));
    }
  };

  useEffect(() => {
    singleJobId();
  }, [id, user?._id]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="sm:max-w-7xl max-w-[95%] mx-auto bg-white shadow-md rounded-lg sm:p-8 sm:my-10 p-4 my-5">
        <div className="flex justify-between items-center">
          <div className="sm:w-[40%] w-[full]">
            <h1 className="font-bold sm:text-3xl text-lg text-gray-800">{job?.title}</h1>
            <div className="flex flex-wrap items-center sm:gap-4 sm:mt-4 gap-2 mt-2">
              <Badge className="bg-purple-600 sm:w-full w-fit sm:mr-0 mr-2 text-white sm:px-4 sm:py-1 px-2 rounded-full sm:font-bold font-semibold sm:text-sm text-[11px] sm:mt-4 mt-2">
                <div className="flex justify-center items-center w-full">
                  {job?.jobType}
                </div>
              </Badge>
              <Badge className="bg-red-600 sm:w-full w-fit sm:mr-0 mr-2 text-white sm:px-4 sm:py-1 px-2 rounded-full sm:font-bold font-semibold sm:text-sm text-[11px] sm:mt-4 mt-2">
              <div className="flex justify-center items-center w-full">
                  {job?.position} Positions
                </div>
              </Badge>
              <Badge className="bg-blue-500 sm:w-full w-fit text-white sm:px-4 sm:py-1 px-2 rounded-full sm:font-bold font-semibold sm:text-sm text-[11px] sm:mt-4 mt-2">
              <div className="flex justify-center items-center w-full">
                  {job?.salary} LPA
                </div>
              </Badge>
            </div>
          </div>
          <button
            onClick={handleApplyJobFunction}
            disabled={isApplied}
            className={`rounded-lg text-white text-xs sm:text-lg sm:px-4 sm:py-2 px-1.5 py-2 ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 transition duration-300"
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>
        </div>
        <h1 className="border-b-2 border-gray-300 sm:mt-8 mt-6 pb-2 sm:text-xl text-lg font-semibold text-gray-800">
          Job Description
        </h1>
        <div className="flex flex-col gap-y-4 mt-6 text-gray-700">
          <h2 className="font-semibold">
            Role:{" "}
            <span className="font-normal sm:ml-4 ml-0 sm:text-normal text-sm">{job?.title}</span>
          </h2>
          <h2 className="font-semibold">
            Description:{" "}
            <span className="font-normal sm:ml-4 ml-0 sm:text-normal text-sm">{job?.description}</span>
          </h2>
          <h2 className="font-semibold">
            Location:{" "}
            <span className="font-normal sm:ml-4 ml-0 sm:text-normal text-sm">{job?.location}</span>
          </h2>
          <h2 className="font-semibold">
            Experience:{" "}
            <span className="font-normal sm:ml-4 ml-0 sm:text-normal text-sm">{job?.experiance} years</span>
          </h2>
          <h2 className="font-semibold">
            Salary:{" "}
            <span className="font-normal sm:ml-4 ml-0 sm:text-normal text-sm">{job?.salary} LPA</span>
          </h2>
          <h2 className="font-semibold">
            Total Applicants:{" "}
            <span className="font-normal sm:ml-4 ml-0 sm:text-normal text-sm">{job?.applications?.length}</span>
          </h2>
          <h2 className="font-semibold">
            Posted Date:{" "}
            <span className="font-normal sm:ml-4 ml-0 sm:text-normal text-sm">{job?.createdAt?.split("T")[0]}</span>
          </h2>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default JobDescription;
