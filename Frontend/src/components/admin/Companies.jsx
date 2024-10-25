import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ComapnyTable from "./ComapnyTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsearchCompany } from "../redux/Slice/companySlice";
import Footer from "../shared/Footer";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    dispatch(setsearchCompany(searchInput));
  }, [searchInput, dispatch]);
  return (
    <div className="flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-7xl sm:mx-auto mx-4 sm:my-10 my-5 ">
          <div className="sm:max-w-6xl mx-auto flex sm:flex-row flex-col justify-between gap-y-4">
            <Input
              className="w-fit"
              placeholder="Filter by name"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button
              className="bg-black text-white rounded-md w-fit"
              onClick={() => navigate("/admin/comapanies/createCompany")}
            >
              New Company
            </Button>
          </div>
          <ComapnyTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
