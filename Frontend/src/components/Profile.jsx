import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Navbar from "./shared/Navbar";
import { Badge, Contact, Edit2, Mail } from "lucide-react";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import EditProfile from "./UpdateProfile";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const isHaveResume = true;
  const [open, setOpen] = useState(false);
  const {user} = useSelector((state)=>state.user)
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto border border-gray-400 p-8 my-5">
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://tse4.mm.bing.net/th?id=OIP.2AmwrTnE_ys6QNCFe6iKRwHaHa&pid=Api&P=0&h=180" />
            </Avatar>
            <div>
              <h1 className="font-bold text-xl">{user?.fullName}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Edit2 onClick={() => setOpen(true)} className="cursor-pointer" />
        </div>
        <div className="mt-3">
          <div className="flex gap-4">
            <Mail />
            <p>{user?.email}</p>
          </div>
          <div className="flex gap-4">
            <Contact />
            <p>{user?.phoneNumber}</p>
          </div>
        </div>
        <div className="mt-2">
          <h1 className="text-xl">Skills</h1>
          {user?.profile?.skills.length === 0 ? (
            <h3>N/A</h3>
          ) : (
            <div className="flex items-center gap-3 mt-1">
              {user?.profile?.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-800 rounded-full text-white py-1 px-4"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Label className="font-bold text-lg">Resume</Label>
          {isHaveResume ? (
            <a
              target="blank"
              className="w-full cursor-pointer hover:underline text-blue-800"
            >
              Sourav Resume
            </a>
          ) : (
            <span>N/A</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-md">
        <h1 className="text-xl text-black font-semibold mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      {
        open && <UpdateProfile open={open} setOpen={setOpen} />
      }
    </div>
  );
};

export default Profile;
