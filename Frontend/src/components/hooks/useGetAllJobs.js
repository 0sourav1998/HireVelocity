import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAllJobs } from '../redux/Slice/jobSlice';
import { getAllJobs } from '@/services/operations/JobOperations';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const allJobs = async()=>{
        try {
            const result = await getAllJobs();
            sessionStorage.setItem("allJobs",JSON.stringify(result))
            dispatch(setAllJobs(result))
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        allJobs();
    },[])
}

export default useGetAllJobs
