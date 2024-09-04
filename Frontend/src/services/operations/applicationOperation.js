import { toast } from "sonner"
import { apiConnector } from "../apiConnector"
import {applicationEndPoints} from "../apis" 

const {APPLY_JOB} = applicationEndPoints ;

export const applyJobs = async(body,token)=>{
    let result ;
    let resultTwo ;
    try {
        const response = await apiConnector("POST",APPLY_JOB,body,{
                Authorization : `Bearer ${token}`  
        });
        console.log("Response",response)
        if(response?.data?.success){
            toast.success("Applied");
            result = response?.data?.updateUser
            resultTwo = response?.data?.updatedJob
        }
    } catch (error) {
        console.log(error.message)
        toast.error("Error")
    }
    return {result,resultTwo} ;
}