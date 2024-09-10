import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux';
import { setFilterGroup } from '../redux/Slice/jobSlice';

const FilterJob = () => {
    const [selectedValue , setSelectedValue] = useState("");
    const dispatch = useDispatch();
    
    const handleValueChange = (value)=>{
        setSelectedValue(value)
    }
    
    useEffect(()=>{
        dispatch(setFilterGroup(selectedValue))
    },[selectedValue])
    
    const filteredData = [
        {
            type : "Location" ,
            array : ["New Delhi" ,  "Mumbai" , "Pune" , "Hyderabad" , "Bangalore" , "Kolkata" , "Noida"]
        } ,
        {
            type : "Industry" ,
            array : ["Frontend Developer" , "Backend Developer" , "MERN Developer" , "DevOps Engineer" , "Graphics Designer"]
        },
        {
            type : "Salary",
            array : ["0-40k","40k-1Lakh","1Lakh-5lakh"]
        }
    ]
  
    return (
      <div className='bg-white shadow-lg rounded-lg sm:p-6 p-2 w-full'>
          <h1 className='sm:text-2xl text-xl font-bold text-gray-800 mb-4'>Filter Jobs</h1>
          <hr className='border-t border-gray-200 mb-6'/>
          <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
              {
                  filteredData.map((data, index) => (
                      <div key={index} className='mb-6'>
                          <h1 className='sm:text-lg text-sm font-semibold text-gray-700 mb-3'>{data.type}</h1>
                          {
                              data.array.map((item, idx) => (
                                  <div key={idx} className='flex items-center gap-2 mb-2'>
                                      <RadioGroupItem key={idx} value={item} className='sm:w-4 sm:h-4 w-2 h-2 text-blue-600'/>
                                      <Label className='text-gray-600 cursor-pointer sm:text-normal text-xs'>{item}</Label>
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
