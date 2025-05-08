import React, { useState } from "react";
import { CirclePlus } from 'lucide-react';
import { Navlist } from "../../constants";
import { Folder } from 'lucide-react';
import { File } from 'lucide-react';
import CreateFolder from "./Folder/CreateFolder";
import CreateFile from "./File/CreateFile";

const SideNavbar = ({ addNewFolder, addNewFile }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // const [fileList, setFileList] = useState([]);

  return (
    <div className="w-full bg-white h-[8%] rounded-md sticky top-0 z-10 shadow-blue-200 shadow-md p-2">
      {/* <div className="flex justify-center mb-1">
        <span>Welcome!</span>
      </div> */}

      {/* Icons and Menu in One Row with Hover Text */}
      <div className="flex gap-4 justify-center items-center mt-1">
        {/* New File Icon */}
        <div className="relative group">
          <button
            className="flex flex-col items-center justify-center p-1 hover:scale-105 transition-all"
            onClick={() => document.getElementById("my_file_model").showModal()}
          >
            <File className="text-2xl" />
          </button>
          <span className="absolute bottom-10 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            New File
          </span>
        </div>

        {/* New Folder Icon */}
        <div className="relative group">
          <button
            className="flex flex-col items-center justify-center p-1 hover:scale-105 transition-all"
            onClick={() => document.getElementById('my_modal_3').showModal()}
          >
            <Folder className="text-2xl" />
          </button>
          <span className="absolute bottom-10 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            New Folder
          </span>
        </div>

        {/* Menu Items (Navlist) */}
        {Navlist.map((item, index) => (
          <div key={index}>
            <h2
              onClick={() => setActiveIndex(index)}
              className={`flex items-center justify-center p-1 rounded-lg cursor-pointer text-gray-500
                ${activeIndex === index ? 'bg-purple-500 text-white' : 'hover:bg-purple-400 hover:text-white'}`}
            >
              {item.logo} {/* Display only the icon/logo */}
            </h2>
          </div>
        ))}
      </div>

      {/* Modals */}
      <dialog id="my_modal_3" className="modal p-3 border rounded-xl">
        <CreateFolder addNewFolder={addNewFolder} />
      </dialog>

      <dialog id="my_file_model" className="modal p-3 border rounded-xl">
        <CreateFile addNewFile={addNewFile} />
      </dialog>
    </div>
  );
};

export default SideNavbar;


