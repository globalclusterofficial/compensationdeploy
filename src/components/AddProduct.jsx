import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { IoCloudUploadOutline } from "react-icons/io5";
import TakeInput from "./TakeInput";
import { useForm } from "react-hook-form";
import { useUser } from "../hooks/auth/useUser";

function AddProduct({ addNewProduct, CloseModalWindow, currentStatus }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      description: "",
      productValue: "",
      linkValue: "",
    },
  });
  const { user } = useUser();
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productLinkType, setProductLinkType] = useState("website");

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        CloseModalWindow(!currentStatus);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [CloseModalWindow, currentStatus]);

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
    try {
      formData.append("product_name", data.productName);
      formData.append("description", data.description);
      formData.append("company", user?.profile?.user_id);
      formData.append("product_link_type", productLinkType);
      formData.append("product_value", 0);
      formData.append("product_link", data.linkValue);
      if (selectedFile) {
        formData.append("product_image", selectedFile, selectedFile.name);
      }
      await addNewProduct(formData);
      CloseModalWindow(!currentStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-scroll">
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
          <p className="font-thin">Add New Product</p>
          <div
            className="cursor-pointer"
            onClick={() => CloseModalWindow(!currentStatus)}
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
          {/* <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="productValue" className="block">
              Product Value
            </label>
            <input
              type="text"
              id="productValue"
              className="border rounded-md outline-none p-2 w-full"
              {...register("productValue", {
                required: "Product Value is required",
              })}
            />
            {errors.productValue && (
              <p className="text-red-500">{errors.productValue.message}</p>
            )}
          </div> */}

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
            <p
              onClick={() => CloseModalWindow(!currentStatus)}
              className="flex-1 flex items-center justify-center px-4 py-6 border rounded-xl border-primary-light hover:bg-primary-light hover:text-white cursor-pointer"
            >
              Cancel
            </p>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center px-4 py-6 bg-primary-light text-white rounded-xl cursor-pointer hover:bg-primary-dark"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddProduct.propTypes = {
  addNewProduct: PropTypes.func.isRequired,
  CloseModalWindow: PropTypes.func.isRequired,
  currentStatus: PropTypes.bool.isRequired,
};

export default AddProduct;
