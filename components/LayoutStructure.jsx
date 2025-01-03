"use client";
import { usePathname } from "next/navigation";

import React from "react";
import Navbar from "./Navbar";
import { BreadCrum } from "./BreadCrum";

const LayoutStructure = () => {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <Navbar />}
    </>
  );
};

export default LayoutStructure;
