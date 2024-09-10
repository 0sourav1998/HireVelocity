import { toast } from "sonner"
import { apiConnector } from "../apiConnector"
import {jobEndPoints} from "../apis" 
import { applicationEndPoints } from "../apis"

const {GET_ALL_JOBS , GET_ADMIN_JOBS , CREATE_JOB , GET_JOB_BY_JOB_ID , UPDATE_JOB , DELETE_JOB} = jobEndPoints
const {GET_APPLIED_JOBS} = applicationEndPoints;


export const getAllJobs = async()=>{
    let result ;
    try {
        const response = await apiConnector("GET",GET_ALL_JOBS)
        if(response?.data?.success){
            result = response?.data?.job;
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
        if(response?.data?.success){
            result = response?.data?.appliedJobs
        }
    } catch (error) {
        console.log(error.message)
    }
    return result ;
}

export const fetchJobById = async(body,token)=>{
    let result ;
    try {
        const response = await apiConnector("POST",GET_JOB_BY_JOB_ID,body , {
            Authorization : `Bearer ${token}`
        })
        if(response?.data?.success){
            result = response?.data?.job
        }
    } catch (error) {
        console.log(error)
    }
    return result ;
}

export const updateJob = async(body,token)=>{
    let result ;
    try {
        const response = await apiConnector("PUT",UPDATE_JOB,body,{
            Authorization : `Bearer ${token}`
        })
        if(response?.data?.success){
            result = response?.data?.job
        }
    } catch (error) {
        console.log(error)
    }
    return result
}

export const deleteJob = async(body,token)=>{
    try {
        await apiConnector("DELETE",DELETE_JOB,body,{
            Authorization : `Bearer ${token}`
        })
    } catch (error) {
        console.log(error)
    }
}