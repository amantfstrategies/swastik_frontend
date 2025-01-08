"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  editProduct,
  deleteManyProducts,
} from "../../../store/productsSlice";
import { fetchCategories } from "../../../store/categoriesSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [modelNo, setModelNo] = useState("");
  const [colorsAvailable, setColorsAvailable] = useState([]);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [confirmDeleteProductId, setConfirmDeleteProductId] = useState(null); // For single product delete confirmation
  const [confirmDeleteMany, setConfirmDeleteMany] = useState(false); // For multiple products delete confirmation

  const router = useRouter();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

    useEffect(() => {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        router.push("/admin/login");
      }
    }, []);
  

  const handleSaveProduct = () => {
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("category", category);
    formData.append("product_description", productDescription);

    productImages.forEach((image) => formData.append("product_images", image));

    formData.append("model_no", modelNo);
    colorsAvailable.forEach((color) => formData.append("colors_available", color));
    formData.append("size", size);
    formData.append("price", price);

    if (editingProductId) {
      dispatch(editProduct({ id: editingProductId, formData }));
    } else {
      dispatch(createProduct(formData));
    }

    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setProductName("");
    setCategory("");
    setProductDescription("");
    setProductImages([]);
    setModelNo("");
    setColorsAvailable([]);
    setSize("");
    setPrice("");
    setEditingProductId(null);
  };

  const handleImageSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setProductImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = productImages.filter((_, i) => i !== index);
    setProductImages(updatedImages);
  };

  const handleEditProduct = (product) => {
    setProductName(product.product_name);
    setCategory(product.category);
    setProductDescription(product.product_description);
    setProductImages([]);
    setModelNo(product.model_no);
    setColorsAvailable(product.colors_available || []);
    setSize(product.size);
    setPrice(product.price);
    setEditingProductId(product._id);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    setConfirmDeleteProductId(id); // Set the product ID for confirmation
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((productId) => productId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setConfirmDeleteMany(true); // Trigger multiple delete confirmation modal
    
  };

  const confirmDeleteSingle = () => {
    dispatch(deleteProduct(confirmDeleteProductId));
    setConfirmDeleteProductId(null); // Reset confirmation state
  };

  const confirmDeleteManyProducts = () => {
    dispatch(deleteManyProducts(selectedProducts));
    
    setSelectedProducts([]); // Reset selected products
    setConfirmDeleteMany(false); // Reset confirmation state
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-white border border-sky-500 text-sky-500 rounded hover:border-blue-600"
        >
          Add Product
        </button>
        {selectedProducts.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="ml-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-500"
          >
            Delete Selected ({selectedProducts.length})
          </button>
        )}
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading products: {error}</p>
      ) : (
        <table className="table-auto w-full mt-6 border-collapse border border-gray-300">
          <thead className="border bg-sky-500 text-white border-sky-500">
            <tr>
              <th className="px-4 py-2">Select</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleSelectProduct(product._id)}
                  />
                </td>
                <td className="border px-4 py-2">{product.product_name}</td>
                <td className="border px-4 py-2">{product.category?.category_name}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="px-2 py-1 text-sky-500 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="ml-2 px-2 py-1 text-sky-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for single delete confirmation */}
      {confirmDeleteProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setConfirmDeleteProductId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteSingle}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for multiple delete confirmation */}
      {confirmDeleteMany && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete the selected products?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setConfirmDeleteMany(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteManyProducts}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

{isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md overflow-y-auto no-scrollbar max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">
              {editingProductId ? "Edit Product" : "Add Product"}
            </h2>
            <div>
              <label>Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 border mb-4"
              />

              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border mb-4"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>

              <label>Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full p-2 border mb-4"
              ></textarea>

              <label>Images</label>
              <div className="flex flex-wrap gap-4 mb-4">
                <button
                  onClick={() => document.getElementById("image-input").click()}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Image
                </button>
                <input
                  id="image-input"
                  type="file"
                  onChange={handleImageSelect}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                {productImages.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {productImages.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          width={100}
                          height={100}
                          src={URL.createObjectURL(image)}
                          alt={`preview-${index}`}
                          className="w-24 h-24 object-cover mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 text-red-500"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label>Model No</label>
              <input
                type="text"
                value={modelNo}
                onChange={(e) => setModelNo(e.target.value)}
                className="w-full p-2 border mb-4"
              />

              <label>Available Colors</label>
              <input
                type="text"
                value={colorsAvailable.join(", ")}
                onChange={(e) =>
                  setColorsAvailable(e.target.value.split(",").map((color) => color.trim()))
                }
                className="w-full p-2 border mb-4"
              />

              <label>Size</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-2 border mb-4"
              />

              <label>Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border mb-4"
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSaveProduct}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;





/*
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md overflow-y-auto no-scrollbar max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">
              {editingProductId ? "Edit Product" : "Add Product"}
            </h2>
            <div>
              <label>Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 border mb-4"
              />

              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border mb-4"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>

              <label>Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full p-2 border mb-4"
              ></textarea>

              <label>Images</label>
              <div className="flex flex-wrap gap-4 mb-4">
                <button
                  onClick={() => document.getElementById("image-input").click()}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Image
                </button>
                <input
                  id="image-input"
                  type="file"
                  onChange={handleImageSelect}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                {productImages.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {productImages.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          width={100}
                          height={100}
                          src={URL.createObjectURL(image)}
                          alt={`preview-${index}`}
                          className="w-24 h-24 object-cover mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 text-red-500"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label>Model No</label>
              <input
                type="text"
                value={modelNo}
                onChange={(e) => setModelNo(e.target.value)}
                className="w-full p-2 border mb-4"
              />

              <label>Available Colors</label>
              <input
                type="text"
                value={colorsAvailable.join(", ")}
                onChange={(e) =>
                  setColorsAvailable(e.target.value.split(",").map((color) => color.trim()))
                }
                className="w-full p-2 border mb-4"
              />

              <label>Size</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-2 border mb-4"
              />

              <label>Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border mb-4"
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSaveProduct}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

*/