import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Slides from "@/components/home/Slides";
import CategoriesSection from "@/components/home/CategoriesSection";
import OurBrands from "@/components/OurBrands";
import YearsComplete from "@/components/YearsComplete";

async function fetchSlides() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/slides`,
    {
      cache: "no-store", // Ensures fresh data on every request
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch slides");
  }

  const data = await response.json();
  return data;
}


async function fetchCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    {
      cache: "no-store", 
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data;
}


export default async function Home() {
  const response = await fetchSlides();
  const categories = await fetchCategories();
  console.log("res:", categories)
  const slides = response;
  // if (!slides || slides.length === 0) {
  //   return <div>No slides available</div>;
  // }

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        {/* Pass the slides data as a prop */}
        <Slides slides={slides} />
        <CategoriesSection categories={categories} />
        <OurBrands />
        <YearsComplete />
      </main>
    </>
  );
}
