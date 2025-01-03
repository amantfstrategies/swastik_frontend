"use client";
import { searchProducts } from "@/store/productsSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const Page = ({ params }) => {
  const [query, setQuery] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const { searchResults, error, isLoading } = useSelector(
    (state) => state.products
  );

  // Unwrap params using React.use()
  useEffect(() => {
    params.then((resolvedParams) => {
      setQuery(resolvedParams.query);
    });
  }, [params]);

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query));
    }
  }, [query, dispatch]);

  useEffect(() => {
    if (searchResults) {
      // console.log("Search results:", searchResults);
    }
  }, [searchResults]);



  return (
    <div className="md:mx-40 px-4 py-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Search Results for: {query}</h1>
      {isLoading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col h-full items-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.product_images[0]}`}
                  alt={product.product_name}
                  width={400}
                  height={400}
                  className="rounded-md w-full p-4 h-fit mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-center ">
                  {product.product_name}
                </h2>
                <p className="text-gray-500 text-sm mb-4 ">
                  {product.product_description}
                </p>
                <p className="text-gray-700 font-medium">
                  Category: {product.category.category_name}
                </p>
                <div className="flex flex-col items-center justify-center mt-auto">
                  <span className="text-lg font-[300] text-gray-900">
                    <span className="font-[400] text-gray-600">Price:</span> ₹
                    {product.price}
                  </span>
                  <span className="text-lg text-gray-900">
                    <span
                      className="font-[500] text-sky-500 cursor-pointer hover:text-sky-700 active:text-sky-900"
                      onClick={() => router.push(`/products/${product._id}`)}
                    >
                      View Details
                    </span>{" "}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
