import React from "react";
import FilterJob from "./FilterJob";
import Navbar from "../shared/Navbar";
import Job from "./Job";

const JobIndex = () => {
  const jobs = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <Navbar />
      <div className="mt-5 max-w-7xl mx-auto">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterJob />
          </div>
          {jobs.length === 0 ? (
            <span>No Jobs Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto mb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobs.map((job, index) => (
                  <Job key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobIndex;
