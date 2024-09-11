import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { PopoverContent } from "@radix-ui/react-popover";
import { useDispatch, useSelector } from "react-redux";
import { jobResponse } from "@/services/operations/applicationOperation";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { setStatus } from "../redux/Slice/applicationSlice";

const ApplicantsTable = () => {
  const dispatch = useDispatch()
  const sortlistingActions = ["Accept", "Reject"];
  const { token } = useSelector((state) => state.user);

  const handleJobStatus = async (status, id) => {
    try {
      const response = await jobResponse({ status: status, id: id }, token);
      sessionStorage.setItem("status",JSON.stringify(response))
        dispatch(setStatus(response))
        toast.success("Status Updated");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to update status");
    }
  };


  const { applicants } = useSelector((state) => state.applications);

  return (
    <div className="sm:max-w-7xl max-w-[290px] mx-auto sm:mt-8 sm:p-6 mt-6 p-4 bg-white rounded-lg shadow-lg">
      <Table className="w-full text-sm">
        <TableCaption className="text-lg font-semibold mb-4">
          List of Applicants
        </TableCaption>
        <TableHeader className="bg-gray-200 text-gray-700 p-2">
          <TableRow>
            <TableHead className="p-3">Full Name</TableHead>
            <TableHead className="p-3">Email</TableHead>
            <TableHead className="p-3">Contact</TableHead>
            <TableHead className="p-3">Resume</TableHead>
            <TableHead className="p-3">Date</TableHead>
            <TableHead className="p-3">Current Status</TableHead>
            <TableHead className="p-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.length === 0 ? (
            <TableRow>
              <TableCell colSpan="7" className="text-center py-4 text-gray-500">
                No applicants found
              </TableCell>
            </TableRow>
          ) : (
            applicants?.map((applicant, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 gap-x-4"
              >
                <TableCell>{applicant?.applicant?.fullName}</TableCell>
                <TableCell>{applicant?.applicant?.email}</TableCell>
                <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {applicant?.applicant?.profile?.resume ? (
                    <a
                      href={applicant?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell>
                  {new Date(applicant?.applicant?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell  className={`flex justify-center items-center rounded-lg text-sm font-medium ${
                    applicant?.status === "Reject" ? "bg-red-600 text-white" :
                    applicant?.status === "Accept" ? "bg-blue-600 text-white" :
                    "bg-gray-600 text-white"
                  }`}>
                  <Badge>{applicant?.status}</Badge>
                </TableCell>
                <TableCell className="p-3 text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer text-gray-500 hover:text-gray-700">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="bg-white p-2 rounded-md shadow-lg border border-gray-300">
                      {sortlistingActions?.map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-center p-2 rounded-md cursor-pointer ${
                            item === "Accept" ? "hover:bg-green-100" : "hover:bg-red-100"
                          }`}
                          onClick={() => handleJobStatus(item, applicant._id)}
                        >
                          <span
                            className={`${
                              item === "Accept" ? "text-green-600" : "text-red-600"
                            } font-semibold`}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
