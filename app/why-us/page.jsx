import { BreadCrum } from "@/components/BreadCrum";
import YearsComplete from "@/components/YearsComplete";
import Image from "next/image";



export async function generateMetadata() {
  return {
    title: "Swastik Tile and Bath: Excellence in Tiles, Bathware, and More",
    description:
      "Swastik Tile and Bath offers premium tiles & bathroom solutions. Stylish, durable products to elevate your space. Visit for quality, variety, and expert advice",
    keywords: [
      "Tile Showroom ",
      "Tile and Bath Product Suppliers",
      "Best Tile Store",
      "Luxury Home Bath Fittings",
      "Bathroom lighting fixtures",
      "Bathroom faucets",
      "Plumbing pipes and fittings",
      "Faucet",
      "Bathroom Products & Suppliers",
      "Luxury Bathroom Accessories",
      "Finished Plumbing",
      "Hot Water Solutions",
      "Luxury Tiles ",
      "Lighting",
      "Wellness",
      "Pressure Pumps",
      "Kitchen Sinks",
      "Switsche",
      "Bath Accessories",
      "Bathware Shop",
      "Bathware Solutions",
      "Bathroom Accessories Set",
      
    ],
    openGraph: {
      title: "Swastik Tile and Bath: Excellence in Tiles, Bathware, and More",
      description:
        "Swastik Tile and Bath offers premium tiles & bathroom solutions. Stylish, durable products to elevate your space. Visit for quality, variety, and expert advice",
      url: "https://swastiktileandbath.com/", // Replace with your actual URL
      images: [
        {
          url: "/bath.png",
          width: 800,
          height: 600,
          alt: "Swastik Tiles and Bath",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Swastik Tile and Bath: Excellence in Tiles, Bathware, and More",
      description:
        "Swastik Tile and Bath offers premium tiles & bathroom solutions. Stylish, durable products to elevate your space. Visit for quality, variety, and expert advice",
      images: ["/bath.png"],
    },
  };
}

const Page = () => {
  return (
    <div>
      <BreadCrum />
      <div className="min-h-screen font-montserrat md:py-12 text-justify">
        {/* Section 1 */}
        <div className="w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 px-4 md:px-40">
          <Image
            src="/bath.png"
            alt="why us"
            width={600}
            height={600}
            className="w-full md:w-1/2 h-fit"
          />
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h1 className="font-[600] text-2xl md:text-3xl text-[#6a6d6d]">
              Unmatched Expertise in Home Transformation
            </h1>
            <h2 className="text-[#3ab4df] font-[500] text-lg md:text-xl">
              Discover the Swastik Difference
            </h2>
            <p className="font-[400] text-[#6a6d6d]">
              At Swastik Tiles and Bath, our legacy of over 25 years isn&apos;t just
              about selling products; it&apos;s about the art and science of turning
              living spaces into homes. Our seasoned experts bring unparalleled
              expertise to every project, ensuring your home reflects not just
              your style, but your story. From innovative designs to timeless
              classics, trust us to elevate your living experience.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full flex flex-col-reverse md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 px-4 md:px-40">
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h1 className="font-[600] text-2xl md:text-3xl text-[#6a6d6d]">
              Customer-Centric Excellence: Your Satisfaction, Our Commitment
            </h1>
            <h2 className="text-[#3ab4df] font-[500] text-lg md:text-xl">
              More Than a Store, We&apos;re Your Home Partner
            </h2>
            <p className="font-[400] text-[#6a6d6d]">
              Our commitment goes beyond transactions—it&apos;s about crafting
              relationships and enhancing lifestyles. Swastik Tiles and Bath is
              driven by a mission to achieve 100% customer satisfaction.
              Experience a shopping journey where trust meets luxury, and your
              needs are not just met but exceeded. Choose Swastik as your first
              and only choice for a home that tells your unique story.
            </p>
          </div>
          <Image
            src="/bath.png"
            alt="why us"
            width={600}
            height={600}
            className="w-full md:w-1/2 h-fit"
          />
        </div>

        {/* Section 3 */}
        <div className="w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 px-4 md:px-40">
          <Image
            src="/bath.png"
            alt="why us"
            width={600}
            height={600}
            className="w-full md:w-1/2 h-fit"
          />
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h1 className="font-[600] text-2xl md:text-3xl text-[#6a6d6d]">
              Swastik&apos;s Vision: Redefining Home Elegance
            </h1>
            <h2 className="text-[#3ab4df] font-[500] text-lg md:text-xl">
              Setting New Standards in Luxury Living
            </h2>
            <p className="font-[400] text-[#6a6d6d]">
              Step into a realm where trust meets innovation. Our vision at
              Swastik Tiles and Bath is to be the epitome of trustworthiness,
              setting new standards for a growth-oriented and luxurious shopping
              journey. Explore a curated selection of residential, commercial,
              plumbing, and ceramic products designed to redefine your home&apos;s
              elegance. Discover why Swastik is more than a brand; it&apos;s a vision
              realized in every detail of your home.
            </p>
          </div>
        </div>

        <YearsComplete />
      </div>
    </div>
  );
};

export default Page;
