import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCrousal from './CategoryCrousal'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCrousal/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
