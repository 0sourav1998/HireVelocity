import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import { setSearchJob } from "../redux/Slice/jobSlice";
import useGetAdminJob from "../hooks/useGetAdminJob";


const AdminJobs = () => {
  useGetAdminJob()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    dispatch(setSearchJob(searchInput));
  }, [searchInput, dispatch]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex justify-between">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            className="bg-black text-white rounded-md"
            onClick={() => navigate("/admin/jobs/createJob")}
          >
            New Job
          </Button>
        </div>
        <AdminJobTable />
      </div>
    </div>
  );
};

export default AdminJobs ;
