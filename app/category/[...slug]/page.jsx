// app/products/page.js
import { BreadCrum } from "@/components/BreadCrum";
import ProductRange from "@/components/products/ProductRange";
import Products from "@/components/products/Products";


export default async function Page({ params, searchParams }) {
  const { slug } =await  params;
  const [categorySlug, pageSlug] = slug || []; 

  const currentPage = parseInt(pageSlug || "1", 10);
  const limit = parseInt((await searchParams)?.limit || "10", 10);
  const selectedCategoryId = categorySlug || null;


  const api = process.env.NEXT_PUBLIC_API_URL;
  const categoriesRes = await fetch(`${api}/api/categories`, { cache: "no-store" });
  const categories = await categoriesRes.json();

  const productsRes = await fetch(
    `${api}/api/products?page=${currentPage}&limit=${limit}&category=${selectedCategoryId || ""}`,
    { cache: "no-store" }
  );
  const { products, totalPages } = await productsRes.json();

  return (
    <div>
      <BreadCrum />
      <div className="min-h-screen h-fit w-full flex px-8 md:px-40 flex-col items-center md:items-start  md:flex-row md:space-x-4  md:py-12 font-montserrat">
        <div className="md:w-1/3">
          <ProductRange categories={categories} />
        </div>
        <div className="w-full">
          <Products
            products={products}
            categories={categories}
            currentPage={currentPage}
            totalPages={totalPages}
            selectedCategoryId={selectedCategoryId}
          />
        </div>
      </div>
    </div>
  );
}
