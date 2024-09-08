import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { userEndPoints } from "../../services/apis";
import axios from "axios";
import { setToken, setUser } from "../redux/Slice/authslice";
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const { LOGOUT } = userEndPoints;
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const toastId = toast.loading("Loading...");
    try {
      dispatch(setUser(null));
      dispatch(setToken(null));
      navigate("/");
      toast.success("Logged Out");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    } finally {
      toast.dismiss(toastId);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <div>
          <h1 onClick={()=>navigate("/")} className="text-2xl font-bold cursor-pointer">
            Hire<span className="text-[#F83002]">Velocity</span>
          </h1>
        </div>
        <div className="flex gap-4 h-14 items-center">
          <div>
            <ul className="flex justify-between gap-5">
              {user?.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4>{user?.fullName}</h4>
                      <p className="text-sm text-gray-500">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-2">
                    {user && user?.role === "student" && (
                      <div className="flex flex-row gap-4 items-center">
                        <User2 />
                        <Link to="/link">
                          <Button variant="link">User Profile</Button>
                        </Link>
                      </div>
                    )}
                    <div className="flex flex-row gap-4 items-center">
                      <LogOut />
                      <Button onClick={handleLogout} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button
                  className="text-white bg-[#6A38C2] hover:bg-[#4d1f9c] transition-all duration-200 hover:scale-95"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
