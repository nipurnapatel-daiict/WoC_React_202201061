import React, { useEffect, useState } from "react";
import FolderItems from "./FolderItems";
import { useParams } from "react-router-dom";

const FolderList = ({ folders, onFolderClick }) => {

  return (
    <div className="p-2 mt-2 bg-white rounded-lg">
      {/* <h2 className="text-[17px] font-bold items-center">
        Recent Folders
        <span className="float-right text-blue-400 font-normal text-[13px]">View All</span>
      </h2> */}
  
      {/* Display folders in a vertical layout */}
      <div className="flex flex-col mt-2 gap-1">
        {folders.map((item) => (
          <FolderItems
            key={item.id}
            name={item.name}
            onClick={() => onFolderClick(item)} // Trigger parent click handler
          />
        ))}
      </div>
    </div>
  );
  
};

export default FolderList;


// return (
//   <div className="p-5 mt-5 bg-white rounded-lg">
//     <h2 className="text-[17px] font-bold items-center">
//       Recent Folders
//       <span className="float-right text-blue-400 font-normal text-[13px]">View All</span>
//     </h2>

//     <div className="grid grid-cols-2 mt-3 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//       {folders.map((item) => {
//         return (
//           <FolderItems
//             key={item.id}
//             name={item.name}
//             onClick={() => onFolderClick(item)} // Trigger parent click handler
//           />
//         );
//       })}
//     </div>
//   </div>
// );











// import React, { useState } from "react";
// import FolderItems from "./FolderItems";

// const FolderList = ({ folders, onFolderClick }) => {
//   const [activeFolder, setActiveFolder] = useState(null);

//   const handleFolderClick = (folderId) => {
//     console.log("user click on folder: ", folderId);
//     setActiveFolder(folderId); // Set active folder in state
//     onFolderClick(folderId); // Call parent function if needed for other actions
//   };

//   return (
//     <div className="p-5 mt-5 bg-white rounded-lg">
//       <h2 className="text-[17px] font-bold items-center">
//         Recent Folders
//         <span className="float-right text-blue-400 font-normal text-[13px]">View All</span>
//       </h2>

//       <div className="grid grid-cols-2 mt-3 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//         {folders.map((item) => {
//           //console.log(item.id); // Log the item.id to the console
//           return (
//             <FolderItems
//               key={item.id}
//               name={item.name}
//               activeFolder={activeFolder === item.id} // Highlight active folder
//               onClick={() => handleFolderClick(item.id)} // Set active folder on click
//             />
//           );
//         })}
//       </div>

//       {/* Display details of the selected folder */}
//       {activeFolder && (
//         <div className="folder-details mt-5 p-5 bg-gray-100 rounded-lg">
//           <h3 className="text-lg font-bold">Folder Details</h3>
//           <p>Details of Folder with ID: {activeFolder}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FolderList;






