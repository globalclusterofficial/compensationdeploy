import React, { useState, useEffect } from "react";
import MemberDownlineAdmin from "../../components/MemberDownlineAdmin";
import Header from "../../components/ui/Header";
import GenealogyTreeAdmin from "./../../components/ui/GenealogyTreeAdmin";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useGetUserNetworkDataMutation } from "../../features/user/userApiSlice";

function UserTree() {
  const [tabs, setTabs] = useState("genealogy");
  const params = useParams();
  const { userId } = params;
  const [treeData, setTreeData] = useState(null);
  const [network] = useGetUserNetworkDataMutation();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await network(userId).unwrap();
        setTreeData(response);
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

    fetchMembers();
  }, [network]);

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="bg-white m-10 p-10">
        <div className="flex justify-between items-center pb-2 border-b">
          <div className="flex gap-8">
            <p
              className={`${
                tabs === "genealogy" ? "bg-primary-light text-white" : ""
              } py-3 px-8 cursor-pointer`}
              onClick={() => setTabs("genealogy")}
            >
              Genealogy
            </p>
            <p
              className={`${
                tabs === "memberDownline" ? "bg-primary-light text-white" : ""
              } py-3 px-8 cursor-pointer`}
              onClick={() => setTabs("memberDownline")}
            >
              Member Downline
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center bg-gray-50 border rounded-xl gap-6">
              <IoIosSearch className="text-7xl text-primary-light p-2" />
              <input
                type="text"
                className="h-full  w-full bg-gray-50 outline-none"
                placeholder="Search..."
              />
            </div>
            <p className="px-10 py-4 text-white bg-primary-light select-none cursor-pointer">
              Search
            </p>
          </div>
        </div>
        <section className="p-10">
          {tabs === "genealogy" && (
            <div className="bg-white m-10 border">
              <div className="flex items-start justify-center bg-gray-50 m-10 overflow-scroll h-screen">
                <GenealogyTreeAdmin treeData={treeData} />
              </div>
            </div>
          )}
          {tabs === "memberDownline" && (
            <MemberDownlineAdmin userNetwork={treeData?.user_network} />
          )}
        </section>
      </main>
    </div>
  );
}

export default UserTree;
