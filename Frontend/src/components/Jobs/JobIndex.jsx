import React, { useEffect, useState } from "react";
import FilterJob from "./FilterJob";
import Navbar from "../shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";

const JobIndex = () => {
  useGetAllJobs();
  const jobs = useSelector((state) => state.job.allJobs);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const filterGroup = useSelector((state) => state?.job?.filterGroup);
  useEffect(() => {
    if (filterGroup) {
      const finalFilteredResult = jobs?.filter(
        (job) =>
          job?.title?.toLowerCase()?.includes(filterGroup?.toLowerCase()) ||
          job?.description
            ?.toLowerCase()
            ?.includes(filterGroup?.toLowerCase()) ||
          job?.location?.toLowerCase()?.includes(filterGroup?.toLowerCase())
      );
      setFilteredJobs(finalFilteredResult);
    } else {
      setFilteredJobs(jobs);
    }
  }, [jobs, filterGroup]);
  return (
    <div>
      <Navbar />
      <div className="mt-5 max-w-7xl mx-auto">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterJob />
          </div>
          {jobs?.length === 0 ? (
            <span>No Jobs Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto mb-5">
              <div className="grid grid-cols-3 gap-4">
                {filteredJobs?.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
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
