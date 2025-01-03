// app/products/page.js
import { BreadCrum } from "@/components/BreadCrum";
import ProductRange from "@/components/products/ProductRange";
import Products from "@/components/products/Products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [categorySlug] = slug || [];
  const selectedCategoryId = categorySlug || null;

  const api = process.env.NEXT_PUBLIC_API_URL;
  console.log("selectedCategoryId:", selectedCategoryId);
  const category = selectedCategoryId
    ? await fetch(`${api}/api/categories/${selectedCategoryId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {console.log("data:", data); return data;})
        .catch((error) => console.log(error))
    : "All Products";

    console.log("categoryName:", category);
  return {
    title: `Browse ${category.category_name} - Swastik Tiles`,
    description: `Explore a wide range of ${
      category.category_name || "products"
    } on Swastik Tiles. Discover high-quality items and find the best deals today.`,
    keywords: [
      "Products",
      category.category_name || "All Products",
      "Swastik Tiles",
      "Online Marketplace",
      "Shop Online",
      "Best Deals",
    ],
    openGraph: {
      title: `Browse ${category.category_name} - Swastik Tiles`,
      description: `Explore a wide range of ${
        category.category_name || "products"
      } on Swastik Tiles. Discover high-quality items and find the best deals today.`,
      url: `https://your-site.com/products/${categorySlug || ""}`,
      type: "website",
      images: [
        {
          url: "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Swastik Tiles Products",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const [categorySlug, pageSlug] = slug || [];

  const currentPage = parseInt(pageSlug || "1", 10);
  const limit = parseInt((await searchParams)?.limit || "10", 10);
  const selectedCategoryId = categorySlug || null;

  const api = process.env.NEXT_PUBLIC_API_URL;
  const categoriesRes = await fetch(`${api}/api/categories`, {
    cache: "no-store",
  });
  const categories = await categoriesRes.json();

  const productsRes = await fetch(
    `${api}/api/products?page=${currentPage}&limit=${limit}&category=${
      selectedCategoryId || ""
    }`,
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
