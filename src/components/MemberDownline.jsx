import React, { useEffect, useState } from "react";
import Filter from "./../components/ui/Filter";
import UserDataTale from "./../components/UserDataTable";
import {
  useGetUsersMutation,
  useGetAllDownlineQuery,
} from "../features/user/userApiSlice";

function MemberDownline() {
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [members] = useGetUsersMutation();
  const { data: allDownlineData = [] } = useGetAllDownlineQuery();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await members().unwrap();
        setFetchedMembers(response);
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
  return (
    <div className="px-6 py-10 flex flex-col gap-8">
      <section className="flex flex-col gap-6">
        <Filter
          data={allDownlineData}
          setDataFunction={setFetchedMembers}
          showDownload={true}
        />
        <div className="flex flex-col gap-10">
          <UserDataTale
            type="downlineUser"
            data={fetchedMembers}
            tableHeadNames={["Member", "Email", "Placement", "Rank"]}
          />
        </div>
      </section>
    </div>
  );
}

export default MemberDownline;
