import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useUpdateTicketMutation } from "../features/ticket/ticketApiSlice";

function EditTicket({ setEditDetail, item, CloseModalWindow }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [updateTicket] = useUpdateTicketMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

  useEffect(() => {
    if (item) {
      setValue("priority", item.priority.toLowerCase());
      setValue("description", item.description);
      setValue("title", item.need);
      setValue("attachments", selectedFile, setSelectedFile.name);
      setValue("assigned_to", item.assigned_to);
    }
  }, [item, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (!item.uuid) {
        throw new Error("Ticket UUID is missing");
      }
      const response = await updateTicket({
        uuid: item.uuid,
        ...data,
      }).unwrap();
      if (response.success) {
        setEditDetail(false);
        CloseModalWindow();
      } else {
        console.error("Update failed:", response.error);
        setErrorMessage("Failed to update ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      setErrorMessage("Failed to update ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        ref={modalRef}
        className="w-[50rem] font-thin flex flex-col gap-2 bg-white border rounded-xl"
      >
        <div className="flex justify-between items-center px-16 py-8 border-b">
          <p className="font-thin">Edit Ticket</p>
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
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="border rounded-md outline-none p-2 w-full"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
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

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="status" className="block">
              Status
            </label>
            <select
              id="status"
              className="border rounded-md outline-none p-2 w-full"
              {...register("status", { required: "Status is required" })}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && (
              <p className="text-red-500">{errors.status.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="priority" className="block">
              Priority
            </label>
            <select
              id="priority"
              className="border rounded-md outline-none p-2 w-full"
              {...register("priority", { required: "Priority is required" })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500">{errors.priority.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="assigned_to" className="block">
              Assigned To
            </label>
            <input
              type="text"
              id="assigned_to"
              className="border rounded-md outline-none p-2 w-full"
              {...register("assigned_to")}
            />
          </div>

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

EditTicket.propTypes = {
  CloseModalWindow: PropTypes.func.isRequired,
  setEditDetail: PropTypes.func.isRequired,
  item: PropTypes.object,
};

export default EditTicket;
