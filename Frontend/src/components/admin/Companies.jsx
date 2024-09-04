import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ComapnyTable from './ComapnyTable'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    const navigate = useNavigate()
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex justify-between'>
            <Input className="w-fit" placeholder="Filter by name"/>
            <Button className="bg-black text-white rounded-md" onClick={()=>navigate("/admin/comapanies/createCompany")}>New Company</Button>
        </div>
        <ComapnyTable/>
      </div>
    </div>
  )
}

export default Companies
