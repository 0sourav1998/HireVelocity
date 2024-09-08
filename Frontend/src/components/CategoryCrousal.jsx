import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchText } from "./redux/Slice/jobSlice";

const CategoryCrousal = () => {
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphics Designer",
    "Mobile Developer",
    "Android Developer",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [query,setQuery] = useState("");
  const searchJobHandler = ()=>{
    dispatch(setSearchText(query));
    navigate("/browse")
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl my-20 mx-auto">
        <CarouselContent>
          {categories?.map((cat, index) => (
            <CarouselItem onClick={()=>searchJobHandler(cat)} className="md:basis-1/2 lg:1/3" key={index}>
              <Button className="bg-slate-900 text-white rounded-full p-4 hover:bg-slate-700 transition-all duration-200">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCrousal;
