import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import {signup} from "../../services/operations/UserOperations"
import { setLoading } from "../redux/Slice/authslice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  console.log(image)
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch() ;
  const loading = useSelector((state)=>state.user.loading)

  const handleSubmit = async(e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("fullName",fullName);
    formdata.append("email" , email);
    formdata.append("password",password);
    formdata.append("phoneNumber",phoneNumber);
    formdata.append("role",role);
    if (image) {
      formdata.append("file", image);
    }
    dispatch(setLoading(true))
    try {
      await signup(formdata,navigate)
    } catch (error) {
      console.log(error)
    }finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto mb-10">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
          <div className="my-2">
            <Label className="mb-1">Full Name</Label>
            <Input
              type="text"
              placeholder="Enter Your Full Name"
              value={fullName}
              name="fullName"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="my-2">
            <Label className="mb-1">Email</Label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-2">
            <Label className="mb-1">Phone Number</Label>
            <Input
              type="number"
              placeholder="Enter Your Phone Number"
              value={phoneNumber}
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="my-2">
            <Label className="mb-1">Password</Label>
            <Input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <RadioGroup className="flex gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role==="student"}
                    onChange={(e) => setRole(e.target.value)}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={role==="recruiter"}
                    onChange={(e) => setRole(e.target.value)}
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
                name="image"
                onChange={(e) => setImage(e.target.files?.[0])}
                className="p-2 mt-3 border-dashed border-gray-400 bg-slate-800 text-white cursor-pointer"
              />
            </div>
          </div>
          {
            !loading ? <Button
            className="w-full p-2 rounded-md bg-black text-white mt-3"
            type="submit"
          >
            Sign Up
          </Button> : <Button
            className="w-full p-2 rounded-md bg-black text-white mt-3"
          >
            Please wait ...
          </Button>
          }
          <p className="text-sm mt-2">
            Already Have an Account ?{" "}
            <Link to="/login">
              <span className="text-blue-600">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
