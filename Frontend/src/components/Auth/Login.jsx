import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto mb-10 mt-10">
        <form className="w-1/2 border border-gray-200 rounded-md p-4">
          <h1 className="text-center text-2xl font-semibold">Login</h1>
          <div className="my-2">
            <Label className="mb-1">Email</Label>
            <Input type="text" placeholder="Enter Your Full Name" />
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
          </div>
          <Button className="w-full p-2 rounded-md bg-black text-white mt-3">Login</Button>
          <p className="text-sm mt-2">Dont Have an Account ? <Link to="/signup"><span className="text-blue-600">Sign up</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
