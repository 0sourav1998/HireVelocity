import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchText } from "./redux/Slice/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [query,setQuery] = useState("");
  const searchJobHandler = ()=>{
    dispatch(setSearchText(query));
    navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-y-5">
        <span className="sm:px-4 sm:py-2 px-4 py-1 rounded-full bg-gray-100 text-[#F83002] font-medium mt-4 mx-auto">
          No.1 Job Site
        </span>
        <h1 className="sm:text-4xl sm:font-bold text-2xl font-semibold">
          Search , Apply &{" "}
          <span className="text-[#6A3AC2]">Get Your Dream Job</span>
        </h1>
        <p>
        Find your dream job with ease on our portal, connecting top talent with the best opportunities in every industry.
        </p>
        <div className="flex items-center sm:w-[40%] w-[95%] mx-auto shadow-lg shadow-gray-200 gap-2">
          <input
            placeholder="Find Your Dream Job"
            type="text"
            onChange={(e)=>setQuery(e.target.value)}
            className="p-3 w-full outline-none focus:ring-2 focus:ring-blue-100 rounded-md"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A3AC2] hover:bg-slate-500 transition-all duration-200">
            <Search className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
