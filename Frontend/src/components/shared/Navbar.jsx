import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Bookmark, LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/Slice/authslice";
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { bookmarkedJobs } = useSelector((state) => state.job);

  const handleLogout = async () => {
    try {
      dispatch(setUser(null));
      dispatch(setToken(null));
      sessionStorage.clear();
      navigate("/");
      toast.success("Logged Out");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed");
    }
  };

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50 sm:mb-10 mb-2">
      <div className="flex items-center sm:justify-between justify-center max-w-7xl w-full mx-auto sm:h-16 h-24 px-6 sm:px-8 lg:px-10">
        <div className="flex items-center sm:space-x-4 space-x-1">
          <h1
            onClick={() => navigate("/")}
            className="hidden sm:block sm:text-2xl text-lg sm:font-bold font-semibold cursor-pointer"
          >
            Hire<span className="text-[#F83002]">Velocity</span>
          </h1>
        </div>
        <div className="flex sm:gap-6 gap-4 items-center">
          <ul className="flex justify-between sm:gap-5 gap-4">
            {user?.role === "recruiter" ? (
              <>
                <li className="sm:font-semibold font-normal hover:opacity-70 hover:border-b transition-all duration-200">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="sm:font-semibold font-normal hover:opacity-70 hover:border-b transition-all duration-200">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <div className="flex gap-4 mr-2">
                <li className="sm:font-semibold font-normal hover:opacity-70 hover:border-b transition-all duration-200">
                  <Link to="/">Home</Link>
                </li>
                <li className="sm:font-semibold font-normal hover:opacity-70 hover:border-b transition-all duration-200">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="sm:font-semibold font-normal hover:opacity-70 hover:border-b transition-all duration-200">
                  <Link to="/browse">Browse</Link>
                </li>
                {user?.role === "student" && (
                  <li className="cursor-pointer relative hover:border-b">
                    <Link to="/bookmark">
                      <Bookmark />
                    </Link>
                    <span className="absolute -top-4 -right-2 font-bold text-green-700 sm:text-lg rounded-full">
                      {bookmarkedJobs?.length}
                    </span>
                  </li>
                )}
              </div>
            )}
          </ul>
          <div className="flex items-center">
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        `https://api.dicebear.com/5.x/initials/svg?seed=${user?.fullName}`
                      }
                      className="rounded-full"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="sm:w-80 w-fit sm:p-4 p-4 border rounded-lg shadow-lg bg-slate-600 text-white">
                  <div className="flex gap-4 items-center">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          `https://api.dicebear.com/5.x/initials/svg?seed=${user?.fullName}`
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold sm:text-lg text-xs">
                        {user?.fullName}
                      </h4>
                      <div className="flex flex-wrap sm:text-sm text-[10px] text-gray-300">
                        <p className="text-wrap">{user?.profile?.bio}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:mt-4 mt-2">
                    {user?.role === "student" && (
                      <div className="flex flex-row sm:gap-4 gap-2 items-center">
                        <User2 />
                        <Link to="/link">
                          <Button variant="link">User Profile</Button>
                        </Link>
                      </div>
                    )}
                    <div className="flex flex-row sm:gap-4 gap-2 items-center sm:mt-2 mt-0">
                      <LogOut />
                      <Button
                        className="sm:text-lg text-sm"
                        onClick={handleLogout}
                        variant="link"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex sm:flex-row flex-col items-center gap-3">
                <button
                  className="bg-green-600 text-white sm:text-lg text-sm rounded-md sm:px-6 px-4 sm:py-2 py-1 hover:bg-green-500 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="text-white sm:text-lg text-sm rounded-md sm:px-6 px-4 sm:py-2 py-1 bg-[#6A38C2] hover:bg-[#4d1f9c] transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
