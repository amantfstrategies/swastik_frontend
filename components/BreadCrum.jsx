"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSelector } from "react-redux";
import Image from "next/image";

// Helper function to capitalize the first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export function BreadCrum() {
  const pathname = usePathname(); // Get the current path using usePathname
  const pathParts = pathname.split("/").filter(Boolean); // Split the path into parts, filter out any empty strings
  const { categories, isLoading, error } = useSelector(
    (state) => state.categories
  );

  return (
    <div className="flex flex-row z-40 w-full bg-[#F7F7F7] text-2xl md:py-10 px-8 md:px-40 my-8 font-montserrat">
      <Breadcrumb className="flex items-center py-4 md:py-6">
        <BreadcrumbList className="text-2xl md:text-3xl font-[200]">
          {pathname === "/" ? (
            <>
              <BreadcrumbSeparator>
                <span className="mx-2"> / </span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : (
            pathParts.slice(0, 1).map((part, index) => { // Only show the first part (category)
              const href = `/${pathParts.slice(0, index + 1).join("/")}`;
              return (
                <BreadcrumbItem key={href}>
                  <BreadcrumbLink href={href}>{capitalize(part)}</BreadcrumbLink>
                </BreadcrumbItem>
              );
            })
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="hidden md:flex flex-col ml-auto">
        <h1 className="text-2xl md:text-xl font-[500] text-[#3ab4df]">
          COMPLETE TILING, BATHING & LIGHTING SOLUTIONS COMPANY
        </h1>
        <div className="flex flex-row space-x-4 py-4 items-center">
          {categories.map((category) => (
            <div key={category.category_name} className="flex flex-row items-center">
              <Image
                width={150}
                height={150}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${category.category_icon}`}
                alt={category.category_name}
                className="h-fit min-w-full max-w-12 sm:w-20 mb-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
