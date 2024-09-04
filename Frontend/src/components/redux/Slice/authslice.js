import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading : false ,
    user : sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) :  null ,
    token : sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) :  null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setLoading : (state,action)=>{
            state.loading = action.payload ;
        } ,
        setUser : (state,action)=>{
            state.user = action.payload
        },
        setToken : (state,action)=>{
            state.token = action.payload
        }
    }
})

export const {setLoading , setUser , setToken} = authSlice.actions ;
export default authSlice.reducer;