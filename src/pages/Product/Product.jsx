import React, { useEffect } from "react";
import { MdArrowUpward } from "react-icons/md";
import { useGetProductQuery } from "../../features/product/productApiSlice";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../lib/constants";
import ProductImg from "../../assets/images/productImg.png";

const Product = () => {
  const { productId } = useParams();
  const {
    data: productData = {},
    error: queryIsError,
    isLoading: queryIsLoading,
  } = useGetProductQuery(productId);

  if (queryIsError) return <p>Erro fetching product</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-center bg-[#143C5E] py-12">
        <div className="flex items-center gap-3">
          <img src="/images/global_cluster_logo.png" />
          <p className="text-white font-semibold text-5xl">The Global Clusters</p>
        </div>
      </header>
      {productData?.product_name && (
        <main className="flex items-center justify-center w-full h-full px-[294px] py-[194px]">
          <div className="flex gap-24 items-center justify-center">
            <img
              src={
                productData?.product_image &&
                productData?.product_image.includes(BASE_URL)
                  ? productData?.product_image
                  : productData?.product_image
                    ? `${BASE_URL}/${productData?.product_image}`
                    : ProductImg
              }
              className="size-[30rem]"
            />
            <div className="flex flex-col gap-4 w-[564px]">
              <p className="font-bold text-4xl">{productData?.product_name}</p>
              <p className="mt-5 font-semibold text-2xl">Description</p>
              <p>{productData?.description}</p>
              <div className="flex gap-3.5">
                <div className="bg-[#F2F2F2] flex items-center p-6 rounded-lg w-full">
                  <p>
                    {productData?.product_link
                      ? `${productData?.product_link.slice(0, 50)}${productData?.product_link.length > 50 && "..."}`
                      : ""}
                  </p>
                </div>
                <a
                  href={`https://${productData?.product_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex p-5 rounded-[10px] items-center justify-center cursor-pointer bg-[#24669E] [&>*]:rotate-45"
                >
                  <MdArrowUpward color="white" size={40} />
                </a>
              </div>
            </div>
          </div>
        </main>
      )}
      {queryIsLoading && <p>Loading ...</p>}
    </div>
  );
};

export default Product;
