import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../Slice/authslice"
import jobReducer from "../Slice/jobSlice"

export const rootReducer = combineReducers({
    user : userReducer ,
    job : jobReducer 
})