import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCrousal from "./CategoryCrousal";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCrousal />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
