import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedJob } from '../redux/Slice/jobSlice';
import axios from 'axios';
import {jobEndPoints} from "../../services/apis"

const {GET_JOB_BY_KEYWORD} = jobEndPoints;

const useGetSearchedJob = () => {
    const dispatch = useDispatch();
    const {searchText} = useSelector((state)=>state.job)
    const searchedJobsByKeyword = async()=>{
        try {
            const result = await axios.get(`${GET_JOB_BY_KEYWORD}?keyword=${searchText}`);
            console.log(result)
            dispatch(setSearchedJob(result?.data?.job))
            sessionStorage.setItem("searchedJob",JSON.stringify(result?.data?.job))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        searchedJobsByKeyword();
    },[dispatch])
}

export default useGetSearchedJob
