import { toast } from "sonner"
import { apiConnector } from "../apiConnector"
import {jobEndPoints} from "../apis" 
import { useSelector } from "react-redux"

const {GET_ALL_JOBS , GET_JOB_BY_JOBID} = jobEndPoints


export const getAllJobs = async()=>{
    const toastId = toast.loading("Loading...")
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
    }finally{
        toast.dismiss(toastId)
    }
    return result ;
}

// export const fetchJobById = async(body)=>{
//     const jobId = useSelector((state)=>state.job.singleJob._id)
//     console.log("BODY",body)
//     let result ;
//     try {
//         const response = await apiConnector("POST",`GET_JOB_BY_JOBID/`,body)
//         console.log("Rsponse",response)
//         if(response?.data?.success){
//             result = response?.data?.job;
//         }
//     } catch (error) {
//         console.log(error.message)
//     }
//     return result ;
// }
