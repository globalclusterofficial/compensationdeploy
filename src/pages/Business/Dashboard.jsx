import React, { useEffect, useState } from "react";
import GrowBusinessCard from "../../components/ui/GrowBusinessCard";
import BusinessDashboardHeader from "../../components/ui/Header";
import InsightsCard from "../../components/ui/InsightsCard";
import TableData from "../../components/ui/TableData";
import TopProducts from "../../components/ui/TopProducts";
import TrafficReportGraph from "../../components/ui/TrafficReportGraph";
import {
  useProductMutation,
  useProductsMutation,
} from "../../features/product/productApiSlice.js";
import { useTokens } from "../../hooks/auth/useTokens.js";
import { transformProductsToChartData } from "../../lib/utils.js";

const productsDumyData = [
  {
    name: "lorem Ipsum",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.orem ipsum dolor sit, amet consectetur adipisicing elit. Atque, provident? Atque, provident?",
    shares: 10,
    status: "Pending",
    traffic: "1200",
    action: "Edit",
  },
  // ... other dummy products
];

function Dashboard() {
  const { access } = useTokens();
  const [productsData, setProductsData] = useState([]);
  const [products] = useProductsMutation();
  const [product] = useProductMutation();

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
  }, [products, access]);

  // Calculate total shares
  const totalShares =
    productsData.length > 0
      ? productsData.reduce((sum, product) => sum + (product.shares || 0), 0)
      : 0;

  // Calculate total product count
  const productVisits =
    productsData.length > 0
      ? productsData.reduce((sum, product) => sum + (product.traffic || 0), 0)
      : 0;

  const slicedTopData = productsData.slice(0, 5);
  const totalIncDecVisits = 0;
  const totalIncDecShares = 0;
  return (
    <div className="bg-gray-50">
      <BusinessDashboardHeader />
      <div className="px-6 py-10 flex flex-col lg:flex-row gap-6 flex-wrap bg-white">
        <InsightsCard
          CardName="Total Shares"
          TotalCount={totalShares}
          TotalIncDec={totalIncDecShares} // This can be replaced with actual calculation logic
        />
        <InsightsCard
          CardName="Total Visits"
          TotalCount={productVisits}
          TotalIncDec={totalIncDecVisits} // This can be replaced with actual calculation logic
        />
        <GrowBusinessCard />
      </div>
      <div className="px-6 py-6 flex flex-col lg:flex-row gap-6">
        <TrafficReportGraph data={transformProductsToChartData(productsData)} />
        <TopProducts products={slicedTopData} />
      </div>

      <div className="my-8 mx-8 rounded-2xl flex flex-col gap-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] ">
        <div className="flex  justify-between px-8 py-8 items-center">
          <h2 className="text-xl font-semibold">Products</h2>
          <select
            className="bg-[#f9f9fc] p-2 text-xl outline-none cursor-pointer"
            defaultValue="All"
          >
            <option value="All">All</option>
            <option value="Active">January</option>
            <option value="Declined">February</option>
          </select>
        </div>
        <div className="px-4 py-8">
          <TableData
            type="dashboard"
            data={productsData ? slicedTopData : productsDumyData}
            tableHeadNames={[
              "Product Name",
              "Description",
              "No of Shares",
              "Traffic",
              "Status",
              "Action",
            ]}
            handleShowProductDetails={handleShowProductDetails}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
