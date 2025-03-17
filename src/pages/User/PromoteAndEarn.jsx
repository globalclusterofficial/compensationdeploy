import React, { useContext, useEffect, useState } from "react";
import PromoteAndEarnRowTable from "../../components/PromoteAndEarnRowTable";
import Filter from "../../components/ui/Filter";
import BusinessDashboardHeader from "../../components/ui/Header";
import PageDataHeader from "../../components/ui/PageDataHeader";
import TicketCard from "../../components/ui/TicketCard";
import {
  useProductsMutation,
  useGetUserShareBonusesQuery,
} from "../../features/product/productApiSlice";
import { ModalContext } from "../../App";
import ShareLinksScreen from "../../components/ShareLinksScreen";
import Modal from "../../components/Modal";

function PromoteAndEarn() {
  const [products] = useProductsMutation();
  const [productsData, setProductsData] = useState([]);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [linkToShare, setLinkToShare] = useState("");
  const [productId, setProductId] = useState("");
  const {
    data: userBonuses = [],
    isLoading: queryLoading,
    isError: queryError,
  } = useGetUserShareBonusesQuery();

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await products().unwrap();
        setProductsData(response);
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
    fetchedProducts();
  }, []);

  return (
    <div className="bg-gray-50">
      <BusinessDashboardHeader />
      <main className="mx-2 my-2 lg:mx-10 lg:my-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
        <section className="px-10 py-10">
          <PageDataHeader name="Promote & Earn" />
        </section>
        <section className="p-1 lg:p-10  bg-gray-50  rounded-xl m-20 flex flex-col lg:flex-row gap-8">
          <TicketCard
            name="No of Links Shared"
            numbers={userBonuses.length > 0 ? userBonuses.length : 0}
          />
          <TicketCard
            name="Bonus Earned"
            numbers={
              userBonuses.length > 0
                ? (userBonuses.length * 50).toLocaleString()
                : 0
            }
          />
        </section>
        <section className="p-10 ">
          <div className="p-8 flex flex-col gap-10">
            <Filter
              data={productsData}
              setProductFunction={setProductsData}
              showDownload={false}
            />
          </div>
          <div>
            <PromoteAndEarnRowTable
              products={productsData}
              handleShareModal={() => setShowModal(!showModal)}
              setLinkToShare={setLinkToShare}
              setProductId={setProductId}
            />
          </div>
        </section>
        {showModal && (
          <Modal>
            <ShareLinksScreen
              handleSharingMoodal={() => setShowModal(!showModal)}
              urlToShare={linkToShare}
              productId={productId}
              product={productsData.find(
                (product) => product.uuid === productId,
              )}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default PromoteAndEarn;
