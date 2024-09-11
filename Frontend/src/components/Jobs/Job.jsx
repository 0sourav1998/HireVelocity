import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { addJobToBookmark } from "@/services/operations/UserOperations";
import { useDispatch, useSelector } from "react-redux";
import { setBookmarkedJobs } from "../redux/Slice/jobSlice";
import { fetchBookmarked } from "@/services/operations/JobOperations";

const Job = ({ job }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { bookmarkedJobs } = useSelector((state) => state?.job);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleAddBookmark = async () => {
    const result = await addJobToBookmark({ jobId: job._id }, token);
    sessionStorage.setItem("bookmarks", JSON.stringify(result));
    dispatch(setBookmarkedJobs(result));
  };
  const getDateFunction = (date) => {
    const createdAtDate = new Date(date);
    const todayDate = new Date();
    const diff = todayDate - createdAtDate;
    return Math.floor(diff / (1000 * 24 * 60 * 60));
  };

  const isAlreadyBookmarked = () => {
    return bookmarkedJobs.some((bookmark) => bookmark?._id === job?._id);
  };
  const [bookmark, setBookmark] = useState([]);

  

  return (
    <div className="flex flex-col sm:gap-y-4 gap-y-1 sm:p-6 p-3 bg-[#bcd3d6] rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <h1 className="sm:text-xs text-[8px] text-gray-500">
          {getDateFunction(job?.createdAt) === 0
            ? "Today"
            : `${getDateFunction(job?.createdAt)} days ago`}
        </h1>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Bookmark
            className={`sm:h-5 sm:w-5 h-3 w-3 relative ${
              isAlreadyBookmarked() ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={handleAddBookmark}
          />
        </Button>
      </div>
      <div className="flex sm:gap-4 gap-1 items-center">
        <Avatar className="sm:w-12 sm:h-12 w-8 h-8">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="sm:font-semibold font-normal sm:text-lg text-xs text-gray-800">
            {job?.company?.name}
          </h1>
          <h4 className="sm:text-sm text-xs text-gray-500">{job?.location}</h4>
        </div>
      </div>
      <div>
        <h1 className="sm:text-xl text-sm sm:font-bold font-semibold text-gray-800 mb-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex sm:flex-row flex-col w-fit flex-wrap sm:gap-2 gap-1 sm:mt-3 mt-1.5">
        <Badge className="bg-[#6A3AC2] text-white font-semibold sm:px-3 px-1.5 py-1 sm:py-1 rounded">
          {job?.jobType}
        </Badge>
        <Badge className="bg-[#F83002] text-white font-semibold px-3 py-1 rounded">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-[#7289b7] text-white font-semibold px-3 py-1 rounded">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex sm:flex-row flex-col sm:gap-4 gap-1 sm:mt-5 mt-1.5">
        <Button
          onClick={() => navigate(`/jobs/description/${job._id}`)}
          variant="outline"
          className="border-[#6A3AC2] text-[#6A3AC2] hover:bg-[#6A3AC2] sm:text-normal sm:w-full w-fit text-xs hover:text-white transition-colors"
        >
          Details
        </Button>
        <Button className="bg-[#6A3AC2] sm:text-normal text-xs sm:w-full w-fit text-white hover:bg-[#53239a] transition-colors">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
