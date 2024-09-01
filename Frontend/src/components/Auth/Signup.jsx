import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroupItem } from "../ui/radio-group";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto mb-10">
        <form className="w-1/2 border border-gray-200 rounded-md p-4">
          <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
          <div className="my-2">
            <Label className="mb-1">Full Name</Label>
            <Input type="text" placeholder="Enter Your Full Name" />
          </div>
          <div className="my-2">
            <Label className="mb-1">Email</Label>
            <Input type="text" placeholder="Enter Your Full Name" />
          </div>
          <div className="my-2">
            <Label className="mb-1">Full Name</Label>
            <Input type="email" placeholder="Enter Your Email" />
          </div>
          <div className="my-2">
            <Label className="mb-1">Phone Number</Label>
            <Input type="number" placeholder="Enter Your Phone Number" />
          </div>
          <div className="my-2">
            <Label className="mb-1">Password</Label>
            <Input type="password" placeholder="Enter Your Password" />
          </div>
          <div className="flex justify-between">
            <div>
              <RadioGroup className="flex gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-y">
              <Label>Profile Image</Label>
              <Input
                type="file"
                accept="image/*"
                className="p-2 mt-3 border-dashed border-gray-400 bg-slate-800 text-white cursor-pointer"
              />
            </div>
          </div>
          <Button className="w-full p-2 rounded-md bg-black text-white mt-3">Sign Up</Button>
          <p className="text-sm mt-2">Already Have an Account ? <Link to="/login"><span className="text-blue-600">Login</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
