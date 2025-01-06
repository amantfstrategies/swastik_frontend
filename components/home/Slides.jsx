"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Slides = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true); // To control fade-in/fade-out



  useEffect(() => {
    const slideInterval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length); // Change slide
        setFade(true); // Start fade in
      }, 500); // Delay before fade in (half the duration)
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const { slide_images, grey_line, blue_line, link } = slides[currentSlide];

  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }
  
  return (
    <div className="flex flex-col py-20 font-montserrat justify-center items-center h-fit min-h-screen md:ml-20 mx-4 md:mr-40">
      <div
        className={`flex flex-col md:flex-row w-full items-center overflow-hidden transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`w-full h-full transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            width={500}
            height={500}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${slide_images[0]}`}
            alt="Slide"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full mb-auto flex flex-col h-full justify-center">
          <p className="text-gray-500 mb-4 font-[200] text-3xl md:text-5xl">
            {grey_line}
          </p>
          <h2 className="text-sky-500 text-5xl font-[700] mb-4">{blue_line}</h2>
          <Link
            href='/about'
            // target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 underline font-[200] mt-auto text-2xl"
          >
            KNOW MORE
          </Link>
        </div>
      </div>

      <div className="my-8 md:ml-20">
        <h1 className="text-gray-500 text-3xl md:text-5xl text-center font-[300] leading-snug">
          complete <br />
          tiling, bathing & lighting solutions company
        </h1>
        <div className="h-[1.5px] bg-gray-500 mx-auto w-1/4 my-12"></div>
      </div>
    </div>
  );
};

export default Slides;
