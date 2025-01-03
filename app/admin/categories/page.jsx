"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  editCategory,
  deleteManyCategories,
} from "../../../store/categoriesSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories, isLoading, error } = useSelector(
    (state) => state.categories
  );
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [iconPreview, setIconPreview] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteManyConfirmOpen, setIsDeleteManyConfirmOpen] = useState(false);
  const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSaveCategory = () => {
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("category_description", categoryDescription);
    if (categoryIcon) {
      formData.append("category_icon", categoryIcon);
    }

    if (editingCategoryId) {
      dispatch(editCategory({ id: editingCategoryId, formData }));
    } else {
      dispatch(createCategory(formData));
    }

    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setCategoryName("");
    setCategoryIcon(null);
    setCategoryDescription("");
    setIconPreview(null);
    setEditingCategoryId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryIcon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
    setIsDeleteConfirmOpen(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategoryId(category._id);
    setCategoryName(category.category_name);
    setCategoryDescription(category.category_description);
    setIconPreview(
      `${process.env.NEXT_PUBLIC_IMAGE_URL}/${category.category_icon}`
    );
    setIsModalOpen(true);
  };

  const handleDeleteMany = () => {
    dispatch(deleteManyCategories(selectedCategories));
    setSelectedCategories([]);
    setIsDeleteManyConfirmOpen(false);
  };

  const handleSelectCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openDeleteConfirm = (category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmOpen(true);
  };

  const openDeleteManyConfirm = () => {
    setIsDeleteManyConfirmOpen(true);
  };

  const openEditConfirm = () => {
    setIsEditConfirmOpen(true);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-white border border-sky-500 text-sky-500 rounded "
        >
          Add Category
        </button>
        <button
          onClick={openDeleteManyConfirm}
          disabled={selectedCategories.length === 0}
          className={`px-4 py-2 rounded ${
            selectedCategories.length === 0
              ? "hidden cursor-not-allowed"
              : "bg-sky-500   text-white"
          }`}
        >
          Delete Selected ({selectedCategories.length})
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-sky-500 text-white">
            <th className=" px-4 py-2">Select</th>
            <th className=" px-4 py-2">Name</th>
            <th className=" px-4 py-2">Icon</th>
            <th className=" px-4 py-2">Description</th>
            <th className=" px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleSelectCategory(category._id)}
                  className="form-checkbox"
                />
              </td>
              <td className="border px-4 py-2">{category.category_name}</td>
              <td className="border px-4 py-2 text-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${category.category_icon}`}
                  alt={category.category_name}
                  className="w-8 h-8  mx-auto"
                  height={50}
                  width={50}
                />
              </td>
              <td className="border px-4 py-2">{category.category_description}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="px-4 py-2 text-sky-500 rounded hover:text-sky-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(category)}
                    className="px-4 py-2 text-sky-500 rounded hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingCategoryId ? "Edit Category" : "Add Category"}
            </h2>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category Name"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleIconChange}
              accept="image/*"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            {iconPreview && (
              <Image
                src={iconPreview}
                alt="Icon Preview"
                className="w-16 h-16 object-cover mx-auto mb-4"
                height={50}
                width={50}
              />
            )}
            <textarea
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Category Description"
              className="w-full px-4 py-2 mb-4 border rounded"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {editingCategoryId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCategory(categoryToDelete._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteManyConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete the selected categories?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteManyConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMany}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Edit</h2>
            <p>Are you sure you want to update this category?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
