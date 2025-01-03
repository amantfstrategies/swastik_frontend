import { BreadCrum } from "@/components/BreadCrum";
import OurBrands from "@/components/OurBrands";
import YearsComplete from "@/components/YearsComplete";
import Image from "next/image";

const Page = () => {
  return (
    <div className="font-montserrat  ">
      <BreadCrum/>
      <div className="flex flex-col md:flex-row px-4 md:px-40">
        <div className="w-full items-center md:items-start flex flex-col">
          <h1 className="text-2xl text-center md:text-center md:text-3xl text-[#6a6d6d] leading-snug font-[300]">
            Crafting Home Stories at <br />
            <span className="text-[#3AB4DF]">Swastik Tiles and Bath</span>
          </h1>
          <div className="w-1/2 h-[1.5px] my-8 bg-black"></div>

          <Image
            src="/bath.png"
            className="w-full h-fit pr-8"
            height={300}
            width={300}
            alt="bath"
          />
        </div>
        <div className="w-full flex flex-col text-xl space-y-8 font-[200] text-justify text-[#6a6d6d]">
          <p>
            Welcome to the heart and soul of Swastik Tiles and Bath, where every
            tile laid and every faucet installed is a chapter in the story of
            your home.
            <br />
            <br />
            Nestled in the vibrant city of Kolhapur, Maharashtra, our 6000 sq.
            ft. showroom stands as a testament to over two decades of passion,
            exper- tise, and an unwavering commitment to transforming houses
            into homes.
            <br />
            <br />
            Founded over 25 years ago, Swastik Tiles and Bath embarked on a
            jour- ney to redefine the people experience their living spaces. F
            ror-n the humble beginnings of being plumbing and ceramic suppliers,
            we have evolved into a multifaceted destination, offering a curated
            selection of residential, commercial, plumbing, and ceramic
            products.
          </p>

          <h1 className="text-3xl text-center md:text-start md:text-6xl font-[300]">
            Elevating Homes, Crafting Stories.
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full md:space-x-20 space-y-8 md:space-y-0  py-12 px-4 md:px-40">
        <div className="flex flex-col space-y-4 w-full">
          <h1 className="font-[500] text-2xl text-[#3ab4df]">Our Vision</h1>
          <h2 className="font-[400] text-2xl text-[#6a6d6d]">Where Trust Meets Luxury</h2>
          <p className="font-[300] text-base text-[#6a6d6d] text-justify">
            Step into a world where trust is the cor- nerstone of every
            interaction, growth is a promise, and your shopping experience is
            nothing short of extraordinary. At Swas- tikt our vision is to be
            the epitome of trustworthiness, setting new standards for a
            growth-oriented and luxurious shopping journey.
          </p>
        </div>
        <div className="flex flex-col space-y-4 w-full">
          <h1 className="font-[500] text-2xl text-[#3ab4df]">Our Mission</h1>
          <h2 className="font-[400] text-2xl text-[#6a6d6d]">Crafting Relationships & Enhancing Lifestyles</h2>
          <p className="font-[300] text-base text-[#6a6d6d] text-justify">
          Our mission goes beyond mere transac- tions; it's about crafting enduring rela- tionships and enhancing the very fabric of your lifestyle. With a commitment to providing the best products, Swastik strives to be the number one store that achieves 100% customer satisfaction.
          </p>
        </div>
        <div className="flex flex-col space-y-4 w-full">
          <h1 className="font-[500] text-2xl text-[#3ab4df]">Our Goal</h1>
          <h2 className="font-[400] text-2xl text-[#6a6d6d]">Your First and Only
          Choice</h2>
          <p className="font-[300] text-base text-[#6a6d6d] text-justify">
          solutions, products, and services con- verge seamlessly. That's our goal—to make Swastik your first and only choice for all your home needs.
          </p>
        </div>
      </div>
      <OurBrands/>
      <YearsComplete/>


    </div>
  );
};

export default Page;
