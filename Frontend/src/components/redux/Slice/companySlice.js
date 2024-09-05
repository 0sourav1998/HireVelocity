import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    company:sessionStorage.getItem("company") ? JSON.parse(sessionStorage.getItem("company")) : null ,
    allCompanies : sessionStorage.getItem("allCompanies") ? JSON.parse(sessionStorage.getItem("allCompanies")) : [] ,
    searchCompany : "" ,
    singleCompanyById : null
}

const companyslice = createSlice({
    name : "company",
    initialState,
    reducers : {
        setCompany : (state,action)=>{
            state.company = action.payload
        },
        setAllCompanies : (state,action)=>{
            state.allCompanies = action.payload
        } ,
        setsearchCompany : (state,action)=>{
            state.searchCompany = action.payload
        },
        setSingleCompanyById : (state,action)=>{
            state.singleCompanyById = action.payload
        }
    }
})

export const {setCompany,setAllCompanies,setsearchCompany , setSingleCompanyById} = companyslice.actions ;
export default companyslice.reducer;
