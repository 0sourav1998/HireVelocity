import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCrousal from "./CategoryCrousal";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBookmarkedJobs } from "./redux/Slice/jobSlice";
import { fetchBookmarked } from "@/services/operations/JobOperations";

const Home = () => {
  const user = useSelector((state) => state.user);
  const {token} = useSelector((state)=>state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const fetchBookmarkedJobs = async () => {
    try {
      const result = await fetchBookmarked(token);
      sessionStorage.setItem("bookmark",JSON.stringify(result));
      dispatch(setBookmarkedJobs(result))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchBookmarkedJobs();
    } else {
      dispatch(setBookmarkedJobs([]));
    }
  }, [user, token]);
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
