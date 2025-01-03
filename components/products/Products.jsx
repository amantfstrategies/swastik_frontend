"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/categoriesSlice";
import { fetchProducts } from "@/store/productsSlice";
import Image from "next/image";
import { SkeletonCard } from "../SkeletonCard";
import { useRouter } from "next/navigation";

const Products = () => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); 


  const { categories } = useSelector((state) => state.categories);
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );
  const { products, isLoading, error, totalPages } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory && selectedCategory._id) {
      // console.log("Selected Category changed:", selectedCategory._id);
      dispatch(fetchProducts(currentPage, limit, selectedCategory._id));
    }
  }, [selectedCategory]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex min-h-screen h-fit flex-col font-montserrat">
      <div className="mb-6 ">
        {selectedCategory && (
          <>
            <div className="flex flex-row px-2 py-1 space-x-2">
              <div className="">
                {selectedCategory.category_icon && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${selectedCategory.category_icon}`}
                    alt={selectedCategory.category_name}
                    className="w-12 h-12"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <h2 className="text-2xl mt-auto font-[400] text-[#3ab4df]">
                {selectedCategory.category_name}
              </h2>
            </div>
            <p className="text-gray-600 px-2 ">
              {selectedCategory.category_description}
            </p>
          </>
        )}
      </div>

      {/* Products Grid with Pagination */}
      <div className="grid grid-cols-1 my-8 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 opacity-100">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </>
        ) : products.length === 0 ? (
          <p className="text-center text-xl text-gray-500">
            No products available
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/products/${product._id}`)}
              className="flex flex-col transition-transform transform hover:scale-105"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.product_images[0]}`} // Use the first product image
                alt={product.product_name}
                className="w-full h-fit  mb-4"
                width={500}
                height={500}
              />
              <h3 className="text-xl text-[#6a6d6d] text-center font-[600]">
                {product.product_name}
              </h3>
              <p className="text-gray-500 text-center text-sm py-2 font-[400]">
                {product.product_description}
              </p>

              <div className="text-center text-[#3ab4df] mt-auto flex flex-col space-y-4 font-[600]">
                <h3 className="underline">Enquire Now</h3>
                <h3
                  className="underline text-[#3ab4df] hover:text-[#41ccff] cursor-pointer transition duration-300"
                  onClick={() => router.push(`/products/${product._id}`)}
                >
                  Know More
                </h3>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center py-8 items-center md:space-x-4 mt-auto">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-gray-500 border border-gray-500 disabled:bg-gray-300 disabled:text-white disabled:border-none  "
        
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || currentPage > totalPages}
          className="px-4 py-2 text-gray-500 border border-gray-500 disabled:bg-gray-300 disabled:text-white disabled:border-none  "
        
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
