import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allJobs : null ,
    singleJob : sessionStorage.getItem("job") ? JSON.parse(sessionStorage.getItem("job")) :  null ,
    adminJobs : sessionStorage.getItem("adminJobs") ? JSON.parse(sessionStorage.getItem("adminJobs")) : null ,
    searchJob : "" 
}

const jobSlice = createSlice({
    name : "job",
    initialState,
    reducers : {
        setAllJobs : (state,action)=>{
            state.allJobs = action.payload 
        },
        setSingleJob : (state,action)=>{
            state.singleJob = action.payload;
        },
        setAdminJobs : (state,action)=>{
            state.adminJobs = action.payload
        } ,
        setSearchJob : (state,action)=>{
            state.searchJob = action.payload
        }
    }
})

export const {setAllJobs , setSingleJob , setAdminJobs,setSearchJob} = jobSlice.actions ;
export default jobSlice.reducer;