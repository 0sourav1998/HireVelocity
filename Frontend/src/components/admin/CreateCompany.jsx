import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";

const CreateCompany = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-bld text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What you like to give name to your company ? You can change this
            later.
          </p>
        </div>
        <div className="flex flex-col mb-4">
          <Label className="text-lg mt-2">Company Name</Label>
          <Input placeholder="Your Company Name w-full mt-2" />
        </div>
        <div className="flex gap-4">
            <Button onClick={() => navigate("/admin/companies")}  variant="outline">Back</Button>
            <Button className="bg-[#6A3AC2] outline-none">Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
