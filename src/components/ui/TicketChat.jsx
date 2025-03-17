import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { convertStandardDate } from "../../lib/utils";
import { ImBin } from "react-icons/im";
import UserImg from "../../assets/images/userProfile.png";
import { useUser } from "../../hooks/auth/useUser";
import Modal from "../Modal";
import { ImCancelCircle } from "react-icons/im";

function TicketChat({ ticket, handleDeleteReply, reply }) {
  const { user } = useUser();
  const ticketDateTime = new Date(ticket.date_created);
  const [showAttachment, setShowAttachment] = useState(false);

  return (
    <div className="flex border border-[#8496A5] rounded-2xl w-full">
      <div className="flex flex-col py-16 px-14 ml-3 border-r-[0.61px] border-[#DEE2E6]">
        <div className="flex flex-col justify-center items-start w-48 overflow-hidden">
          <img
            className="h-[50px] w-[50px] rounded-lg"
            src={ticket?.submitted_by?.profile_picture ?? UserImg}
            alt="Settings Page Business Logo"
          />
          <p className="font-normal text-2xl mt-2">
            {ticket.submitted_by.name}
          </p>
          <p className="font-normal text-lg text-[#5B6E88]">
            @{ticket.submitted_by.name}
          </p>
          {user.email === ticket.submitted_by.email && reply && (
            <div
              className="bg-[#DC3545] flex items-center justify-center px-3 py-1.5 gap-1.5 rounded mt-2 cursor-pointer"
              onClick={() => {
                handleDeleteReply(ticket.id);
              }}
            >
              <ImBin color="white" size={11} />
              <p className="text-white text-[13px] mt-1">Delete</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col py-9 pl-11">
        <p>Posted on {convertStandardDate(ticket?.date_created)}</p>
        <p>
          @{" "}
          {`${ticketDateTime.getHours()}:${ticketDateTime.getMinutes().toString().length === 1 ? `0${ticketDateTime.getMinutes()}` : ticketDateTime.getMinutes()}`}
        </p>
        <p className="mt-11">{ticket.description}</p>
        {ticket?.attachment && (
          <div className="flex items-center gap-2 mt-5">
            <p>Attachment: </p>
            <img
              className="h-[50px] w-[50px] rounded-lg cursor-pointer"
              src={ticket?.attachment}
              alt="Ticket Attachment"
              onClick={() => setShowAttachment(true)}
            />
          </div>
        )}
      </div>
      {showAttachment && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-[90rem] max-h-[90vh] font-thin flex flex-col gap-2 bg-white border rounded-xl overflow-y-scroll">
              <div className="flex justify-between items-center px-5 py-2">
                <p>Attachment</p>
                <div
                  className="cursor-pointer"
                  onClick={() => setShowAttachment(false)}
                >
                  <ImCancelCircle style={{ fontSize: "2rem" }} />
                </div>
              </div>

              <img
                className="h-[90rem] w-[90rem]"
                src={ticket?.attachment}
                alt="Ticket Attachment"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

TicketChat.propTypes = {
  ticket: PropTypes.object,
  handleDeleteReply: PropTypes.func,
  reply: PropTypes.bool,
};

export default TicketChat;
