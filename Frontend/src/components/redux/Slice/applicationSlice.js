import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    applicants : sessionStorage.getItem("applicants") ? JSON.parse(sessionStorage.getItem("applicants")) : [] ,
    
}

const applicationslice = createSlice({
    name:"application",
    initialState ,
    reducers : {
        setApplicants : (state,action)=>{
            state.applicants = action.payload
        }
    }
})

export const {setApplicants} = applicationslice.actions ;
export default applicationslice.reducer ;
