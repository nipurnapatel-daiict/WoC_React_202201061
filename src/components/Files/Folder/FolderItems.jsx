import React from "react";
import { Folder } from "lucide-react";

const FolderItems = ({ name, onClick }) => {
  return (
    <div
      className="flex items-center w-full p-2 cursor-pointer hover:bg-gray-100 rounded-md mb-2 border-l-4 border-transparent hover:border-blue-500"
      onClick={onClick} // Trigger onClick event when a folder is clicked
    >
      {/* Folder Icon */}
      <Folder className="text-3xl mr-3 text-gray-700" /> {/* Optional: adjust size of icon */}
      
      {/* Folder Name */}
      <h2 className="text-sm text-gray-700">{name}</h2>
    </div>
  );
  
  
};

export default FolderItems;

// return (
//   <div
//     className="w-full flex flex-col border-[1px] rounded-lg p-5 justify-center items-center h-[130px] hover:scale-105 hover:shadow-md cursor-pointer"
//     onClick={onClick} // Trigger onClick event when a folder is clicked
//   >
//     <Folder />
//     <h2 className="line-clamp-2 text-[12px] text-center">{name}</h2>
//   </div>
// );

