import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { IoCloudUploadOutline } from "react-icons/io5";
import TakeInput from "./TakeInput";
import { useForm } from "react-hook-form";
import { useUpdateProductMutation } from "../features/product/productApiSlice";
import { useNavigate } from "react-router-dom";

function EditProduct({ setEditDetail, item, CloseModalWindow }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: item.product_name,
      description: item.description,
      productValue: item.product_value,
      linkValue: item.product_link,
    },
  });

  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productLinkType, setProductLinkType] = useState("website");
  const [updateProduct] = useUpdateProductMutation();
  const [errorMessage, setErrorMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEditDetail(false);
        CloseModalWindow();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setEditDetail, CloseModalWindow]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleProductLinkTypeChange = (e) => {
    setProductLinkType(e.target.id);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      formData.append("product_name", data.productName);
      formData.append("description", data.description);
      formData.append("product_link_type", productLinkType);
      formData.append("product_value", data.productValue);
      formData.append("product_link", data.linkValue);
      if (selectedFile) {
        formData.append("product_image", selectedFile, selectedFile.name);
      }
      formData.append("uuid", item.uuid);
      if (!item.uuid) {
        throw new Error("Product UUID is missing");
      }
      const response = await updateProduct({ uuid: item.uuid, data: formData });
      if (!response?.error) {
        setEditDetail(false);
      } else {
        console.error("Update failed:", response.error);
      }
      if ("data" in response) {
        setEditDetail(false);
      } else {
        console.error("Update failed:", response.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
      navigate(0);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        ref={modalRef}
        className={`w-[50rem] font-thin flex flex-col gap-2 bg-white border rounded-xl ${
          dragging ? "border-blue-500" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex justify-between items-center px-16 py-8 border-b">
          <p className="font-thin">Edit Product</p>
          <div
            className="cursor-pointer"
            onClick={() => setEditDetail(false) && CloseModalWindow()}
          >
            <ImCancelCircle style={{ fontSize: "2rem" }} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-14 py-8 flex flex-col gap-8"
        >
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="productName" className="block">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="border rounded-md outline-none p-2 w-full"
              {...register("productName", {
                required: "Product Name is required",
              })}
            />
            {errors.productName && (
              <p className="text-red-500">{errors.productName.message}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="description" className="block">
              Description
            </label>
            <textarea
              className="border rounded-md p-2 outline-none"
              rows="5"
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-4 cursor-pointer">
            <label htmlFor="productImage" className="block">
              Product Image
            </label>
            <div
              className={`flex flex-col border-dashed border-2 rounded-lg h-[10rem] w-full items-center justify-center ${
                dragging ? "bg-blue-100 border-blue-500" : "border-gray-300"
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                type="file"
                id="fileInput"
                name="productImage"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />
              {selectedFile ? (
                <p className="text-gray-400">{selectedFile.name}</p>
              ) : (
                <div className="flex flex-col gap-4 items-center justify-center">
                  <IoCloudUploadOutline style={{ fontSize: "5rem" }} />
                  <p className={`text-gray-400 ${dragging ? "hidden" : ""}`}>
                    Drag and Drop files here
                  </p>
                </div>
              )}
              {dragging && (
                <p className="text-blue-500">Release to drop the file</p>
              )}
            </div>
          </div>

          {/* <div className="flex flex-col gap-4">
            <label htmlFor="productLinkType" className="block">
              Product Link Type
            </label>
            <div className="flex gap-4">
              <label className="py-4 px-6 flex-1 font-thin flex gap-2 border-2 rounded-xl">
                <input
                  type="radio"
                  id="whatsapp"
                  {...register("productLinkType", {
                    required: "Link Type is required",
                  })}
                  value="whatsapp"
                  onChange={handleProductLinkTypeChange}
                  checked={productLinkType === "whatsapp"}
                />
                WhatsApp
              </label>
              <label className="py-4 px-6 flex-1 font-thin flex gap-2 border-2 rounded-xl">
                <input
                  type="radio"
                  id="website"
                  {...register("productLinkType", {
                    required: "Link Type is required",
                  })}
                  value="website"
                  onChange={handleProductLinkTypeChange}
                  checked={productLinkType === "website"}
                />
                Website
              </label>
              <label className="py-4 px-6 flex-1 font-thin flex gap-2 border-2 rounded-xl">
                <input
                  type="radio"
                  id="phone"
                  {...register("productLinkType", {
                    required: "Link Type is required",
                  })}
                  value="phone"
                  onChange={handleProductLinkTypeChange}
                  checked={productLinkType === "phone"}
                />
                Phone
              </label>
            </div>
            {errors.productLinkType && (
              <p className="text-red-500">{errors.productLinkType.message}</p>
            )}
          </div> */}

          <TakeInput
            type={productLinkType}
            register={register}
            errors={errors}
          />

          <div className="flex items-center justify-center gap-4">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <p
              onClick={() => setEditDetail(false) && CloseModalWindow()}
              className="flex-1 flex items-center justify-center px-4 py-6 border rounded-xl border-primary-light hover:bg-primary-light hover:text-white cursor-pointer"
            >
              Cancel
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 flex items-center justify-center px-4 py-6 bg-primary-light text-white rounded-xl cursor-pointer ${
                isSubmitting ? "opacity-50" : "hover:bg-primary-dark"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditProduct.propTypes = {
  CloseModalWindow: PropTypes.func.isRequired,
  setEditDetail: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default EditProduct;
