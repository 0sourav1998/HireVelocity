import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const CategoryCrousal = () => {
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphics Designer",
    "Mobile Developer",
    "Android Developer",
  ];
  return (
    <div>
      <Carousel className="w-full max-w-xl my-20 mx-auto">
        <CarouselContent>
          {categories?.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg:1/3" key={index}>
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
