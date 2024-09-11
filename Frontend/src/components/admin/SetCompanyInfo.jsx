import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addCompanyDetails } from "@/services/operations/companyOperatons";
import useGetSingleCompanyById from "../hooks/useGetSingleCompanyById";

const SetCompanyInfo = () => {
  const { id } = useParams();
  useGetSingleCompanyById({ id: id });
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { singleCompanyById } = useSelector((state) => state.company);

  useEffect(()=>{
    input.description = singleCompanyById?.description ,
    input.location = singleCompanyById?.location ,
    input.website = singleCompanyById?.website 
  },[])

  const [input, setInput] = useState({
    description: "",
    location: "",
    website: "",
    file: null,
  });

  const handleChangeSubmit = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChangeSubmit = (e) => {
    const file = e?.target?.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyId", id);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    formData.append("file", input.file);

    setLoading(true);
    try {
      const result = await addCompanyDetails(formData, token);
      dispatch(result);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
    navigate("/admin/companies");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col max-w-3xl mx-auto sm:my-8 sm:p-6 my-4 p-3 bg-white shadow-md rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate("/admin/companies")} className="px-4 py-2">
            Back
          </Button>
          <h1 className="sm:text-2xl text-lg font-bold text-gray-700">Set up Your Company Details</h1>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <div className="flex items-center sm:gap-4 gap-2">
            <Label className="text-gray-600 font-medium w-32">Description</Label>
            <Input
              className="flex-grow sm:p-2 p-1 border border-gray-300 rounded-md"
              name="description"
              value={input.description}
              onChange={handleChangeSubmit}
              placeholder="Enter company description"
            />
          </div>
          <div className="flex sm:flex-row flex-col sm:gap-6 gap-3">
            <div className="flex items-center gap-4 sm:w-1/2 w-full">
              <Label className="text-gray-600 font-medium w-24">Location</Label>
              <Input
                className="flex-grow p-2 border border-gray-300 rounded-md w-full"
                name="location"
                value={input.location}
                onChange={handleChangeSubmit}
                placeholder="Enter location"
              />
            </div>
            <div className="flex items-center sm:gap-4 gap-2 sm:w-1/2 w-full">
              <Label className="text-gray-600 font-medium w-24">Website</Label>
              <Input
                className="flex-grow p-2 border border-gray-300 rounded-md w-full"
                name="website"
                value={input.website}
                onChange={handleChangeSubmit}
                placeholder="Enter website URL"
              />
            </div>
          </div>
          <div className="flex items-center sm:gap-4 gap-0">
            <Label className="text-gray-600 font-medium w-32">Logo</Label>
            <Input
              className="flex-grow p-2 border border-gray-300 rounded-md"
              type="file"
              accept="image/*"
              onChange={handleFileChangeSubmit}
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="primary"
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Loading..." : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetCompanyInfo;
