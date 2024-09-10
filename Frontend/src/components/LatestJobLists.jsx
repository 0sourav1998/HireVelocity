import React from "react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const LatestJobLists = ({ job }) => {
  return (
    <div className="flex flex-col gap-y-4 mr-4 mb-4 bg-white shadow-xl rounded-md sm:p-5 p-2 border border-gray-100 cursor-pointer">
      <Link to={`/jobs/description/${job._id}`}>
        <div>
          <h1 className="text-lg font-medium">{job?.company?.name}</h1>
          <p className="text-gray-500 text-sm">{job?.location}</p>
        </div>
        <div>
          <h1 className="my-2 font-bold text-lg">{job?.title}</h1>
          <p className="text-sm text-gray-600">{job?.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={"bg-[#6A3AC2] sm:font-bold font-semibold sm:text-sm text-[10px] sm:mt-4 mt-2"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"bg-[#F83002] sm:font-bold font-semibold sm:text-sm text-[10px] sm:mt-4 mt-2"} variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className={"bg-[#7289b7] sm:font-bold font-semibold sm:text-sm text-[10px] sm:mt-4 mt-2"} variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
      </Link>
    </div>
  );
};

export default LatestJobLists;
