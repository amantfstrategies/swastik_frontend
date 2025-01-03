import Image from "next/image";
import React from "react";

const OurBrands = () => {
  return <div className="flex py-8 flex-col items-center justify-center font-montserrat w-full  md:px-40">
    <h1 className="text-xl text-center md:text-5xl text-[#6a6d6d] leading-snug font-[300]">
      Our Brands
    </h1>
    <div className="w-1/3 h-[1.5px] my-2 md:my-8 bg-black"></div>
    <Image src="/brands.png" className="w-full h-fit" width={500} height={500} alt="brands" />
  </div>;
};

export default OurBrands;
