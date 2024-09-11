import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { userEndPoints } from "../apis";
import { setLoading, setToken, setUser } from "@/components/redux/Slice/authslice";

const { SIGNUP , LOGIN , UPDATE_PROFILE , ADD_BOOKMARK} = userEndPoints;

export const signup = async (body,navigate) => {
  let result;
  try {
    const response = await apiConnector("POST", SIGNUP, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
        sessionStorage.setItem("user",JSON.stringify(response?.data?.existingUser))
        sessionStorage.setItem("token",JSON.stringify(response?.data?.token))
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

export const addJobToBookmark = async(body,token)=>{
  let result ;
  try {
    const response = await apiConnector("POST",ADD_BOOKMARK,body,{
      Authorization : `Bearer ${token}`
    });
    if(response?.data?.success){
      result = response?.data?.jobs
      toast.success(response?.data?.message)
    }
  } catch (error) {
    console.log(error.message)
  }
  return result;
}
