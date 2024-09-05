import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../Slice/authslice"
import jobReducer from "../Slice/jobSlice"
import companyReducer from "../Slice/companySlice"

export const rootReducer = combineReducers({
    user : userReducer ,
    job : jobReducer ,
    company : companyReducer
})