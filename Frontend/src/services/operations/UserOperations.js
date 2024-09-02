import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { userEndPoints } from "../apis";
import { setLoading, setUser } from "@/components/redux/Slice/authslice";

const { SIGNUP , LOGIN} = userEndPoints;

export const signup = async (body,navigate) => {
    console.log(body)
  let result;
  try {
    const response = await apiConnector("POST", SIGNUP, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    if (response?.data?.success) {
      navigate("/login")
      toast.success(response?.data?.message)
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Signip Failed")
  }
  return result;
};

export const login =(body,navigate)=>{
  return async(dispatch)=>{
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST",LOGIN,body);
      if(response?.data?.success){
        navigate("/");
        dispatch(setUser(response?.data?.existingUser))
        toast.success("Welcome Back");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Login Failed")
    }finally{
      dispatch(setLoading(false))
    }
  }
}
