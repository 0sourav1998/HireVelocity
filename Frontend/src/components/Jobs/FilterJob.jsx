import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const FilterJob = () => {
    const filteredData = [
        {
            type : "Location" ,
            array : ["New Delhi" ,  "Mumbai" , "Pune" , "Hydrabad" , "Bangalore" , "Kolkata" , "Noida"]
        } ,
        {
            type : "Industry" ,
            array : ["Frontend Developer" , "Backend Deveoper" , "Mern Developer" , "Devops Engineer" , "Graphics Designeer"]
        },
        {
            type : "Salary",
            array : ["0-40k","40k-1Lakh","1Lakh-5lakh"]
        }
    ]
  return (
    <div>
        <h1 className='text-xl font-bold'>Filter Jobs</h1>
        <hr className='mt-3'/>
      <RadioGroup>
        {
            filteredData.map((data,index)=>(
                <div key={index} className='mb-4 mt-3'>
                    <h1 className='text-bold text-xl mb-4'>{data.type}</h1>
                    {
                        data.array.map((item,index)=>(
                            <div key={index} className='flex text-sm gap-2 text-gray-600 mb-2'>
                            <RadioGroupItem key={index} value={item}/>
                            <Label>{item}</Label>
                            </div>
                        ))
                    }
                </div>
            ))
        }
     </RadioGroup> 
    </div>
  )
}

export default FilterJob
