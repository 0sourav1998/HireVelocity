import {
  deleteCompany,
  getJobById,
  updateCompany,
} from "@/services/operations/companyOperatons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import axios from "axios";

const EditCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState("");
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCompanyById = async () => {
    try {
      const response = await getJobById({ id: id }, token);
      setCompany(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [input, setInput] = useState(() => ({
    companyName: "",
    description : "" ,
    location: "",
    website: "",
    logo: null,
  }));

  const handleDeleteCompany = async()=>{
    try {
      await deleteCompany({companyId : id}, token)
      navigate("/admin/companies")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("companyId", id);
    formData.append("name", input.companyName);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    if(input.logo){
      formData.append("file", input.logo);
    }
    setLoading(true);
    try {
      await updateCompany(formData, token);
      navigate("/admin/companies");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e?.target?.name]: e?.target?.value });
  };

  const handleFileChange = (e) => {
    const logo = e?.target?.files[0];
    setInput({ ...input, logo });
  };

  useEffect(() => {
    if (company) {
      setInput({
        companyName: company.name || "",
        description: company.description || "" ,
        location: company.location || "",
        website: company.website || "",
        logo: company.logo || null,
      });
    }
  }, [company]);

  useEffect(() => {
    fetchCompanyById();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col gap-y-6 max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Edit Company Details
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg font-medium text-gray-700">
            Company Name
          </label>
          <input
            id="name"
            name="companyName"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg p-3"
            value={input.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg font-medium text-gray-700">
            Company Description
          </label>
          <input
            id="name"
            name="description"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg p-3"
            value={input.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="location"
            className="text-lg font-medium text-gray-700"
          >
            Location
          </label>
          <input
            id="location"
            name="location"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg p-3"
            value={input.location}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="website"
            className="text-lg font-medium text-gray-700"
          >
            Website
          </label>
          <input
            id="website"
            name="website"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg p-3"
            value={input.website}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Company Logo
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg p-3"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            {loading ? "Please Wait..." : "Save Changes"}
          </button>
          <button onClick={handleDeleteCompany} className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200">
            Delete Company
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCompany
