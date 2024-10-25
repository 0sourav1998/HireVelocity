import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createJob } from "@/services/operations/JobOperations";
import { toast } from "sonner";
import Footer from "../shared/Footer";


const CreateJob = () => {
  const { allCompanies } = useSelector((state) => state.company);
  const {token} = useSelector((state)=>state.user)
  const [loading,setLoading] = useState(false)
  const navigate =  useNavigate()
  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    position: "",
    requirements: "",
    salary: 0,
    experiance: 0,
    companyId: "",
  });
  const handleChangeFuncton = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
        await createJob(input,token);
        toast.success("Job Created Successfully")
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
    navigate("/admin/jobs")
  };

  const changeSelectHandler = (value) => {
    const companyDetails = allCompanies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: companyDetails._id });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between sm:gap-y-6 gap-y-4">
      <div>
      <Navbar />
      <div className="container max-w-2xl mx-auto sm:p-8 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="sm:text-4xl text-2xl sm:font-bold font-semi mb-2 text-center">Create A Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="sm:mb-4 mb-2">
            <Label
              htmlFor="title"
              className="block sm:mb-2 mb-1 text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input
              placeholder="Enter Job Title"
              id="title"
              required
              name="title"
              value={input.title}
              className="w-full sm:p-3 p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChangeFuncton}
            />
          </div>
          <div className="sm:mb-4 mb-2">
            <Label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Input
              placeholder="Enter Job Description"
              id="description"
              value={input.description}
              name="description"
              required
              className="w-full sm:p-3 p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChangeFuncton}
            />
          </div>
          <div className="sm:mb-4 mb-2">
            <Label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Location
            </Label>
            <Input
              placeholder="Enter Job Location"
              id="location"
              value={input.location}
              required
              name="location"
              className="w-full sm:p-3 p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChangeFuncton}
            />
          </div>
          <div className="sm:mb-4 mb-2">
            <Label
              htmlFor="experiance"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Experience
            </Label>
            <Input
              placeholder="Experience Required"
              id="experiance"
              value={input.experiance}
              required
              type="number"
              name="experiance"
              className="w-full sm:p-3 p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChangeFuncton}
            />
          </div>
          <div className="sm:mb-4 mb-2">
            <Label
              htmlFor="requirements"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Requirements
            </Label>
            <Input
              placeholder="Enter Job Requirements"
              id="requirements"
              value={input.requirements}
              name="requirements"
              required
              className="w-full sm:p-3 p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChangeFuncton}
            />
          </div>
          <div className="flex sm:flex-row flex-col gap-x-8 sm:items-center">
            <div className="mb-4">
              <Label
                htmlFor="position"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Number Of Positions
              </Label>
              <Input
                placeholder="Enter Job Position"
                id="position"
                type="number"
                value={input.position}
                name="position"
                required
                className="w-full sm:p-3 p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChangeFuncton}
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="jobType"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Job Type
              </Label>
              <Input
                placeholder="Enter Job Type"
                id="jobType"
                value={input.jobType}
                name="jobType"
                required
                className="w-full sm:p-3 p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChangeFuncton}
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="salary"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Salary(LPA)
              </Label>
              <Input
                placeholder="Salary"
                type="number"
                id="salary"
                required
                name="salary"
                value={input.salary}
                className="w-full sm:p-3 p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChangeFuncton}
              />
            </div>
          </div>
          <div className="mb-4">
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Company
            </Label>
            {allCompanies?.length > 0 && (
              <Select required onValueChange={changeSelectHandler}>
                <SelectTrigger className="w-full sm:p-3 p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCompanies?.map((company, index) => (
                      <SelectItem
                        value={company?.name?.toLowerCase()}
                        key={index}
                        name="company"
                        onChange={handleChangeFuncton}
                      >
                        {company?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <Button
            variant="outline"
            type="submit"
            className="w-full sm:p-3 p-1.5 mt-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            {
                loading ? "Loading..." : "Create"
            }
          </Button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default CreateJob;
