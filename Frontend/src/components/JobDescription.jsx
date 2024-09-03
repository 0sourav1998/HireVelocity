import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
    const isApplied = true ;
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-xl">Title</h1>
          <div className="flex items-center gap-3 mt-4">
            <Badge className={"bg-[#6A3AC2] font-bold "} variant="ghost">
              Part Time
            </Badge>
            <Badge className={"bg-[#F83002] font-bold"} variant="ghost">
              12 Positions
            </Badge>
            <Badge className={"bg-[#7289b7] font-bold"} variant="ghost">
              12 LPA
            </Badge>
          </div>
        </div>
        <Button disabled={isApplied} className={`rounded-lg text-white ${isApplied ? "bg-slate-700 cursor-not-allowed" : "bg-[#6A3AC2] cursor-pointer hover:bg-[#4b298a] "}`}>{isApplied ?  "Apllied" : "Apply Now"}</Button>
      </div>
      <h1 className="border-b-2 border-b-gray-600 mt-4 p-4">Job Description</h1>
      <div className="flex flex-col gap-y-3 mt-4">
        <h1 className="font-bold my-1">Role : <span className="text-gray-800 font-normal ml-4">Frontend Developer</span></h1>
        <h1 className="font-bold my-1">Description : <span className="text-gray-800 font-normal ml-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, ipsam!</span></h1>
        <h1 className="font-bold my-1">Location : <span className="text-gray-800 font-normal ml-4">Kolkata</span></h1>
        <h1 className="font-bold my-1">Experiance : <span className="text-gray-800 font-normal ml-4">2 years</span></h1>
        <h1 className="font-bold my-1">Salary : <span className="text-gray-800 font-normal ml-4">12 LPA</span></h1>
        <h1 className="font-bold my-1">Total Applicants : <span className="text-gray-800 font-normal ml-4">10</span></h1>
        <h1 className="font-bold my-1">Posted Date : <span className="text-gray-800 font-normal ml-4">18-02-1999</span></h1>
        
      </div>
    </div>
  );
};

export default JobDescription;
