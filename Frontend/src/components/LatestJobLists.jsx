import React from 'react'
import { Badge } from './ui/badge'

const LatestJobLists = () => {
  return (
    <div className="flex flex-col gap-y-4 mr-4 mb-4 bg-white shadow-xl rounded-md p-5 border border-gray-100 cursor-pointer">
      <div>
        <h1 className='text-lg font-medium'>Company Name</h1>
        <p className='text-gray-500 text-sm'>India</p>
      </div>
      <div>
        <h1 className='my-2 font-bold text-lg'>Job Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam odio repudiandae velit ex, ab ipsam.</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={"bg-[#6A3AC2] font-bold "} variant="ghost">Part Time</Badge>
        <Badge className={"bg-[#F83002] font-bold"} variant="ghost">12 Positions</Badge>
        <Badge className={"bg-[#7289b7] font-bold"} variant="ghost">12 LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobLists
