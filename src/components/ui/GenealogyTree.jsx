import React, { useEffect, useState } from "react";
import TreeNode from "./TreeNode";
import { useGetUsersMutation } from "../../features/user/userApiSlice";

const GenealogyTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [members] = useGetUsersMutation();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await members().unwrap();
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
  }, [members]);

  if (!treeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <TreeNode members={treeData} />
    </div>
  );
};

export default GenealogyTree;
