import TreeNodeAdmin from "./TreeNodeAdmin";
import PropTypes from "prop-types";

const GenealogyTreeAdmin = ({ treeData }) => {
  if (treeData?.user) {
    return (
      <div className="p-10">
        <TreeNodeAdmin root={treeData?.user} members={treeData?.user_network} />
      </div>
    );
  } else return <p>Loading...</p>;
};

GenealogyTreeAdmin.propTypes = {
  treeData: PropTypes.object,
};

export default GenealogyTreeAdmin;
