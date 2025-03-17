import React from "react";
import { ImCancelCircle } from "react-icons/im";
import PropTypes from "prop-types";
import { IoCopyOutline } from "react-icons/io5";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { useShareProductMutation } from "../features/product/productApiSlice";
import { useUser } from "../hooks/auth/useUser";
import { FRONTEND_URL } from "../lib/constants";

function ShareLinksScreen({
  handleSharingMoodal,
  urlToShare,
  productId,
  product,
}) {
  const { user } = useUser();
  const [recordShare] = useShareProductMutation();
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(urlToShare).then(() => {
      alert("URL copied to clipboard!");
    });
  };
  const shareMessage = `Enjoy unbeatable rates on ${product.product_name}! 🛒✨. Click to learn more and seize this opportunity: ${FRONTEND_URL}/product/${product.uuid}?referrer=${user?.user_id} Join a community of satisfied customers at The Global Clusters and explore incredible deals today! 🌍`;

  const socialMediaLinks = [
    {
      icon: <FaTwitter />,
      name: "Twitter",
      color: "#1DA1F2",
      link: `https://twitter.com/intent/tweet?text=${shareMessage}`,
    },
    {
      icon: <FaFacebookF />,
      name: "Facebook",
      color: "#1877F2",
      link: `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`,
    },
    {
      icon: <FaInstagram />,
      name: "Instagram",
      color: "#E1306C",
      link: `https://www.instagram.com/?url=${urlToShare}`,
    },
    {
      icon: <FaWhatsapp />,
      name: "Whatsapp",
      color: "#25D366",
      link: `https://api.whatsapp.com/send?text=${shareMessage}`,
    },
  ];

  const handleRecordClick = async () => {
    try {
      await recordShare({
        product_id: productId,
      }).unwrap();
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-gray-500">
      <div className="w-auto pr-4 font-thin flex flex-col gap-2 bg-white border overflow-hidden rounded-xl">
        <div className="flex flex-col px-8">
          <div className="flex justify-between items-center py-5 rounded-xl">
            <h2 className="font-semibold text-3xl">Share Product</h2>
            <ImCancelCircle
              style={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={() => handleSharingMoodal()}
            />
          </div>
          <p className="text-gray-500">
            Share on your social media to earn reward
          </p>
        </div>
        <div className=" my-7 p-8 bg-white flex flex-col gap-6 rounded-xl">
          <div className="flex items-center gap-4">
            {socialMediaLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-center items-center gap-2"
                onClick={handleRecordClick}
              >
                <div
                  className="p-8 rounded-full"
                  style={{
                    color: `${social.color}`,
                    backgroundColor: `${social.color}4D`,
                  }} // 30% opacity
                >
                  {social.icon}
                </div>
                <p style={{ color: `${social.color}` }}>{social.name}</p>{" "}
              </a>
            ))}
          </div>
          <div className="relative flex items-center">
            <input
              className="rounded-xl border-2 border-gray-300 p-4 w-full"
              type="text"
              value={urlToShare}
              readOnly
            />
            <IoCopyOutline
              style={{
                fontSize: "2rem",
                cursor: "pointer",
                position: "absolute",
                right: "1rem",
              }}
              onClick={handleCopyToClipboard}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ShareLinksScreen.propTypes = {
  handleSharingMoodal: PropTypes.func.isRequired,
  urlToShare: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
};

export default ShareLinksScreen;
