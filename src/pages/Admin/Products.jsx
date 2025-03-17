import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "./../../App";
import ActionNotification from "../../components/ActionNotification";
import AddProduct from "../../components/AddProduct";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import Filter from "../../components/ui/Filter";
import AdminDashboardHeader from "../../components/ui/Header";
import PageDataHeader from "../../components/ui/PageDataHeader";
import ProductsTicket from "../../components/ui/ProductTickets";
import TableData from "../../components/ui/TableData";
import { BiTime, BiSolidCoinStack } from "react-icons/bi";

import {
  useAddProductMutation,
  useDeleteProductMutation,
  useProductMutation,
  useProductsMutation,
  useUpdateProductMutation,
  useNonPendingPoductsMutation,
  usePendingPoductsMutation,
} from "../../features/product/productApiSlice";
import { itemsPerPage } from "../../lib/constants";

const initialProductsData = [];

function Products() {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [showAction, setShowAction] = useState(false);

  const [productsData, setProductsData] = useState(initialProductsData);
  const [pendingProductsData, setPendingProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [product] = useProductMutation();
  const [products] = useNonPendingPoductsMutation();
  const [pendingProducts] = usePendingPoductsMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [tabs, setTabs] = useState("products");

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

  async function handleShowProductDetails(productId) {
    try {
      const productData = await product(productId).unwrap();

      return productData;
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
        const pendingData = await pendingProducts().unwrap();
        setPendingProductsData(pendingData);
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
  const currentPendingProducts = pendingProductsData.slice(
    startIndex,
    endIndex,
  );

  return (
    <div className="flex flex-col gap-8 bg-gray-50">
      <AdminDashboardHeader />
      <main className="m-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
        <div className="py-20 px-20 flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <PageDataHeader name="Products" to="products" />
          </div>
          <div className="flex gap-8">
            <p
              className={`${
                tabs === "products" ? "border-b-2 border-black" : ""
              } flex px-2 gap-2 items-center cursor-pointer font-semibold`}
              onClick={() => setTabs("products")}
            >
              <BiSolidCoinStack />
              Products
            </p>
            <p
              className={`${
                tabs === "productsRequest" ? "border-b-2 border-black" : ""
              } flex px-2 gap-2 items-center cursor-pointer font-semibold`}
              onClick={() => setTabs("productsRequest")}
            >
              <BiTime />
              Product Requests
            </p>
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
          {tabs === "products" && (
            <section className="flex flex-col gap-6">
              <Filter
                data={productsData}
                setProductFunction={setProductsData}
                showDownload={true}
              />
              <div className="flex flex-col gap-10">
                <TableData
                  data={currentProducts}
                  tableHeadNames={[
                    "Product Name",
                    "Company",
                    "Description",
                    "Link",
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
          )}
          {tabs === "productsRequest" && (
            <section className="flex flex-col gap-6">
              <Filter
                data={pendingProductsData}
                setProductFunction={setPendingProductsData}
                showDownload={true}
              />
              <div className="flex flex-col gap-10">
                <TableData
                  data={currentPendingProducts}
                  type="products_request"
                  tableHeadNames={[
                    "Product Name",
                    "Company",
                    "Description",
                    "Link",
                    "Action",
                  ]}
                  handleShowDetails={handleShowProductDetails}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    pendingProductsData.length / itemsPerPage,
                  )}
                  onPageChange={handlePageChange}
                />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default Products;
