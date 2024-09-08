import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../Slice/authslice"
import jobReducer from "../Slice/jobSlice"
import companyReducer from "../Slice/companySlice"
import applicationReducer from "../Slice/applicationSlice"

export const rootReducer = combineReducers({
    user : userReducer ,
    job : jobReducer ,
    company : companyReducer ,
    applications : applicationReducer
})