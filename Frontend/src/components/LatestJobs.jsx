import React from 'react'
import LatestJobLists from './LatestJobLists'
import { useSelector } from 'react-redux'
import useGetAllJobs from './hooks/useGetAllJobs';

const LatestJobs = () => {
  useGetAllJobs();
  const allJobs = useSelector((state)=>state.job.allJobs)
  return (
    <div className='max-w-full mx-auto sm:my-20 my-10 ml-4 '>
      <h1 className='sm:text-4xl text-xl font-bold'><span className=' text-[#6A3AC2]'>Latest & Top</span> Job Openings</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-5'>
        {
            allJobs?.slice(0,6)?.map((job,index)=>(
                <LatestJobLists key={index} job={job}/>
            ))
        }
      </div>
    </div>
  )
}

export default LatestJobs
