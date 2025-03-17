import PropTypes from "prop-types";
import React from "react";
import { MdIosShare } from "react-icons/md";
import productImg from "./../assets/images/productImg.png";
import { getDateStr } from "../lib/utils";
import { useShareProductRequestMutation } from "../features/product/productApiSlice.js";
import { DecreaseDescription } from "../lib/utils";

const PromoteAndEarnRowTable = ({
  products,
  handleShareModal,
  setLinkToShare,
  setProductId,
}) => {
  const [shareRequest] = useShareProductRequestMutation();

  const handleClick = async (item) => {
    try {
      await shareRequest({ product_id: item.uuid });
      handleShareModal();
      setLinkToShare(item?.product_link);
      setProductId(item.uuid);
    } catch (error) {
      console.error("Error submitting share request:", error);
    }
  };

  return (
    <div className="container mx-auto px-10 py-7 overflow-x-auto">
      <table className="w-full min-w-max text-gray-500">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-6 font-normal min-w-[150px]">Product</th>
            <th className="pb-6 font-normal min-w-[150px]">Company Name</th>
            <th className="pb-6 font-normal min-w-[250px]">Description</th>
            <th className="pb-6 font-normal min-w-[120px]">Date</th>
            <th className="pb-6 font-normal min-w-[100px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b">
              <td className="py-6 pr-5 min-w-[150px]">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded mr-4">
                    <img
                      src={
                        product.product_image
                          ? product.product_image
                          : productImg
                      }
                      alt="Product"
                      className="w-12 h-12 bg-orange-2000"
                    />
                  </div>
                  <span>{product.name}</span>
                </div>
              </td>
              <td className="py-6 pr-5 min-w-[150px]">
                {product?.company_name}
              </td>
              <td className="py-6 pr-5 min-w-[250px]">
                {DecreaseDescription(product.description)}
              </td>
              <td className="py-6 pr-5 min-w-[120px]">
                {product?.date_created
                  ? getDateStr(product?.date_created)
                  : new Date().getDay()}
              </td>
              <td className="py-6 pr-5 min-w-[100px]">
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => handleClick(product)}
                >
                  <span className="mr-3">Share</span>
                  <MdIosShare className="text-4xl" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

PromoteAndEarnRowTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleShareModal: PropTypes.func.isRequired,
  setLinkToShare: PropTypes.func.isRequired,
  setProductId: PropTypes.func.isRequired,
};

export default PromoteAndEarnRowTable;
