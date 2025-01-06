"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSlides,
  createSlide,
  deleteSlide,
  editSlide,
  deleteManySlides,
} from "../../../store/slidesSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SlidesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slides, isLoading, error } = useSelector((state) => state.slides);
  const [greyLine, setGreyLine] = useState("");
  const [blueLine, setBlueLine] = useState("");
  const [link, setLink] = useState("");
  const [selectedSlides, setSelectedSlides] = useState([]);
  const [editingSlideId, setEditingSlideId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slideImages, setSlideImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSlides());
  }, [dispatch]);

  const handleSaveSlide = () => {
    const formData = new FormData();
    formData.append("grey_line", greyLine);
    formData.append("blue_line", blueLine);
    formData.append("link", link);
    slideImages.forEach((image) => formData.append("slide_images", image));

    if (editingSlideId) {
      dispatch(editSlide({ id: editingSlideId, formData }));
    } else {
      dispatch(createSlide(formData));
    }

    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setGreyLine("");
    setBlueLine("");
    setLink("");
    setSlideImages([]);
    setImagePreview([]);
    setEditingSlideId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSlideImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleDeleteSlide = (id) => {
    dispatch(deleteSlide(id));
  };

  const handleEditSlide = (slide) => {
    setEditingSlideId(slide._id);
    setGreyLine(slide.grey_line);
    setBlueLine(slide.blue_line);
    setLink(slide.link);
    setImagePreview(slide.slide_images);
    setIsModalOpen(true);
  };

  const handleDeleteMany = () => {
    dispatch(deleteManySlides(selectedSlides));
  };

  const handleSelectSlide = (id) => {
    setSelectedSlides((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Slides</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded text-sky-500 border border-sky-500"
        >
          Add Slide
        </button>
        <button
          onClick={handleDeleteMany}
          disabled={selectedSlides.length === 0}
          className={`px-4 py-2 rounded ${
            selectedSlides.length === 0
              ? "hidden cursor-not-allowed"
              : "bg-sky-500  text-white"
          }`}
        >
          Delete Selected ({selectedSlides.length})
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-sky-500 text-white">
            <th className=" px-4 py-2">Select</th>
            <th className=" px-4 py-2">Grey Line</th>
            <th className=" px-4 py-2">Images</th>
            <th className=" px-4 py-2">Blue Line</th>
            <th className=" px-4 py-2">Link</th>
            <th className=" px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slides.map((slide) => (
            <tr key={slide._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedSlides.includes(slide._id)}
                  onChange={() => handleSelectSlide(slide._id)}
                  className="form-checkbox"
                />
              </td>
              <td className="border px-4 py-2">{slide.grey_line}</td>
              <td className="border px-4 py-2">
                {slide.slide_images.map((image, index) => (
                  <Image
                    width={100}
                    height={100}
                    key={index}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
                    alt="Slide"
                    className="w-16 h-16 object-cover mx-auto"
                  />
                ))}
              </td>
              <td className="border px-4 py-2">{slide.blue_line}</td>
              <td className="border px-4 py-2">{slide.link}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleEditSlide(slide)}
                    className="px-2 py-1 text-sky-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSlide(slide._id)}
                    className="px-2 py-1 text-sky-500 hover:bg-red-600"
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
              {editingSlideId ? "Edit Slide" : "Add Slide"}
            </h2>
            <input
              type="text"
              value={greyLine}
              onChange={(e) => setGreyLine(e.target.value)}
              placeholder="Grey Line"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <div className="flex space-x-2 mb-4">
              {imagePreview.map(
                (preview, index) => (
                  console.log("preview:", preview),
                  (
                    <Image
                      width={100}
                      height={100}
                      key={index}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${preview}`}
                      alt="Preview"
                      className="w-16 h-16 object-cover"
                    />
                  )
                )
              )}
            </div>
            <input
              type="text"
              value={blueLine}
              onChange={(e) => setBlueLine(e.target.value)}
              placeholder="Blue Line"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Link"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSlide}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {editingSlideId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlidesPage;
