import { getJobsOfAdmin } from '@/services/operations/JobOperations'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAdminJobs } from '../redux/Slice/jobSlice';

const useGetAdminJob = () => {
    const {token} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const adminJobs = async()=>{
        const result = await getJobsOfAdmin(token);
        console.log(result)
        dispatch(setAdminJobs(result))
    }
    useEffect(()=>{
        adminJobs();
    },[])
}

export default useGetAdminJob
