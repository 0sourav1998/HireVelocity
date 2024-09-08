import { toast } from "sonner"
import { apiConnector } from "../apiConnector"
import {applicationEndPoints} from "../apis" 

const {APPLY_JOB , GET_APPLICANTS , UPDATE_STATUS} = applicationEndPoints ;

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

export const getApplcants = async(body,token)=>{
    let result ;
    try {
        const response = await apiConnector("POST",GET_APPLICANTS,body,{
            Authorization : `Bearer ${token}`
        })
        result = response?.data?.job
    } catch (error) {
        console.log(error.message)
    }
    return result ;
}


export const jobResponse = async(body,token)=>{
    let result ;
    try {
        const response = await apiConnector("PUT",UPDATE_STATUS,body , {
            Authorization : `Bearer ${token}`
        })
        console.log(response)
        if(response?.data?.success){
            result = response?.data?.application
        }
    } catch (error) {
        console.log(error.message)
    }
    return result ;
}