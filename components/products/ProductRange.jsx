"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedCategory } from "@/store/productsSlice";
import { fetchCategories } from "@/store/categoriesSlice"; // Ensure this is imported correctly

const ProductRange = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(
    (state) => state.categories
  );

  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories?.length > 0 && !selectedCategory) {
      dispatch(setSelectedCategory(categories[0]));
    }
  }, [categories, selectedCategory, dispatch]);



  const handleCategoryChange = (categoryId) => {
    const selectedCategoryObj = categories.find(
      (category) => category._id === categoryId
    );
    dispatch(setSelectedCategory(selectedCategoryObj));
  };


  useEffect(() => {
    // if (selectedCategory) {
    //   console.log("Selected Category:", selectedCategory);
    // }
  }, [selectedCategory]);
  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error fetching categories: {error}</p>;

  return (
    <div className="">
      <h2 className="text-2xl text-[#6a6d6d] w-full font-[400] mb-2">
        <span className="whitespace-nowrap"> Our Product</span> <br /> Range
      </h2>
      <div className="h-[1.5px] bg-[#6a6d6d] w-full my-2" />
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category._id} className="flex items-center space-x-2 py-1">
            <input
              type="checkbox"
              id={category._id}
              checked={selectedCategory?._id === category._id} // Compare with the selected category from Redux
              onChange={() => handleCategoryChange(category._id)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 hover:scale-105 transition-transform"
            />
            <label
              htmlFor={category._id}
              className="cursor-pointer text-gray-700"
            >
              {category.category_name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRange;
