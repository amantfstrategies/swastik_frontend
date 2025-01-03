import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Slides from "@/components/home/Slides";
import CategoriesSection from "@/components/home/CategoriesSection";
import OurBrands from "@/components/OurBrands";
import YearsComplete from "@/components/YearsComplete";
export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen  ">
        <Slides/>
        <CategoriesSection/>
        <OurBrands/>
        <YearsComplete/>
      </main>
      
    </>
  );
}
