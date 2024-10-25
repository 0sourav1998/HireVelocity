import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import { setSearchJob } from "../redux/Slice/jobSlice";
import useGetAdminJob from "../hooks/useGetAdminJob";
import Footer from "../shared/Footer";

const AdminJobs = () => {
  useGetAdminJob();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    dispatch(setSearchJob(searchInput));
  }, [searchInput, dispatch]);
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Navbar />
        <div className="max-w-6xl mx-auto my-10">
          <div className="flex sm:flex-row flex-col justify-between sm:ml-0 ml-4 gap-y-4">
            <Input
              className="w-fit"
              placeholder="Filter by name"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button
              className="bg-black text-white rounded-md w-fit"
              onClick={() => navigate("/admin/jobs/createJob")}
            >
              New Job
            </Button>
          </div>
          <AdminJobTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
