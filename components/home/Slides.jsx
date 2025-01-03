"use client";
import React, { useEffect, useState } from "react";
import { fetchSlides } from "@/store/slidesSlice";
import { useDispatch, useSelector } from "react-redux";
const Slides = () => {
  const dispatch = useDispatch();
  const { slides, isLoading, error } = useSelector((state) => state.slides);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchSlides());
  }, [dispatch]);

  useEffect(() => {
    if (slides) {
      // console.log("Slides data:", slides);
    }
  }, [slides]);

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        slides && slides.length > 0
          ? (prevIndex + 1) % slides.length
          : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }

  const { slide_images, grey_line, blue_line, link } = slides[currentIndex];

  return (
    <div className="flex flex-col py-20 font-montserrat justify-center items-center h-fit min-h-screen md:ml-20  mx-4 md:mr-40 ">
      <div className="flex flex-col md:flex-row w-full  items-center  overflow-hidden">

        <div className="w-full h-full transition-opacity duration-1000">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${slide_images[0]}`}
            alt="Slide"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full mb-auto flex flex-col h-full justify-center ">
          <p className="text-gray-500 mb-4 font-[200] text-3xl md:text-5xl">{grey_line}</p>
          <h2 className="text-sky-500 text-5xl font-[700] mb-4">{blue_line}</h2>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 underline font-[200] mt-auto text-2xl"
          >
            KNOW MORE
          </a>
        </div>
      </div>
      <div className="my-8  md:ml-20 ">
        <h1 className="text-gray-500 text-3xl md:text-5xl text-center font-[300] leading-snug">
        complete <br></br>
        tiling, bathing & lighting solutions company
        </h1>
        <div className="h-[1.5px] bg-gray-500 mx-auto w-1/4  my-12"> </div>
      </div>
    </div>
  );
};

export default Slides;
