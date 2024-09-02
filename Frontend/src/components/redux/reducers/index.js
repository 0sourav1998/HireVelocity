import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../Slice/authslice"

export const rootReducer = combineReducers({
    user : userReducer
})