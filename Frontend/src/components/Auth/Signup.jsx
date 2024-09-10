import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/operations/UserOperations";
import { setLoading } from "../redux/Slice/authslice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("role", role);
    if (image) {
      formData.append("file", image);
    }
    dispatch(setLoading(true));
    try {
      await signup(formData, navigate);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto sm:py-10 py-3">
        <form
          className="w-[95%] sm:w-1/3 border border-gray-200 rounded-md sm:p-6 p-3 bg-white shadow-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center sm:text-3xl text-xl font-semibold sm:mb-6 mb-3">Sign Up</h1>
          <div className="sm:mb-4 mb-2">
            <Label className="sm:mb-2 mb-1.5">Full Name</Label>
            <Input
              type="text"
              placeholder="Enter Your Full Name"
              value={fullName}
              name="fullName"
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="sm:mb-4 mb-2">
            <Label className="sm:mb-2 mb-1.5">Email</Label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="sm:mb-4 mb-2">
            <Label className="sm:mb-2 mb-1.5">Phone Number</Label>
            <Input
              type="number"
              placeholder="Enter Your Phone Number"
              value={phoneNumber}
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="sm:mb-4 mb-2">
            <Label className="sm:mb-2 mb-1.5">Password</Label>
            <Input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col justify-between items-center gap-y-4 mb-6">
            <RadioGroup className="flex gap-8 ">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={(e) => setRole(e.target.value)}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="cursor-pointer">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={role === "recruiter"}
                  onChange={(e) => setRole(e.target.value)}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2" className="cursor-pointer">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col">
              <Label className="sm:mb-2 mb-1.5">Profile Image</Label>
              <Input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => setImage(e.target.files?.[0])}
                className="p-2 border border-gray-300 rounded-md bg-gray-50 cursor-pointer"
              />
            </div>
          </div>

          {!loading ? (
            <Button
              className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
              type="submit"
            >
              Sign Up
            </Button>
          ) : (
            <Button className="w-full p-3 rounded-md bg-gray-600 text-white">
              Please wait ...
            </Button>
          )}
          <p className="text-sm mt-4 text-center">
            Already Have an Account?{" "}
            <Link to="/login">
              <span className="text-blue-600 hover:text-blue-800 transition duration-200">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
