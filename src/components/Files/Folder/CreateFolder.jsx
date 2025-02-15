import React, { useState, useContext } from "react";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "../../../App";
import { showToastContext } from "../../../context/ShowToastContext";
import { useUser } from "../../../context/UserContext";
import { ParentFolderIdContext } from "../../../context/ParentFolderIdContext";

const CreateFolder = ({ addNewFolder }) => {
  const docId = Date.now().toString();
  const [showToastMsg, setShowToastMsg] = useContext(showToastContext);
  const [folderName, setFolderName] = useState("");
  const db = getFirestore(app);
  const { user, loading } = useUser(); // Destructure user and loading

  const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext);

  const onCreate = async () => {
    if (loading) {
      console.log("User state is still loading.");
      return;
    }

    if (!user || !user.email) {
      console.log("User is not logged in or email is not available.");
      return;
    }

    // Create folder in Firestore
    await setDoc(doc(db, "Folder", docId), {
      email: user.email,
      name: folderName,
      id: docId,
      parentFolderId : parentFolderId,
    });

    // Create new folder object to add to the local state
    const newFolder = {
      email: user.email,
      name: folderName,
      id: docId,
      parentFolderId : parentFolderId,
    };

    // Call addNewFolder function passed from Dashboard to update the list
    addNewFolder(newFolder);

    // Show a toast message
    console.log("Folder created");
    setShowToastMsg("Folder Created!");

    // Close the modal
    document.getElementById('my_modal_3').close();  // Close the modal
  };

  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div className="w-full items-center flex flex-col justify-center gap-3">
          <input
            type="text"
            placeholder="Folder Name"
            className="p-2 border-[1px] outline-none rounded-md"
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2 px-3 w-full"
            onClick={() => onCreate()}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFolder;
