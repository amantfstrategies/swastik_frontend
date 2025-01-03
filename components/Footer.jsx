"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    const pathname = usePathname();
  
    const isAdminRoute = pathname.startsWith("/admin");
  return (
    isAdminRoute ? null : (
      <footer className="flex flex-col  text-gray-600 md:mx-40 font-montserrat  ">
      <div className="flex flex-col  md:flex-row md:mx-6  md:space-x-8 py-8">
        <div className="flex flex-col items-center ">
          <Link
            href="/"
            className="flex title-font font-medium items-center justify-center md:mr-auto  text-gray-900 mb-4 md:mb-0"
          >
            <span className="text-orange-500 text-xl font-bold md:pr-24 ">
              <Image
                src={"/logo.png"}
                alt="logo"
                className="h-fit mx-auto md:mx-0 w-2/3"
                height={300}
                width={300}
              ></Image>
            </span>
          </Link>
          <h2 className="text-xl text-center md:text-start font-[200] my-8">
            Swastik Tile & Bath Fata, opp. Kolhapur Steel Ltd, Nagaon, Shiroli,
            Maharashtra 416122
          </h2>
        </div>

        <div className="md:flex md:flex-row w-full grid grid-cols-2 gap-2">
          <div className="w-full flex justify-center items-center">
            <ul className="flex flex-col items-start px-8 list-none font-[200] mb-auto mx-auto">
              <li className="my-2">
                <Link href="/" className="whitespace-nowrap">FAUCETS</Link>
              </li>
              <li className="my-2">
                <Link href="/about" className="whitespace-nowrap">BATHWARE</Link>
              </li>
              <li className="my-2">
                <Link href="/services" className="whitespace-nowrap">PLUMBING</Link>
              </li>
              <li className="my-2">
                <Link href="/contact" className="whitespace-nowrap">TILES</Link>
              </li>
              <li className="my-2">
                <Link href="/contact" className="md:whitespace-nowrap">HOT WATER SOLUTIONS</Link>
              </li>
            </ul>
          </div>

          <div className="w-full flex justify-center items-center">
            <ul className="flex flex-col items-start px-8 list-none font-[200] mb-auto mx-auto">
              <li className="my-2">
                <Link href="/" className="whitespace-nowrap">Lighting</Link>
              </li>
              <li className="my-2">
                <Link href="/about" className="whitespace-nowrap">Wellness</Link>
              </li>
              <li className="my-2">
                <Link href="/services" className="whitespace-nowrap">Pressure Pumps</Link>
              </li>
              <li className="my-2">
                <Link href="/contact" className="whitespace-nowrap">Kitchen Sinks</Link>
              </li>
              <li className="my-2">
                <Link href="/contact" className="whitespace-nowrap">Kitchen Sinks</Link>
              </li>
            </ul>
          </div>

          <div className="w-full flex justify-center items-center">
            <ul className="flex flex-col items-start px-8 list-none font-[200] mb-auto mx-auto">
              <li className="my-2">
                <Link href="/" className="whitespace-nowrap">Follow Us On</Link>
              </li>
              <li className="my-2">
                <Link href="/about" className="whitespace-nowrap">Facebook</Link>
              </li>
              <li className="my-2">
                <Link href="/services" className="whitespace-nowrap">Instagram</Link>
              </li>
              <li className="my-2">
                <Link href="/contact" className="whitespace-nowrap">Google</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex mx-auto pb-4 px-8 md:px-0">
        <input
          type="email"
          placeholder="Enter your email"
          className="md:px-4 px-2 w-full   py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-sky-500"
        />
        <button className="px-6 py-2 border border-sky-500 hover:text-white hover:bg-sky-500 rounded-r-md ">
          Subscribe
        </button>
      </div>

      <div className="flex w-full items-center justify-center">
        <p className="mx-auto text-center text-xs py-4 pb-2">
          Copyrights 2025, Swastik - Tiles & Bath All Rights Reserved Developed
          & Managed By: TF Strategies Pvt. Ltd.
        </p>
      </div>
    </footer>
    )
  );
}
