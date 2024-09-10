import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import {companyEndPoints} from "../apis"

const {CREATE_COMPANY , UPDATE_COMPANY_DETAILS , GET_ALL_COMPANIES , GET_COMPANY_BY_ID ,DELETE_COMPANY} = companyEndPoints;

export const createCompany = async(body,token)=>{
    let result ;
    try {
        const response = await apiConnector("POST",CREATE_COMPANY,body,{
            Authorization : `Bearer ${token}`
        })
        if(response?.data?.success){
            result =response?.data?.createdCompany
        }
    } catch (error) {
        console.log(error)
    }
    return result ;
}

export const addCompanyDetails = async(body,token)=>{
    let result ;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("PUT",UPDATE_COMPANY_DETAILS,body,{
            Authorization : `Bearer ${token}`
        })
        if(response?.data?.success){
            result = response?.data?.company
            toast.success("Company Details Updated")
        }
    } catch (error) {
        console.log(error.message)
        toast.error("Failed to add Company Details")
    }finally{
        toast.dismiss(toastId)
    }
    return result;
}

export const getAllCompanies = async(token)=>{
    let result ;
    try {
        const response = await apiConnector("POST",GET_ALL_COMPANIES,null,{
            Authorization : `Bearer ${token}`
        })
        if(response?.data?.success){
            result = response?.data?.companies
        }
    } catch (error) {
        console.log(error.message)
    }
    return result ;
}

export const getJobById = async(body,token)=>{
    let result ;
    try {
        const response = await apiConnector("POST",GET_COMPANY_BY_ID,body,{
            Authorization : `Bearer ${token}`
        })
        if(response?.data?.success){
            result = response?.data?.company
        }
    } catch (error) {
        console.log(error.message)
    }
    return result ;
}

export const updateCompany = async(body,token)=>{
    let result ;
    try {
        const response = await apiConnector("PUT",UPDATE_COMPANY_DETAILS,body,{
            Authorization : `Bearer ${token}`
        })
        if(response?.data?.success){
            result = response?.data?.company
        }
    } catch (error) {
        console.log(error.message)
    }
    return result ;
}

export const deleteCompany = async(body,token)=>{
    try {
        const response = await apiConnector("DELETE",DELETE_COMPANY,body,{
            Authorization : `Bearer ${token}`
        })
        if(response?.data?.success){
            toast.success("Company Deleted")
        }
    } catch (error) {
        console.log(error)
    }
}