import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ImCancelCircle } from "react-icons/im";
import { useReplyTicketMutation } from "../features/ticket/ticketApiSlice";
import { useNavigate } from "react-router-dom";
import TicketChat from "./ui/TicketChat";
import {
  useUpdateTicketMutation,
  useDeleteReplyMutation,
} from "../features/ticket/ticketApiSlice";

function TicketReply({ ticket, setReplyDetail, CloseModalWindow }) {
  const navigate = useNavigate();
  const [deleteReply] = useDeleteReplyMutation();
  const [updateTicket] = useUpdateTicketMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [replyTicket] = useReplyTicketMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replies, setReplies] = useState(ticket.replies);

  async function handleDeleteReply(replyId) {
    try {
      await deleteReply(replyId).unwrap();
      setReplies(replies.filter((reply) => reply.uuid !== replyId));
      navigate(0);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  async function handleCloseTicket() {
    try {
      await updateTicket({
        id: ticket.uuid,
        data: { status: "resolved" },
      }).unwrap();
      navigate(0);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("ticket", ticket.uuid);
    formData.append("reply_text", data.reply_text);
    if (data.attachment.length > 5) {
      setErrorMessage("Max number of attachments exceeded");
      return;
    }
    if (data.attachment[0]) {
      formData.append("attachment", data.attachment[0]);
    }

    try {
      await replyTicket({ ticketId: ticket.uuid, data: formData }).unwrap();
      setReplyDetail(false);
      navigate(0);
      CloseModalWindow();
    } catch (error) {
      console.error("Failed to reply to ticket:", error);
      setErrorMessage("Failed to reply to ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-[130rem] max-h-[90vh] font-thin flex flex-col gap-2 bg-white border rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-10 py-8">
          <p className="font-thin">Reply Ticket</p>
          <div
            className="cursor-pointer"
            onClick={() => setReplyDetail(false) && CloseModalWindow()}
          >
            <ImCancelCircle style={{ fontSize: "2rem" }} />
          </div>
        </div>
        <div className="px-12 py-8 flex flex-col gap-8 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <p
                className={`px-4 py-1 rounded-full w-fit text-center border ${
                  ticket.status.toLowerCase() === "resolved"
                    ? "bg-yellow-100 text-yellow-500  border-yellow-500"
                    : ticket.status.toLowerCase() === "in-progress"
                      ? "bg-green-100 text-green-800 border-green-800"
                      : ""
                }`}
              >
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </p>
              <p className="text-[#34495E]">{ticket.title}</p>
            </div>
            {ticket.status === "in-progress" && (
              <p
                className="flex gap-3 items-center px-4 py-5 cursor-pointer bg-red-500 rounded-full"
                onClick={() => handleCloseTicket()}
              >
                <ImCancelCircle style={{ fontSize: "2rem", color: "white" }} />
                <p className="text-white">Close Ticket</p>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-6 p-4 overflow-y-scroll rounded-md border-2 border-gray-300">
            <TicketChat ticket={ticket} />
            {replies.length > 0 &&
              replies.map((reply, index) => (
                <TicketChat
                  key={index}
                  ticket={{
                    id: reply.uuid,
                    date_created: reply.date_created,
                    description: reply.reply_text,
                    submitted_by: {
                      name: reply.replied_by.name,
                      profile_picture: reply.replied_by.profile_picture,
                      email: reply.replied_by.email,
                    },
                    attachment: reply.attachment
                  }}
                  handleDeleteReply={handleDeleteReply}
                  reply={true}
                />
              ))}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <textarea
                id="reply_text"
                placeholder="Your reply..."
                {...register("reply_text", { required: "Reply is required" })}
                className="w-full p-2 border rounded-xl border-[#CED4DA]"
                rows="4"
              ></textarea>
              {errors.reply_text && (
                <p className="text-red-500">{errors.reply_text.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">
                Attachment:{"  "}
                <span className="text-red-500">
                  Max 1 file can be uploaded. Maximum upload size is 256M
                </span>
              </label>
              <div className="flex gap-4 items-center">
                <div className="flex w-1/3">
                  <input
                    placeholder="Select your file(s)"
                    readOnly
                    value={
                      watch("attachment") !== undefined
                        ? Array.from(watch("attachment")).map(
                            (file) => ` ${file?.name}`,
                          )
                        : ""
                    }
                    className="w-full p-4 border border-gray-300 outline-none rounded-l-2xl"
                  />
                  <div
                    className="bg-primary-light text-white font-semibold py-4 px-4 rounded-r-2xl hover:bg-primary-dark
                transition duration-300 flex gap-4 items-center justify-center cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="attachment"
                        className="select-none text-3xl font-thin"
                      >
                        Upload
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex size-20 mb-0.5 px-4 items-center justify-center bg-blue-950 rounded-lg"
                >
                  <p className="text-white">Reply</p>
                </button>
              </div>
              <input
                type="file"
                id="attachment"
                className="hidden"
                multiple="multiple"
                {...register("attachment")}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
            </div>
            <p>Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx</p>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

TicketReply.propTypes = {
  ticket: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    date_created: PropTypes.string.isRequired,
    submitted_by: PropTypes.object.isRequired,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        replied_by: PropTypes.object.isRequired,
        date_created: PropTypes.string.isRequired,
        reply_text: PropTypes.string.isRequired,
        attachment: PropTypes.string,
      }),
    ),
  }).isRequired,
  setReplyDetail: PropTypes.func.isRequired,
  CloseModalWindow: PropTypes.func.isRequired,
};

export default TicketReply;
