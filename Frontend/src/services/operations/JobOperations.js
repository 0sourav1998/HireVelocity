import { toast } from "sonner"
import { apiConnector } from "../apiConnector"
import {jobEndPoints} from "../apis" 
import { applicationEndPoints } from "../apis"

const {GET_ALL_JOBS , GET_ADMIN_JOBS , CREATE_JOB } = jobEndPoints
const {GET_APPLIED_JOBS} = applicationEndPoints;


export const getAllJobs = async()=>{
    let result ;
    try {
        const response = await apiConnector("GET",GET_ALL_JOBS)
        console.log("response",response)
        if(response?.data?.success){
            console.log("Inside")
            result = response?.data?.job;
            console.log(result)
        }
    } catch (error) {
        console.log(error.message)
        toast.error("Failed To get Jobs")
    }
    return result ;
}



export const getJobsOfAdmin = async(token)=>{
    let result ;
    try {
        const response = await apiConnector("POST",GET_ADMIN_JOBS,null,{
            Authorization : `Bearer ${token}`
        })
        console.log("RESPONE",response)
        if(response?.data?.success){
            result = response?.data?.jobs
        }
    } catch (error) {
        console.log(error.message)
    }
    return result
}


export const createJob = async(body,token)=>{
    let result ;
    try {
        const response = await apiConnector("POST",CREATE_JOB , body , {
            Authorization : `Bearer ${token}`
        });
        if(response?.data?.success){
            result = response?.data?.createdJob
        }
    } catch (error) {
        console.log(error.message)
    }
    return result ;
}

export const appliedJobsForStudents = async(token)=>{
    let result ;
    try {
        const response = await apiConnector("GET",GET_APPLIED_JOBS,null ,{
            Authorization : `Bearer ${token}`
        })
        console.log(response)
        if(response?.data?.success){
            result = response?.data?.appliedJobs
        }
    } catch (error) {
        console.log(error.message)
    }
    return result ;
}