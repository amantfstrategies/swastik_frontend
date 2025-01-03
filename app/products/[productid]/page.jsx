"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "@/store/productsSlice";
import Image from "next/image";

const ProductPage = ({ params }) => {
  const dispatch = useDispatch();
  const currentProduct = useSelector((state) => state.products.currentProduct);
  const [productId, setProductId] = useState(null);

  // Unwrap params using React.use()
  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.productid);
    });
  }, [params]);

  // Fetch product data once productId is set
  useEffect(() => {
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (currentProduct) {
      // console.log("Current Product:", currentProduct);
    }
  }, [currentProduct]);

  if (!currentProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  const {
    product_name,
    product_description,
    product_images,
    colors_available,
    size,
    price,
    category,
    model_no,
  } = currentProduct;

  return (
    <div className="flex  p-6 md:px-40 font-montserrat">
      {/* Product Images Grid */}
      <div className="flex w-full  mb-6">
        {/* Small Images */}
        {product_images.slice(1, 4).map((image, index) => (
          <div key={index} className="flex w-full flex-col">
            <Image
              width={300}
              height={300}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
              alt={`${product_name} image ${index + 2}`}
              className="w-full h-fit"
            />
          </div>
        ))}
        {/* Large Image */}
        {product_images[0] && (
          <div className="flex w-full">
            <Image
              width={300}
              height={300}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product_images[0]}`}
              alt={`${product_name} main image`}
              className="w-full h-fit"
            />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="text-gray-600 w-full">
        <p className="text-[#358ED7] text-xs font-[500]">{category.category_name}</p>
        <h1 className="text-2xl font-[500] text-gray-800 mb-6">
          {product_name}
        </h1>
        <p className="mb-2">
          {product_description}
        </p>
        <p>
          <span className="font-bold text-gray-600">Models no:</span>{" "}
          {model_no}
        </p>
        <p className="mb-2">
          <span className="font-bold text-gray-600">Colors Available:</span>{" "}
          {colors_available?.join(", ")}
        </p>
        <p className="mb-2">
          <span className="font-bold text-gray-600">Size:</span> {size}
        </p>
        <p className="mb-2">
          <span className="font-bold text-gray-600">Price:</span> ₹{price}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
