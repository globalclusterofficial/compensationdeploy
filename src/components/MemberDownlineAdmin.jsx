import React, { useEffect, useState } from "react";
import Filter from "./../components/ui/Filter";
import UserDataTable from "./../components/UserDataTable";
import { useGetUsersMutation } from "../features/user/userApiSlice";
import PropTypes from "prop-types";

function MemberDownlineAdmin({ userNetwork }) {
  const [members, setMembers] = useState(userNetwork);

  return (
    <div className="px-6 py-10 flex flex-col gap-8">
      {userNetwork !== null ? (
        <section className="flex flex-col gap-6">
          <Filter
            data={members}
            setDataFunction={setMembers}
            showDownload={true}
          />
          <div className="flex flex-col gap-10">
            <UserDataTable
              type="downlineUser"
              data={members}
              tableHeadNames={["Member", "Email", "Placement", "Rank"]}
            />
          </div>
        </section>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

MemberDownlineAdmin.propTypes = {
  userNetwork: PropTypes.array,
};

export default MemberDownlineAdmin;
