import { getAllJobs } from '@/services/operations/JobOperations'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAllJobs } from '../redux/Slice/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const allJobs = async()=>{
        const result = await getAllJobs();
        dispatch(setAllJobs(result))
    }
    useEffect(()=>{
        allJobs();
    },[])
}

export default useGetAllJobs
