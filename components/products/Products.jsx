import Image from "next/image";
import Link from "next/link";

export default function Products({
  products,
  categories,
  currentPage,
  totalPages,
  selectedCategoryId,
}) {
  const selectedCategory = categories.find(
    (category) => category._id === selectedCategoryId
  );

  return (
    <div className="flex min-h-screen h-fit flex-col font-montserrat">
      {/* Category Info */}
      <div className="mb-6">
        {selectedCategory && (
          <>
            <div className="flex flex-row px-2 py-1 space-x-2">
              <div>
                {selectedCategory.category_icon && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${selectedCategory.category_icon}`}
                    alt={selectedCategory.category_name}
                    className="w-12 h-12"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <h2 className="text-2xl mt-auto font-[400] text-[#3ab4df]">
                {selectedCategory.category_name}
              </h2>
            </div>
            <p className="text-gray-600 px-2">
              {selectedCategory.category_description}
            </p>
          </>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 my-8 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 opacity-100">
        {!products?.length ? (
          <p className="text-center text-xl text-gray-500">
            No products available
          </p>
        ) : (
          products.map((product) => (
            <div
              // href={`/products/${product._id}`}
              key={product._id}
              className="flex flex-col transition-transform transform hover:scale-105"
            >
              <Link href={`/products/${product._id}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.product_images[0]}`}
                alt={product.product_name}
                className="w-full h-fit mb-4"
                width={500}
                height={500}
              />
              <h3 className="text-xl text-[#6a6d6d] text-center font-[600]">
                {product.product_name}
              </h3>
              <p className="text-gray-500 text-center text-sm py-2 font-[400]">
                {product.product_description}
              </p>
              </Link>


              <div className="text-[#3AB4DF] flex flex-col space-y-4 my-4 mt-auto text-md text-center  font-[600]">
                <Link href={`/products/${product._id}`}>
                  <p className="underline">Enquire Now</p>
                </Link>
                <Link className="underline" href={`/products/${product._id}`}>
                  <p>Know More</p>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center py-8 items-center md:space-x-4 mt-auto">
        {currentPage > 1 && (
          <Link
            href={`/products?page=${currentPage - 1}&category=${
              selectedCategoryId || ""
            }`}
            className="px-4 py-2 text-gray-500 border border-gray-500"
          >
            Previous
          </Link>
        )}
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <Link
            href={`/products?page=${currentPage + 1}&category=${
              selectedCategoryId || ""
            }`}
            className="px-4 py-2 text-gray-500 border border-gray-500"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
