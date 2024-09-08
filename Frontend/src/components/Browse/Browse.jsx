import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import Job from "../Jobs/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedJob, setSearchText } from "../redux/Slice/jobSlice";
import useGetSearchedJob from "../hooks/useGetSearchedJobs";

const Browse = () => {
  useGetSearchedJob();
  const { searchedJob } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchText(""));
      sessionStorage.removeItem("searchedJob");
      dispatch(setSearchedJob([]));
    };
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6">
        <h1 className="text-2xl font-bold">
          Search Results ({searchedJob?.length || 0})
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-5 mb-5">
          {searchedJob?.map((job, index) => (
            <Job key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
