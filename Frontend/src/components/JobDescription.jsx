import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob} from "./redux/Slice/jobSlice";
import { applyJobs } from "@/services/operations/applicationOperation";
import axios from "axios";
import {jobEndPoints} from "../services/apis" 
import { setUser } from "./redux/Slice/authslice";

const {GET_JOB_BY_JOBID} = jobEndPoints ;
const JobDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user.jobsApplied)

  const job = useSelector((state) => state.job.singleJob);
  const { token } = useSelector((state) => state.user);
  const isApplied = user?.jobsApplied?.includes(id) ? true : false ;
  console.log(isApplied)
  const handleApplyJobFunction = async () => {
    try {
      const {result , resultTwo} = await applyJobs({ jobId: id }, token);
      console.log("RESULT1",result,"RESULT2",resultTwo)
      if(result){
        sessionStorage.setItem("user",JSON.stringify(result))
        dispatch(setUser(result))
      }
      if(resultTwo){
        sessionStorage.setItem("job", JSON.stringify(resultTwo));
        dispatch(setSingleJob(resultTwo));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const singleJobId = async () => {
    const result = await axios.post(`${GET_JOB_BY_JOBID}/${id}`,{
      Authorization : `Bearer ${token}`
    });
    if (result) {
      sessionStorage.setItem("job", JSON.stringify(result?.data?.job));
      dispatch(setSingleJob(result?.data?.job));
    }
  };
  useEffect(() => {
    singleJobId();
  }, [id, user._id ,]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">{job?.title}</h1>
            <div className="flex items-center gap-3 mt-4">
              <Badge className={"bg-[#6A3AC2] font-bold "} variant="ghost">
                {job?.jobType}
              </Badge>
              <Badge className={"bg-[#F83002] font-bold"} variant="ghost">
                {job?.position} Positions
              </Badge>
              <Badge className={"bg-[#7289b7] font-bold"} variant="ghost">
                {job?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={handleApplyJobFunction}
            disabled={isApplied}
            className={`rounded-lg text-white ${
              isApplied
                ? "bg-slate-700 cursor-not-allowed"
                : "bg-[#6A3AC2] cursor-pointer hover:bg-[#4b298a] "
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-600 mt-4 p-4">
          Job Description
        </h1>
        <div className="flex flex-col gap-y-3 mt-4">
          <h1 className="font-bold my-1">
            Role :{" "}
            <span className="text-gray-800 font-normal ml-4">{job?.title}</span>
          </h1>
          <h1 className="font-bold my-1">
            Description :{" "}
            <span className="text-gray-800 font-normal ml-4">
              {job?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location :{" "}
            <span className="text-gray-800 font-normal ml-4">
              {job?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experiance :{" "}
            <span className="text-gray-800 font-normal ml-4">
              {job?.experiance} years
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary :{" "}
            <span className="text-gray-800 font-normal ml-4">
              {job?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants :{" "}
            <span className="text-gray-800 font-normal ml-4">
              {job?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date :{" "}
            <span className="text-gray-800 font-normal ml-4">
              {job?.createdAt?.split("T")?.[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
