import React from 'react'
import LatestJobLists from './LatestJobLists'

const LatestJobs = () => {
    const jobs= [1,2,3,4,5,6,7,8,9,10]
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className=' text-[#6A3AC2]'>Latest & Top</span> Job Openings</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-5'>
        {
            jobs.slice(0,6).map((job,index)=>(
                <LatestJobLists key={index}/>
            ))
        }
      </div>
    </div>
  )
}

export default LatestJobs
