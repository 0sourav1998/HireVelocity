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
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableCaption className="text-lg font-semibold text-gray-800 mb-6">
            Your Applied Jobs
          </TableCaption>
          <TableHeader className="bg-gray-200 text-gray-700 text-sm">
            <TableRow>
              <TableHead className="py-4">Date</TableHead>
              <TableHead className="py-4">Company</TableHead>
              <TableHead className="py-4">Job Role</TableHead>
              <TableHead className="py-4 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {studentAppliedJobs?.map((appliedJob, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 transition duration-300"
              >
                <TableCell className="py-4 px-6">
                  {appliedJob?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="py-4 px-6">
                  {appliedJob?.job?.company?.name}
                </TableCell>
                <TableCell className="py-4 px-6">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="py-4 px-6 text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "Accept"
                        ? "bg-green-500"
                        : appliedJob.status === "Reject"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    } text-white px-4 py-1 rounded-full`}
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
