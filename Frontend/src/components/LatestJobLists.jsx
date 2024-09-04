import React from 'react'
import { Badge } from './ui/badge'

const LatestJobLists = ({job}) => {
  return (
    <div className="flex flex-col gap-y-4 mr-4 mb-4 bg-white shadow-xl rounded-md p-5 border border-gray-100 cursor-pointer">
      <div>
        <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
        <p className='text-gray-500 text-sm'>{job?.location}</p>
      </div>
      <div>
        <h1 className='my-2 font-bold text-lg'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={"bg-[#6A3AC2] font-bold "} variant="ghost">{job?.jobType}</Badge>
        <Badge className={"bg-[#F83002] font-bold"} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={"bg-[#7289b7] font-bold"} variant="ghost">{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobLists
