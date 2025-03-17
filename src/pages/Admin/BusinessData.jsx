import AdminDashboardHeader from "./../../components/ui/Header";
import UserCredentials from "../../components/UserCredentials";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import { useGetBusinessDataQuery } from "../../features/business/businessApiSlice";
import TableData from "../../components/ui/TableData";
import Filter from "../../components/ui/Filter";
import { useDeleteProductMutation } from "../../features/product/productApiSlice";

function BusinessData() {
  const params = useParams();
  const { businessId } = params;
  const { data: businessData = {} } = useGetBusinessDataQuery(businessId);
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const allProducts = businessData?.products ?? [];
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  async function handleDelete(productId) {
    try {
      await deleteProduct(productId).unwrap();
      navigate(0);
    } catch (error) {
      if (error.response) {
        // Server errors (status code outside of 2xx range)
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        // Network errors or no response from server
        console.error("Network Error:", error.message);
      } else {
        // Other errors
        console.error("Error:", error.message);
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-50 px-10 py-14">
      {businessData?.company_details ? (
        <>
          <AdminDashboardHeader />
          <UserCredentials
            userData={businessData?.company_details}
            adminPage={true}
            nonUser={true}
            business={true}
          />
          <section className="flex flex-col gap-6 px-12">
            <Filter
              data={allProducts}
              setProductFunction={() => {}}
              showDownload={true}
            />
            <div className="flex flex-col gap-10">
              <TableData
                data={currentProducts}
                type="business-products"
                tableHeadNames={[
                  "Product Name",
                  "Description",
                  "No of shares",
                  "Traffic",
                  "Status",
                  "Action",
                ]}
                onDelete={(productId) => handleDelete(productId)}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(allProducts.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </section>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default BusinessData;
