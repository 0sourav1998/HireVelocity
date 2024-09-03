import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { userEndPoints } from "../apis";
import { setLoading, setToken, setUser } from "@/components/redux/Slice/authslice";

const { SIGNUP , LOGIN , UPDATE_PROFILE} = userEndPoints;

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
      console.log(response)
      if(response?.data?.success){
        navigate("/");
        dispatch(setUser(response?.data?.existingUser))
        dispatch(setToken(response?.data?.token))
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

export const updateProfileOp = async(body,token) =>{
  let result ;
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT",UPDATE_PROFILE,body,{
        "Content-Type" : "multipart/form-data" ,
        Authorization : `Bearer ${token}`
    });
    if(response?.data?.success){
      result = response?.data?.user;
      toast.success("Profile Updated")
    }
  } catch (error) {
    console.error(error.message)
  }finally{
    toast.dismiss(toastId)
  }
  return result ;
}
