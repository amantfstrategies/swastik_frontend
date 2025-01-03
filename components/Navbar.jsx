"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/categoriesSlice";
import { CiSearch } from "react-icons/ci";
import { setSelectedCategory } from "@/store/productsSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  const handleCategoryChange = (category) => {
    if (category) {
      dispatch(setSelectedCategory(category)); // Correct way to dispatch an action
      router.push(`/category/${category._id}`);
    }
  };

  const toggleSearchVisibility = () => {
    // console.log("searchTerm:", searchTerm);
    if (searchTerm.length >= 3) {
      router.push(`/search/${searchTerm}`);
    }
    setIsSearchVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };

    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  const handleKeyPress = (e) => {
    if ((e.key === "Enter" || e.keyCode === 13) && searchTerm.length >= 3) {
      e.preventDefault();
      router.push(`/search/${searchTerm}`);
    }
  };

  const isActive = (path) =>
    (pathname === path || (path === '/' && pathname === '/')) ? "text-sky-500" : "text-gray-400";
  
  const isActiveP = (path) =>
    (pathname === '/' && path === '/') || pathname?.startsWith(path)
      ? "text-sky-500"
      : "text-gray-400";
  

  return (
    <header className="sticky font-montserrat top-0 z-50 text-gray-600 body-font bg-white">
      <div className="mx-6 md:mx-40 flex justify-between items-center py-8">
        <div className="w-full items-center justify-center md:justify-normal flex flex-col md:flex-row">
          <div className="flex flex-row justify-between w-full md:w-fit items-center ">
            <Link
              href="/"
              className="flex title-font font-medium items-center text-gray-900 md:mb-4 "
            >
              <div className="h-fit md:pr-8">
                <Image
                  src={"/logo.png"}
                  alt="logo"
                  className="h-8 md:h-fit w-full"
                  height={300} // Smaller logo on mobile
                  width={300} // Adjust logo size for mobile
                />
              </div>
            </Link>

            {/* Hamburger Menu for mobile */}
            <div
              className="md:hidden flex items-center space-x-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div
                className="text-2xl cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                &#9776;
              </div>
            </div>
          </div>

          <div className=" w-full hidden md:flex md:flex-row my-4 md:my-0">
            <div
              ref={searchRef}
              className={`flex ml-auto w-fit ${
                isSearchVisible ? "w-full" : "w-fit"
              } md:w-fit flex-row items-center border px-4 border-[#CCCCCC] text-[#757575] rounded-full focus:ring-2 group focus:ring-sky-500`}
            >
              
              <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onKeyDown={handleKeyPress}
                onKeyUp={handleKeyPress}
                placeholder="Search for products..."
                className={`text-md py-1.5 focus:outline-none group-focus:block ${
                  isSearchVisible ? "w-full md:w-44" : "w-0"
                } transition-all duration-300 ease-in-out`}
                onFocus={() => setIsSearchVisible(true)} // Show search bar when input is focused
              />
              <CiSearch
                onClick={toggleSearchVisibility}
                ref={searchRef}
                className="text-xl ml-auto group-focus:block"
              />
            </div>
          </div>
        </div>

        <nav className="ml-auto text-md items-center justify-center hidden md:flex">
          <Link
            href="/"
            className={`p-2 m-2 whitespace-nowrap hover:text-sky-500 flex items-center ${isActive(
              "/"
            )}`}
          >
            HOME
          </Link>
          <Link
            href="/about"
            className={`p-2 m-2 whitespace-nowrap hover:text-sky-500 flex items-center ${isActive(
              "/about"
            )}`}
          >
            ABOUT
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsProductsHovered(true)}
            onMouseLeave={() => setIsProductsHovered(false)}
          >
            <Link
              href={`/category/${categories[0]?._id}`}
              className={`p-2 m-2 whitespace-nowrap hover:text-sky-500 flex items-center ${isActiveP(
                "/category"
              )}`}
            >
              PRODUCTS
            </Link>
            {isProductsHovered && categories?.length > 0 && (
              <div className="absolute left-0 rounded-sm w-48 bg-white border border-gray-300 shadow-lg">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    onClick={() => {
                      handleCategoryChange(category);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {category.category_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/why-us"
            className={`p-2 m-2 whitespace-nowrap hover:text-sky-500 flex items-center ${isActive(
              "/why-us"
            )}`}
          >
            WHY US
          </Link>
          <Link
            href="/contact"
            className={`p-2 m-2 whitespace-nowrap hover:text-sky-500 flex items-center ${isActive(
              "/contact"
            )}`}
          >
            CONTACT US
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 w-full bg-white text-center px-4 md:hidden overflow-hidden transition-all ease-in-out duration-300 ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div
          ref={searchRef}
          className={`flex w-full md:w-fit flex-row items-center border px-4 border-[#CCCCCC] text-[#757575] rounded-full focus:ring-2 group focus:ring-sky-500`}
        >
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search for products..."
            className={`text-md py-1.5 focus:outline-none group-focus:block w-full transition-all duration-300 ease-in-out`}
          />
          <CiSearch
            onClick={toggleSearchVisibility}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleSearchVisibility();
              }
            }}
            className="text-xl ml-auto group-focus:block"
          />
        </div>
        <Link
          href="/"
          className={`block p-2 m-2 hover:text-sky-500 ${isActive("/")}`}
        >
          HOME
        </Link>
        <Link
          href="/about"
          className={`block p-2 m-2 hover:text-sky-500 ${isActive("/about")}`}
        >
          ABOUT
        </Link>
        <Link
          href="/products"
          className={`block p-2 m-2 hover:text-sky-500 ${isActive(
            "/products"
          )}`}
        >
          PRODUCTS
        </Link>
        <Link
          href="/why-us"
          className={`block p-2 m-2 hover:text-sky-500 ${isActive("/why-us")}`}
        >
          WHY US
        </Link>
        <Link
          href="/contact"
          className={`block p-2 m-2 hover:text-sky-500 ${isActive("/contact")}`}
        >
          CONTACT US
        </Link>
      </div>
    </header>
  );
}
