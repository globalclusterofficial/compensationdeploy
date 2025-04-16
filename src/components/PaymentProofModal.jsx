import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { ImCancelCircle } from "react-icons/im";
import ProductDetailImage from "./../assets/images/detailsImg.jpeg";
import ShowPaymentProof from "./ShowPaymentProof";
import { useUser } from "../hooks/auth/useUser";
import {
  useFetchUserPaymentProofUploadMutation,
  useGetUserProfileVerifyMutation,
} from "../features/user/userApiSlice";
import { cn } from "../lib/utils";
import Notification from "./ui/Notification";
import { RiVerifiedBadgeFill } from "react-icons/ri";
// import ProfilePicture from "./ProfilePicture";

function PaymentProofModal({ user, setSelectedUser }) {
  console.log(user);
  const [paymentProofUpload] = useFetchUserPaymentProofUploadMutation();
  const inputRef = React.useRef(null);
  const [notification, setNotification] = React.useState(null);
  const [changedPaymentProofUrl, setChangedPaymentProofUrl] =
    React.useState(null);
  const [changedPaymentProofFileType, setChangedPaymentProofFileType] =
    React.useState(null);
  // console.log(user);
  const u = useUser();
  // console.log(u)
  const [userProfileVerify] = useGetUserProfileVerifyMutation();
  // console.log(userProfileVerify)
  const verifyUser = () => {
    userProfileVerify(user.id);
    window.location.reload();
  };
  const handlePaymentProofUpdate = async () => {
    if (inputRef.current && inputRef.current.files.length) {
      const form = new FormData();
      console.log(inputRef.current.files[0]);
      // return
      form.append("user_id", user.id || user.user_id);
      form.append("payment_proof", inputRef.current.files[0]);
      // console.log(user.user_id)
      try {
        const response = await paymentProofUpload(form).unwrap();
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.error("Server Error:", JSON.stringify(error.response));
        } else if (error.request) {
          console.error("Network Error:", error.message);
        } else {
          if (error.data) {
            console.error("Error:", error);
            setNotification({
              message:
                error.data.payment_proof ||
                error.data.user_id ||
                "Unexpected error. Please try again.",
              type: "error",
            });
            setTimeout(() => setNotification(null), 3000);
          }
        }
      }
      // window.location.reload();
    } else {
      setNotification({
        message: "You did not select a document",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
  };
  const handlePaymentProofChange = (e) => {
    let file = null;
    if (e.target instanceof Blob) {
      file = e.target;
    } else if (e.target.files && e.target.files.length > 0) {
      file = e.target.files[0];
    }
    if (file) {
      const src = URL.createObjectURL(file);
      console.log(src);
      setChangedPaymentProofUrl(src);
      setChangedPaymentProofFileType(file.type);
      // if (imageRef.current) imageRef.current.src = src;
      // setImage && setImage(file);
    }
    // const src = URL.createObjectURL(e.target.value);
    // if (imageRef.current) imageRef.current.src = src;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-gray-500">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="relative w-[60rem] h-[90vh] font-thin grid grid-rows-[auto_1fr_auto] gap-2 bg-gray-100 border rounded-xl">
        <div className="flex justify-between items-center px-8 py-5 bg-white rounded-xl">
          <h2 className="text-2xl">
            Proof of payment of{" "}
            <span className="font-bold text-black">{user.name}</span>
          </h2>
          <ImCancelCircle
            style={{ fontSize: "2rem", cursor: "pointer" }}
            onClick={() => setSelectedUser(null)}
          />
        </div>
        <div className="p-10">
          <ShowPaymentProof
            payment_proof_url={changedPaymentProofUrl || user.payment_proof}
            fileType={changedPaymentProofFileType}
          />
          {/* <ShowPaymentProof payment_proof_url={user.payment_proof} /> */}
        </div>
        <ModalControls
          user={user}
          handlePaymentProofChange={handlePaymentProofChange}
          handlePaymentProofUpdate={handlePaymentProofUpdate}
          verifyUser={verifyUser}
          inputRef={inputRef}
          userType={u.user.user_type}
        />
      </div>
    </div>
  );
}

PaymentProofModal.propTypes = {
  user: PropTypes.object,
  setSelectedUser: PropTypes.func,
  // type: PropTypes.string,
  // banksData: PropTypes.array,
};

ModalControls.propTypes = {
  user: PropTypes.object,
  inputRef: PropTypes.object,
  handlePaymentProofChange: PropTypes.func,
  handlePaymentProofUpdate: PropTypes.func,
  verifyUser: PropTypes.func,
  userType: PropTypes.string,
  // type: PropTypes.string,
  // banksData: PropTypes.array,
};
function ModalControls({
  user,
  inputRef,
  handlePaymentProofChange,
  handlePaymentProofUpdate,
  verifyUser,
  userType,
}) {
  return (
    <div className="flex items-center justify-between gap-10 m-4">
      {/* <ProfilePicture /> */}
      {!user.is_verified && (
        <div className="flex gap-8">
          <label
            htmlFor="payment_proof"
            className="bg-slate-300 p-2 rounded-lg cursor-pointer"
          >
            select a file
          </label>
          <input
            ref={inputRef}
            accept="application/pdf,image/jpeg,image/png"
            type="file"
            name="payment_proof"
            id="payment_proof"
            onChange={handlePaymentProofChange}
            hidden
          />
          <button
            className={cn(
              "bg-primary-light text-white font-semibold",
              "p-2 px-4 rounded-md flex items-center justify-center gap-4 hover:bg-primary-dark cursor-pointer select-none",
              inputRef.current && !inputRef.current.files.length && "hidden",
            )}
            onClick={() => handlePaymentProofUpdate()}
          >
            {!user.payment_proof ? "Upload" : "Update"}
          </button>
        </div>
      )}
      {!user.is_verified && user.is_approved && userType === "admin" && (
        <button
          className="bg-green-600 text-white font-semibold
                        p-2 px-4 rounded-md flex items-center justify-center gap-4 hover:bg-primary-dark cursor-pointer select-none"
          onClick={() => verifyUser()}
        >
          Verify user <RiVerifiedBadgeFill className="fill-white" />
        </button>
      )}
    </div>
  );
}

export default PaymentProofModal;
