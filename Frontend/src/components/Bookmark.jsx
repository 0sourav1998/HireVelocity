import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "./shared/Footer";

const Bookmark = () => {
  const navigate = useNavigate();
  const {bookmarkedJobs} = useSelector((state)=>state?.job)

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Navbar />
        <div className="flex flex-col max-w-7xl sm:w-fit w-[95%] gap-y-4 mx-auto">
          <h1 className="sm:text-3xl sm:font-bold sm:mb-4 text-xl font-semibold mb-1 mt-4">
            My Bookmarks
          </h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
            {bookmarkedJobs &&
              bookmarkedJobs?.map((job) => (
                <div key={job._id}>
                  <div className="flex flex-col sm:gap-y-4 gap-y-1 sm:p-6 p-3 bg-[#bcd3d6] rounded-lg shadow-lg border border-gray-200 mb-4">
                    <div className="flex items-center justify-between"></div>
                    <div className="flex sm:gap-4 gap-1 items-center">
                      <div>
                        <h1 className="sm:font-semibold font-normal sm:text-lg text-xs text-gray-800">
                          {job?.company?.name}
                        </h1>
                        <h4 className="sm:text-sm text-sm font-bold text-gray-500">
                         Job Location : {job?.location}
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h1 className="sm:text-xl text-sm sm:font-bold font-semibold text-gray-800 mb-2">
                        {job?.title}
                      </h1>
                      <p className="text-sm text-gray-600">
                        {job?.description}
                      </p>
                    </div>
                    <div className="flex sm:flex-row  w-fit flex-wrap sm:gap-2 gap-1 sm:mt-3 mt-1.5">
                      <div className="bg-[#6A3AC2] text-white sm:text-lg text-sm font-semibold sm:px-3 px-1 py-1 sm:py-1 rounded">
                        {job?.jobType ? job.jobType : "N/A"}
                      </div>
                      <div className="bg-[#F83002] text-white font-semibold sm:px-3 px-1 py-1 sm:py-1 rounded">
                        {job?.position ? `${job.position} Positions` : "N/A"}
                      </div>
                      <div className="bg-[#7289b7] text-white font-semibold sm:px-3 px-1 py-1 sm:py-1 rounded">
                        {job?.salary ? `${job.salary} LPA` : "N/A"}
                      </div>
                    </div>
                    <div className="flex sm:flex-row flex-col sm:gap-4 gap-1 sm:mt-5 mt-1.5">
                      <Button
                        onClick={() => navigate(`/jobs/description/${job._id}`)}
                        variant="outline"
                        className="border-[#6A3AC2] text-[#6A3AC2] hover:bg-[#6A3AC2] sm:text-normal sm:w-full w-fit text-xs hover:text-white transition-colors"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Bookmark;
