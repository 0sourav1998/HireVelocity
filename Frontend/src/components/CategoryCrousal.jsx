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
      <Carousel className="sm:w-full w-[50%] max-w-xl sm:my-20 my-10 mx-auto">
        <CarouselContent>
          {categories?.map((cat, index) => (
            <CarouselItem onClick={()=>searchJobHandler(cat)} className="sm:basis-1 md:basis-1/2 lg:1/3" key={index}>
              <Button className="bg-slate-900 text-white rounded-full sm:p-4 p-2 hover:bg-slate-700 transition-all duration-200">{cat}</Button>
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
