import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "@/services/operations/companyOperatons";
import { toast } from "sonner";
import { setCompany } from "../redux/Slice/companySlice";
import Footer from "../shared/Footer";

const CreateCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateCompany = async () => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const result = await createCompany({ name: companyName }, token);
      const companyId = result._id;
      dispatch(setCompany(result));
      navigate(`/companies/setInfo/${companyId}`);
      toast.success("Company Created");
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };

  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <div className="max-w-4xl mx-auto sm:mt-8 sm:p-6 mt-4 p-3 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col gap-y-4 mb-6">
          <h1 className="font-bold sm:text-3xl text-xl text-gray-800">Create Your Company</h1>
          <p className="text-gray-600">
            What would you like to name your company? You can change this later.
          </p>
        </div>
        <div className="flex flex-col mb-8">
          <Label className="sm:text-lg text-sm font-medium text-gray-700">Company Name</Label>
          <Input
            placeholder="Enter your company name"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Back
          </Button>
          <Button
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            onClick={handleCreateCompany}
          >
            {loading ? "Loading..." : "Continue"}
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default CreateCompany;
