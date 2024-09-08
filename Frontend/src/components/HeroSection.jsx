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
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto">
          No.1 Job Site
        </span>
        <h1 className="text-4xl font-bold">
          Search , Apply &{" "}
          <span className="text-[#6A3AC2]">Get Your Dream Job</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          eveniet in alias. Veniam, voluptatum vitae.
        </p>
        <div className="flex items-center w-[40%] mx-auto shadow-lg shadow-gray-200 gap-2">
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
