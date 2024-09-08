import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import { getApplcants } from '@/services/operations/applicationOperation'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '../redux/Slice/applicationSlice'

const Applicants = () => {
    const {id} = useParams();
    const {token} = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    const fetchApplicants = async()=>{
       const result = await getApplcants({id : id},token) ;
       console.log(result)
       sessionStorage.setItem("applicants",JSON.stringify(result?.applications))
       dispatch(setApplicants(result?.applications))
    }
    useEffect(()=>{
      fetchApplicants();
    },[])
  return (
    <div>
      <Navbar/>
      <ApplicantsTable/>
    </div>
  )
}

export default Applicants
