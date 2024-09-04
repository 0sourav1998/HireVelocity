import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allJobs : null ,
    singleJob : sessionStorage.getItem("job") ? JSON.parse(sessionStorage.getItem("job")) :  null 
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
        }
    }
})

export const {setAllJobs , setSingleJob} = jobSlice.actions ;
export default jobSlice.reducer;