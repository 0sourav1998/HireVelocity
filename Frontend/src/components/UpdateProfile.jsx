import React, { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Cross, CrossIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileOp } from "@/services/operations/UserOperations";
import { setUser } from "./redux/Slice/authslice";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const {token} = useSelector((state)=>state.user)
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e)=>{
    setInput({...input , [e.target.name] : e.target.value })
  }
  const changeFileHandler=(e)=>{
    setInput({...input , file : e.target.files[0]})
  }

  const handleFormSubmit =async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName",input.fullName)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("bio",input.bio)
    formData.append("skills",input.skills)
    formData.append("file",input?.file)
    try {
      const result = await updateProfileOp(formData,token);
      dispatch(setUser(result))
      setOpen(false)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {}, []);
  return (
    <div className="fixed backdrop-blur-sm flex flex-col items-center justify-center overflow-auto top-0 inset-0 !mt-0 z-1000">
      <div className="relative text-black h-fit w-fit bg-white p-8 rounded-md shadow-lg">
        <h1 className="mb-4">Update Your Profile</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="flex gap-3 items-center mb-3">
            <Label htmlFor="name">Name</Label>
            <Input onChange={changeEventHandler} value={input.fullName} id="name" name="fullName" className="col-span-3" />
          </div>
          <div className="flex gap-3 items-center mb-3">
            <Label htmlFor="email">Email</Label>
            <Input onChange={changeEventHandler} value={input.email} id="email" name="email" className="col-span-3" />
          </div>
          <div className="flex gap-3 items-center mb-3">
            <Label htmlFor="number">Number</Label>
            <Input onChange={changeEventHandler} value={input.phoneNumber} id="number" name="phoneNumber" className="col-span-3" />
          </div>
          <div className="flex gap-3 items-center mb-3">
            <Label htmlFor="bio">Bio</Label>
            <Input onChange={changeEventHandler} value={input.bio} id="bio" name="bio" className="col-span-3" />
          </div>
          <div className="flex gap-3 items-center mb-3">
            <Label htmlFor="skills">Skills</Label>
            <Input onChange={changeEventHandler} value={input.skills} id="skills" name="skills" className="col-span-3" />
          </div>
          <div className="flex gap-3 items-center mb-3">
            <Label htmlFor="file">Resume</Label>
            <Input
              type="file"
              onChange={changeFileHandler}
              accept="application/pdf"
              id="file"
              name="file"
              className="col-span-3"
            />
          </div>
          {loading ? (
            <Button
              className="w-full p-2 rounded-md bg-black text-white mt-3"
              type="submit"
            >
              Please Wait...
            </Button>
          ) : (
            <Button
              className="w-full p-2 rounded-md bg-black text-white mt-3"
              type="submit"
            >
              Update
            </Button>
          )}
        </form>
        <CrossIcon
          className="absolute top-8 right-8 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default UpdateProfile;
