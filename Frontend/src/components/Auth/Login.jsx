import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/operations/UserOperations";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/Slice/authslice";

const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [role,setRole] = useState();
  const navigate = useNavigate();

  const loading = useSelector((state)=>state.user.loading);
  const dispatch = useDispatch()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    dispatch(setLoading(true))
    try {
      await login({email:email,password:password,role:role},navigate)
    } catch (error) {
      console.error(error)
    }finally{
      dispatch(setLoading(false))
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto mb-10 mt-10">
        <form className="w-1/2 border border-gray-200 rounded-md p-4" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-semibold">Login</h1>
          <div className="my-2">
            <Label className="mb-1">Email</Label>
            <Input type="text" placeholder="Enter Your Full Name" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="my-2">
            <Label className="mb-1">Password</Label>
            <Input type="password" placeholder="Enter Your Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className="flex justify-between">
            <div>
              <RadioGroup className="flex gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked = {role==="student"}
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
          </div>
          {
            loading ? <Button className="w-full p-2 rounded-md bg-black text-white mt-3" type="submit">Please Wait...</Button> : <Button className="w-full p-2 rounded-md bg-black text-white mt-3" type="submit">Login</Button>
          }
          
          <p className="text-sm mt-2">Dont Have an Account ? <Link to="/signup"><span className="text-blue-600">Sign up</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
