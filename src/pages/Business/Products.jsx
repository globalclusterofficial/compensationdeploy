import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "./../../App";
import ActionNotification from "../../components/ActionNotification";
import AddProduct from "../../components/AddProduct";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import Filter from "../../components/ui/Filter.jsx";
import BusinessDashboardHeader from "../../components/ui/Header";
import PageDataHeader from "../../components/ui/PageDataHeader";
import ProductsTicket from "../../components/ui/ProductTickets";
import TableData from "../../components/ui/TableData";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useProductMutation,
  useProductsMutation,
} from "../../features/product/productApiSlice";
import { itemsPerPage } from "../../lib/constants";

function Products() {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [showAction, setShowAction] = useState(false);

  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [product] = useProductMutation();
  const [products] = useProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();
  async function addNewProduct(formData) {
    try {
      const response = await addProduct(formData).unwrap();
      setProductsData([...productsData, response]);
      setShowModal(false);
      showTemporaryNotification();
    } catch (error) {
      throw new Error("Failed to add new product");
    }
  }

  async function handleDelete(productId) {
    try {
      await deleteProduct(productId).unwrap();
      const updatedProducts = productsData.filter(
        (product) => product.uuid !== productId,
      );
      setProductsData(updatedProducts);
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

  async function handleShowProductDetails(productId) {
    try {
      const productData = await product(productId).unwrap();

      return productData;
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

  function showTemporaryNotification() {
    setShowAction(true);
    setTimeout(() => {
      setShowAction(false);
    }, 2000);
  }

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await products().unwrap();

        setProductsData(response);
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
    };
    fetchedProducts();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = productsData.slice(startIndex, endIndex);

  return (
    <div className="lg:flex lg:flex-col lg:gap-8 bg-gray-50">
      <BusinessDashboardHeader />
      <main className="m-2 lg:m-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
        <div className="py-20 px-5 lg:px-20 flex flex-col gap-10">
          <div className="flex lg:flex-row flex-col justify-between items-start lg:items-center">
            <PageDataHeader name="Products" to="products" />
            <Button
              onClick={() => setShowModal(!showModal)}
              btnText="Add New Product"
            />
          </div>

          {showModal && (
            <Modal>
              <AddProduct
                addNewProduct={addNewProduct}
                CloseModalWindow={setShowModal}
                currentStatus={showModal}
              />
            </Modal>
          )}

          {showAction && (
            <Modal>
              <ActionNotification message="Product Added Successfully" />
            </Modal>
          )}

          <ProductsTicket products={productsData} />

          <section className="flex flex-col gap-6">
            <Filter
              data={productsData}
              setProductFunction={setProductsData}
              showDownload={true}
            />
            <div className="flex flex-col gap-10">
              <TableData
                data={currentProducts}
                type="company_product"
                tableHeadNames={[
                  "Product Name",
                  "Description",
                  "No of Shares",
                  "Traffic",
                  "Status",
                  "Action",
                ]}
                onDelete={(productId) => handleDelete(productId)}
                handleShowDetails={handleShowProductDetails}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(productsData.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Products;
