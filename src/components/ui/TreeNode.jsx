import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import UserProfile from "./../../assets/images/userProfile.png";
import useProfilePicture from "../../hooks/useProfilePic";
import { useUser } from "../../hooks/auth/useUser";

class BinaryTreeNode {
  constructor(value, depth, left, right) {
    this.value = value;
    this.left = left ?? null;
    this.right = right ?? null;
    this.depth = depth;
  }
}

function createBinaryTree(members) {
  if (members.length === 0) {
    return null;
  }

  const root = new BinaryTreeNode(members[0], 0);
  const queue = [root];

  let i = 1;
  while (i < members.length) {
    const depth =
      i === 0
        ? 0
        : [1, 2].includes(i)
          ? 1
          : [3, 4, 5, 6].includes(i)
            ? 2
            : [7, 8, 9, 10, 11, 12, 13, 14].includes(i)
              ? 3
              : 4;
    const current = queue.shift();

    if (i < members.length) {
      current.left = new BinaryTreeNode(members[i], depth);
      queue.push(current.left);
      i++;
    }

    if (i < members.length) {
      current.right = new BinaryTreeNode(members[i], depth);
      queue.push(current.right);
      i++;
    }
    if (i === 14) i += members.length;
  }

  return root;
}

function TreeNode({ members }) {
  const leftMembers = members
    .filter((member) => member.position === "left")
    .slice(0, 3);
  const rightMembers = members
    .filter((member) => member.position === "right")
    .slice(0, 3);
  const profilePicture = useProfilePicture();
  const { user } = useUser();
  const [leftTree, setLeftTree] = useState(null);
  const [rightTree, setRightTree] = useState(null);
  const rootNode = new BinaryTreeNode(
    { name: user.profile.name, profilePicture },
    0,
    leftTree,
    rightTree,
  );

  const renderBinaryTree = (node) => {
    if (!node) {
      return null;
    }

    const lengthStyle =
      node.depth === 0
        ? "w-[24rem]"
        : node.depth === 1
          ? "w-[20rem]"
          : node.depth === 2
            ? "w-[16rem]"
            : node.depth === 3
              ? "w-[12rem]"
              : node.depth === 4
                ? "w-[6rem]"
                : "";
    const doubleLengthStyle =
      node.depth === 0
        ? "w-[48rem]"
        : node.depth === 1
          ? "w-[40rem]"
          : node.depth === 2
            ? "w-[32rem]"
            : node.depth === 3
              ? "w-[24rem]"
              : node.depth === 4
                ? "w-[12rem]"
                : "";
    const marginStyle1 =
      node.depth === 0
        ? "-ml-[24rem]"
        : node.depth === 1
          ? "-ml-[20rem]"
          : node.depth === 2
            ? "-ml-[16rem]"
            : node.depth === 3
              ? "-ml-[12rem]"
              : node.depth === 4
                ? "-ml-[6rem]"
                : "";
    const marginStyle2 =
      node.depth === 0
        ? "-mr-[24rem]"
        : node.depth === 1
          ? "-mr-[20rem]"
          : node.depth === 2
            ? "-mr-[16rem]"
            : node.depth === 3
              ? "-mr-[12rem]"
              : node.depth === 4
                ? "-mr-[6rem]"
                : "";
    const positionStyle1 =
      node.depth === 0
        ? "right-[28rem]"
        : node.depth === 1
          ? "right-[24rem]"
          : node.depth === 2
            ? "right-[20rem]"
            : node.depth === 3
              ? "right-[16rem]"
              : node.depth === 4
                ? "right-[10rem]"
                : "";
    const positionStyle2 =
      node.depth === 0
        ? "left-[28rem]"
        : node.depth === 1
          ? "left-[24rem]"
          : node.depth === 2
            ? "left-[20rem]"
            : node.depth === 3
              ? "left-[16rem]"
              : node.depth === 4
                ? "left-[10rem]"
                : "";

    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <img
            src={node.value.profile_picture ?? UserProfile}
            alt="profile"
            className="w-20 h-20 rounded-full mb-2"
          />
          <p className="bg-[#1b2a3833] text-lg h-10 flex justify-center items-center px-2">
            {node.value.name}
          </p>
        </div>
        <div className="flex flex-col items-center mt-1">
          {node.left !== null || node.right !== null ? (
            <div className="bg-[#CCCCCC] h-8 w-[1.5px]"></div>
          ) : null}
          <div className="flex">
            {node.left !== null && (
              <div
                className={`border-t-2 border-l-2 border-t-[#CCCCCC] border-l-[#CCCCCC] rounded-tl-xl h-8 ${lengthStyle} ${node.right === null && marginStyle1}`}
              ></div>
            )}
            {node.right !== null && (
              <div
                className={`border-t-2 border-r-2 border-t-[#CCCCCC] border-r-[#CCCCCC] rounded-tr-xl h-8 ${lengthStyle} ${node.left === null && marginStyle2}`}
              ></div>
            )}
          </div>
          <div
            className={`flex justify-start relative bg-pink-300 ${doubleLengthStyle}`}
          >
            <div className={`absolute ${positionStyle1}`}>
              {node.left !== null && renderBinaryTree(node.left)}
            </div>
            <div className={`absolute ${positionStyle2}`}>
              {node.right !== null && renderBinaryTree(node.right)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const leftTree = createBinaryTree(leftMembers);
    const rightTree = createBinaryTree(rightMembers);
    setLeftTree(leftTree);
    setRightTree(rightTree);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <img
            src={rootNode.value.profilePicture}
            alt="profile"
            className="w-20 h-20 rounded-full mb-2"
          />
          <p className="bg-[#1b2a3833] text-lg h-10 flex justify-center items-center px-2">
            {rootNode.value.name}
          </p>
        </div>
        <div className="flex flex-col items-center mt-1">
          {rootNode.left !== null || rootNode.right !== null ? (
            <div className="bg-[#CCCCCC] h-8 w-[1.5px]"></div>
          ) : null}
          <div className="flex">
            {rootNode.left !== null && (
              <div
                className={`border-t-2 border-l-2 border-t-[#CCCCCC] border-l-[#CCCCCC] rounded-tl-xl h-8 w-[28rem] ${rootNode.right === null && "-ml-[24rem]"}`}
              ></div>
            )}
            {rootNode.right !== null && (
              <div
                className={`border-t-2 border-r-2 border-t-[#CCCCCC] border-r-[#CCCCCC] rounded-tr-xl h-8 w-[28rem] ${rootNode.left === null && "-mr-[24rem]"}`}
              ></div>
            )}
          </div>
          <div className={`flex justify-start relative bg-pink-300 w-[48rem]`}>
            <div className={`absolute right-[28rem]`}>
              {rootNode.left !== null && renderBinaryTree(rootNode.left)}
            </div>
            <div className={`absolute left-[28rem]`}>
              {rootNode.right !== null && renderBinaryTree(rootNode.right)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TreeNode.propTypes = {
  members: PropTypes.array.isRequired,
};

export default TreeNode;
