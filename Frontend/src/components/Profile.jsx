import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Navbar from "./shared/Navbar";
import { Badge, Contact, Edit2, Mail } from "lucide-react";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const isHaveResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 my-10">
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://tse4.mm.bing.net/th?id=OIP.2AmwrTnE_ys6QNCFe6iKRwHaHa&pid=Api&P=0&h=180" />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">
                {user?.fullName}
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          <Edit2
            onClick={() => setOpen(true)}
            className="cursor-pointer text-gray-500 hover:text-gray-800 transition duration-300"
            size={24}
          />
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-4 text-gray-700">
            <Mail size={18} />
            <p>{user?.email}</p>
          </div>
          <div className="flex items-center gap-4 text-gray-700 mt-2">
            <Contact size={18} />
            <p>{user?.phoneNumber || "No phone number available"}</p>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-xl font-semibold text-gray-800">Skills</h1>
          {user?.profile?.skills.length === 0 ? (
            <h3 className="text-gray-600 mt-2">N/A</h3>
          ) : (
            <div className="flex flex-wrap gap-2 mt-3">
              {user?.profile?.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-600 text-white rounded-full py-1 px-4 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <Label className="font-bold text-lg text-gray-800">Resume</Label>
          {isHaveResume ? (
            <a
              target="blank"
              className="w-full cursor-pointer hover:underline text-blue-600"
              href={user?.profile?.resume}
            >
              {user?.fullName}'s Resume
            </a>
          ) : (
            <span className="text-gray-600">N/A</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      {open && <UpdateProfile open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Profile;
