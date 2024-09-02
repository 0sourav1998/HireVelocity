import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Hire<span className="text-[#F83002]">Velocity</span>
          </h1>
        </div>
        <div className="flex gap-4 h-14 items-center">
          <div>
            <ul className="flex justify-between gap-5">
              <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
            </ul>
          </div>
          <div>
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4>Sourav Bhattacherjee</h4>
                      <p className="text-sm text-gray-500">Bio Here</p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-2">
                    <div className="flex flex-row gap-4 items-center">
                      <User2 />
                      <Button variant="link">User Profile</Button>
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                      <LogOut />
                      <Button variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={()=>navigate("/login")}>
                  Login
                </Button>
                <Button
                  className="text-white bg-[#6A38C2] hover:bg-[#4d1f9c] transition-all duration-200 hover:scale-95"
                  onClick={()=>navigate("/signup")}
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
