import { BreadCrum } from "@/components/BreadCrum";
import ProductRange from "@/components/products/ProductRange";
import Products from "@/components/products/Products";

const Page = async () => {


  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {method: 'GET'});
  const categories = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {method: 'GET'});
  return (
    <div>
      <BreadCrum />
      <div className="min-h-screen h-fit w-full flex px-8 md:px-40 flex-col items-center md:items-start  md:flex-row md:space-x-4  md:py-12 font-montserrat">
        <div className="md:w-1/3">
          <ProductRange />
        </div>
        <div className="w-full">
          <Products />
        </div>
      </div>
    </div>
  );
};

export default Page;




