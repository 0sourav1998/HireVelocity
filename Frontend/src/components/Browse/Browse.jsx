import React from 'react'
import Navbar from '../shared/Navbar'
import Job from '../Jobs/Job'

const Browse = () => {
    const searchResult = [1,2,3,4,5]
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto mt-6'>
        <h1 className='text-2xl font-bold'>Search Results ({searchResult.length})</h1>
        <div className='grid grid-cols-3 gap-4 mt-5 mb-5'>
            {
                searchResult.map((item,index)=>(
                      <Job key={index}/>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Browse
