import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'

const Job = () => {
  return (
    <div className="flex flex-col gap-y-4 p-7 bg-white shadow-xl border border-gray-200">
      <div className='flex items-center justify-between'>
        <h1 className='text-sm text-gray-500'>2days ago</h1>
        <Button variant="outline" size="icon" className="rounded-full bg-gray-100"><Bookmark className='h-5 w-5'/></Button>
      </div>
      <div className='flex gap-4'>
        <Avatar>
            <AvatarImage src="https://tse4.mm.bing.net/th?id=OIP.2AmwrTnE_ys6QNCFe6iKRwHaHa&pid=Api&P=0&h=180"/>
        </Avatar>
        <div>
          <h1 className='font-medium text-lg'>Company Name</h1>
          <h4 className='text-sm text-gray-500'>India</h4>
        </div>
      </div>
      <div>
        <h1 className='text-lg font-bold my-2'>Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam molestias vel voluptas id nesciunt.</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={"bg-[#6A3AC2] font-bold "} variant="ghost">Part Time</Badge>
        <Badge className={"bg-[#F83002] font-bold"} variant="ghost">12 Positions</Badge>
        <Badge className={"bg-[#7289b7] font-bold"} variant="ghost">12 LPA</Badge>
      </div>
      <div className='flex gap-6 mt-5'>
        <Button variant="outline">Details</Button>
        <Button className="bg-[#6A3AC2]">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job
