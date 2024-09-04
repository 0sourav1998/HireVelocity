import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate, useParams } from 'react-router-dom'
import useGetAllJobs from '../hooks/useGetAllJobs'


const Job = ({job}) => {
  useGetAllJobs();
  const getDateFunction = (date)=>{
    const createdAtDate = new Date(date);
    const todayDate = new Date();
    const diff = todayDate - createdAtDate;
    console.log(diff)
    return Math.floor(diff/(1000*24*60*60)) ;
  }
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-y-4 p-7 bg-white shadow-xl border border-gray-200">
      <div className='flex items-center justify-between'>
        <h1 className='text-sm text-gray-500'>{getDateFunction(job?.createdAt) === 0 ? "Today" : `${getDateFunction(job?.createdAt)} days ago`}</h1>
        <Button variant="outline" size="icon" className="rounded-full bg-gray-100"><Bookmark className='h-5 w-5'/></Button>
      </div>
      <div className='flex gap-4'>
        <Avatar>
            <AvatarImage src="https://tse4.mm.bing.net/th?id=OIP.2AmwrTnE_ys6QNCFe6iKRwHaHa&pid=Api&P=0&h=180"/>
        </Avatar>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <h4 className='text-sm text-gray-500'>{job?.location}</h4>
        </div>
      </div>
      <div>
        <h1 className='text-lg font-bold my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={"bg-[#6A3AC2] font-bold "} variant="ghost">{job?.jobType}</Badge>
        <Badge className={"bg-[#F83002] font-bold"} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={"bg-[#7289b7] font-bold"} variant="ghost">{job?.salary} LPA</Badge>
      </div>
      <div className='flex gap-6 mt-5'>
        <Button onClick={()=>navigate(`/jobs/description/${job._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#6A3AC2]">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job
