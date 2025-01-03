import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from '../store/reduxProvider';
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
  title: 'Swastik',
  description: 'Swastik tiles',
};

export default function RootLayout({ children }) {

  

  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
          <div>
            <LayoutStructure/>
          {children}
          <Footer />
          </div>
        </body>
      </html>
    </ReduxProvider>
  );
}
