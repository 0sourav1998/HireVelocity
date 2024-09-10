import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    applicants : sessionStorage.getItem("applicants") ? JSON.parse(sessionStorage.getItem("applicants")) : [] ,
    status : sessionStorage.getItem("status") ? JSON.parse(sessionStorage.getItem("setStatus")) : []
}

const applicationslice = createSlice({
    name:"application",
    initialState ,
    reducers : {
        setApplicants : (state,action)=>{
            state.applicants = action.payload
        },
        setStatus : (state,action)=>{
            state.status = action.payload
        }
    }
})

export const {setApplicants , setStatus} = applicationslice.actions ;
export default applicationslice.reducer ;
