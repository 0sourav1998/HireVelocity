import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/Slice/jobSlice';
import { getJobById } from '@/services/operations/companyOperatons';
import { setSingleCompanyById } from '../redux/Slice/companySlice';

const useGetSingleCompanyById = (id) => {
    const {token} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const getSingleJobById = async()=>{
        const result = await getJobById(id,token);
        dispatch(setSingleCompanyById(result))
    }
    useEffect(()=>{
        getSingleJobById();
    },[])
}

export default useGetSingleCompanyById
