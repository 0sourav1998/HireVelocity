import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { jobResponse } from "@/services/operations/applicationOperation";
import { toast } from "sonner";

const ApplicantsTable = () => {
  const sortlistingActions = ["Accept", "Reject"];
  const {token} = useSelector((state)=>state.user) ;
  const handleJobStatus = async(status,id)=>{
    try {
      await jobResponse({status: status , id : id},token) ;
      toast.success("Status Updated")
    } catch (error) {
      console.log(error.message)
    }
  }
  const { applicants } = useSelector((state) => state.applications);
  return (
    <div className="max-w-7xl mx-auto mt-8">
      <Table>
        <TableCaption>A List Of Applicants Applied For the Job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.map((applicant, index) => (
            <tr key={index}>
              <TableCell>{applicant?.applicant?.fullName}</TableCell>
              <TableCell>{applicant?.applicant?.email}</TableCell>
              <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
              <TableCell>{applicant?.applicant?.profile?.resume ? <a>{applicant?.applicant?.profile?.resume}</a> : "NA"}</TableCell>
              <TableCell>{applicant?.applicant?.createdAt.split("T")[0]}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="bg-white px-8 py-2 transition-all duration-200 rounded-md shadow-md">
                    {sortlistingActions?.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col w-fit items-center"
                      >
                        <span
                          className={`${
                            item === "Accept"
                              ? "text-green-500"
                              : "text-red-500"
                          } cursor-pointer mb-2`}
                          onClick={()=>handleJobStatus(item,applicant._id)}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
