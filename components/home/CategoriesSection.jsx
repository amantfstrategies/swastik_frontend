"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CategoriesSection = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1); 


  useEffect(() => {
    const updateVisibleItems = () => {
      setVisibleItems(window.innerWidth >= 640 ? 2 : 1); 
    };

    updateVisibleItems();

    window.addEventListener("resize", updateVisibleItems);

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (categories.length - (visibleItems - 1)));
    }, 3000);

    return () => {
      clearInterval(slideInterval);
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, [categories.length, visibleItems]);



  if (!categories || categories.length === 0) {
    return <div>No categories available</div>;
  }

  return (
    <div className="w-full overflow-hidden relative font-montserrat">
      <div
        className="flex transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex * 100) / visibleItems}%)`,
        }}
      >
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex-none w-full sm:w-1/2 sm:p-8" 
          >
            <div className="flex flex-col w-full items-center text-center">
              <div className="flex flex-row w-full justify-between px-4 items-center">
                <Image
                  width={150}
                  height={150}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${category.category_icon}`}
                  alt={category.category_name}
                  className="h-fit w-12 sm:w-20 mb-auto"
                />
                <h3 className="text-lg sm:text-2xl font-[200] mb-auto">
                  {category.category_name}
                </h3>
              </div>
              <div className="text-center px-4">
                <p className="text-sm sm:text-lg font-[200] text-start text-gray-600 mt-2">
                  {category.category_description}
                </p>
              </div>
              <div className="flex w-full">
                <Link
                  href={`/category/${category._id}`}
                  className="underline ml-auto text-base sm:text-lg font-[300] py-4 cursor-pointer hover:text-sky-500 active:text-sky-700 transition-all duration-200"
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
