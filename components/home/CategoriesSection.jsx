"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/categoriesSlice";
import { setSelectedCategory } from "@/store/productsSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoriesSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(
    (state) => state.categories
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      // console.log("Categories data:", categories);
    }
  }, [categories]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === categories.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // 6 seconds interval
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [categories]);

  const handleTransitionEnd = () => {
    if (currentIndex === categories.length - 1) {
      setCurrentIndex(0); // Reset to first category after the last one
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories.</div>;

  return (
    <div className="w-full overflow-hidden relative font-montserrat">
      <div
        className="flex transition-all duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {categories && categories.length > 0 && (
          <div className="flex">
            {categories.map((category, index) => (
              <div
                key={category._id}
                className="flex-none w-screen sm:w-1/2  sm:p-8" // Full width on mobile, half width on larger screens
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
                    <h3 className="text-lg sm:text-2xl font-[200] mb-auto">{category.category_name}</h3>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm sm:text-lg font-[200] text-start text-gray-600 mt-2">
                      {category.category_description}
                    </p>
                  </div>
                  <div className="flex w-full">
                    <p
                      onClick={() => {
                        dispatch(setSelectedCategory(category));
                        router.push("/products");
                      }}
                      className="underline ml-auto text-base sm:text-lg font-[300] py-4 cursor-pointer hover:text-sky-500 active:text-sky-700 transition-all duration-200"
                    >
                      View Collection
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;
