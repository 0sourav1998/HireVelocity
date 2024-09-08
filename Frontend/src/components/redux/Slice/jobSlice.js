import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allJobs : sessionStorage.getItem("allJobs") ? JSON.parse(sessionStorage.getItem("allJobs")) :  [] ,
    singleJob : sessionStorage.getItem("job") ? JSON.parse(sessionStorage.getItem("job")) :  null ,
    adminJobs : sessionStorage.getItem("adminJobs") ? JSON.parse(sessionStorage.getItem("adminJobs")) : null ,
    searchJob : "" ,
    studentAppliedJobs : sessionStorage.getItem("studentAppliedJobs") ? JSON.parse(sessionStorage.getItem("studentAppliedJobs")) :  [] ,
    searchText : "" ,
    searchedJob : sessionStorage.getItem("searchedJob") ? JSON.parse(sessionStorage.getItem("searchedJob")) : [] ,
    filterGroup : "",
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
        } ,
        setStudentAppliedJobs : (state,action)=>{
            state.studentAppliedJobs = action.payload
        } ,
        setSearchText : (state,action)=>{
            state.searchText = action.payload ;
        } ,
        setSearchedJob : (state,action)=>{
            state.searchedJob = action.payload
        } ,
        setFilterGroup : (state,action)=>{
            state.filterGroup = action.payload
        }
    }
})

export const {setAllJobs , setSingleJob , setAdminJobs,setSearchJob , setStudentAppliedJobs,setSearchText ,setSearchedJob ,setFilterGroup} = jobSlice.actions ;
export default jobSlice.reducer;