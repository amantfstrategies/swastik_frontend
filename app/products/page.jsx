// app/products/page.js
import { BreadCrum } from "@/components/BreadCrum";
import ProductRange from "@/components/products/ProductRange";
import Products from "@/components/products/Products";

export default async function Page({ searchParams }) {
  const api = process.env.NEXT_PUBLIC_API_URL;

  // Extract pagination and category parameters
  const currentPage = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "10", 10);
  const selectedCategoryId = searchParams.category || null;

  // Fetch categories
  const categoriesRes = await fetch(`${api}/api/categories`, { cache: "no-store" });
  const categories = await categoriesRes.json();

  // Fetch products
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
