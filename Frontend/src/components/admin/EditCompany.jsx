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
import Footer from "../shared/Footer";

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
      <div className="flex flex-col sm:gap-y-6 gap-y-3 max-w-4xl mx-auto sm:mt-10 mt-5 bg-white shadow-xl rounded-lg p-8 sm:mb-6 mb-4">
        <h1 className="sm:text-4xl sm:font-bold text-1.5xl font-semibold text-gray-800">
          Edit Company Details
        </h1>

        <div className="flex flex-col sm:gap-2 gap-1">
          <label htmlFor="name" className="sm:text-lg text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            id="name"
            name="companyName"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
            value={input.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col sm:gap-2 gap-1">
          <label htmlFor="description" className="sm:text-lg text-sm font-medium text-gray-700">
            Company Description
          </label>
          <input
            id="name"
            name="description"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
            value={input.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col sm:gap-2 gap-1">
          <label
            htmlFor="location"
            className="sm:text-lg text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            id="location"
            name="location"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
            value={input.location}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col sm:gap-2 gap-1">
          <label
            htmlFor="website"
            className="sm:text-lg text-sm font-medium text-gray-700"
          >
            Website
          </label>
          <input
            id="website"
            name="website"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg sm:p-3 p-1.5"
            value={input.website}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col sm:gap-2 gap-1">
          <label className="sm:text-lg text-sm font-medium text-gray-700">
            Company Logo
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg sm:p-3 p-1.5"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex sm:flex-row flex-col sm:gap-4 sm:mt-6 gap-2 mt-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 sm:text-lg text-sm text-white sm:px-6 sm:py-3 px-3 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            {loading ? "Please Wait..." : "Save Changes"}
          </button>
          <button onClick={handleDeleteCompany} className="bg-red-600 sm:text-lg text-sm text-white sm:px-6 sm:py-3 px-3 py-3 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200">
            Delete Company
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default EditCompany
