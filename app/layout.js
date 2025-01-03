import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "../store/reduxProvider";
import Navbar from "@/components/Navbar";
// import { BreadCrum } from "@/components/BreadCrum";
import LayoutStructure from "@/components/LayoutStructure";
import Footer from "@/components/Footer";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default:
      "Swastik Tile and Bath: Complete Tiling, Bathing & Lighting Solutions",
  },
  description:
    "Swastik Tile and Bath offers premium quality Tiles, Bathroom Fittings, and Remodeling Services. Explore a wide range of designs for a stylish, functional home renovation",
  keywords: [
    "Tile Showroom",
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
    "Luxury Tiles",
    "Lighting",
    "Wellness",
    "Pressure Pumps",
    "Kitchen Sinks",
    "Switches",
    "Bath Accessories",
    "Bathware Shop",
    "Bathware Solutions",
    "Bathroom Accessories Set",
  ],
  metadataBase: new URL("https://swastiktileandbath.com"),
  alternates: {
    canonical: "https://swastiktileandbath.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Swastik Tile and Bath: Complete Tiling, Bathing & Lighting Solutions",
    description:
      "Swastik Tile and Bath offers premium quality Tiles, Bathroom Fittings, and Remodeling Services. Explore a wide range of designs for a stylish, functional home renovation",
    url: "https://swastiktileandbath.com",
    type: "website",
    siteName: "Swastik Tiles",
    images: [
      {
        url: "/25years.png",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swastik Tile and Bath: Complete Tiling, Bathing & Lighting Solutions",
    description:
      "Swastik Tile and Bath offers premium quality Tiles, Bathroom Fittings, and Remodeling Services. Explore a wide range of designs for a stylish, functional home renovation",
    site: "@swastiktiles",
  },
  authors: [
    {
      name: "Swastik Tiles",
      url: "https://swastiktileandbath.com",
    },
  ],
  // verification: {
  //   google: "RBFzQvNUtVh5cVgcrQApzhrW-SXx1z8Wo2EwwWNn8Og",
  // },
  publisher: "Swastik Tiles",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <div>
            <LayoutStructure />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ReduxProvider>
  );
}
