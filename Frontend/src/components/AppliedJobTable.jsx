import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { appliedJobsForStudents } from "@/services/operations/JobOperations";
import { useDispatch, useSelector } from "react-redux";
import { setStudentAppliedJobs } from "./redux/Slice/jobSlice";

const AppliedJobTable = () => {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { studentAppliedJobs } = useSelector((state) => state.job);

  const appliedJobs = async () => {
    try {
      const result = await appliedJobsForStudents(token);
      dispatch(setStudentAppliedJobs(result));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    appliedJobs();
  }, [user._id]);

  return (
    <div className="sm:container w-[100%] mx-auto sm:p-6 p-0">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableCaption className="sm:text-lg text-xs font-semibold text-gray-800 sm:mb-6 mb-2">
            Your Applied Jobs
          </TableCaption>
          <TableHeader className="bg-gray-200 text-gray-700 sm:text-sm text-xs">
            <TableRow>
              <TableHead className="sm:py-4 py-2">Date</TableHead>
              <TableHead className="sm:py-4 py-2">Company</TableHead>
              <TableHead className="sm:py-4 py-2">Title</TableHead>
              <TableHead className="sm:py-4 py-2 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {studentAppliedJobs?.map((appliedJob, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 transition duration-300"
              >
                <TableCell className="sm:px-4 sm:py-6 px-2 py-3">
                  {appliedJob?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="sm:px-4 sm:py-6 px-2 py-3">
                  {appliedJob?.job?.company?.name}
                </TableCell>
                <TableCell className="sm:px-4 sm:py-6 px-4 py-3">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="sm:px-4 sm:py-6 px-2 py-3 text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "Accept"
                        ? "bg-green-500"
                        : appliedJob.status === "Reject"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    } text-white sm:px-4 sm:py-2 px-2 py-1 rounded-full`}
                  >
                    {appliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
