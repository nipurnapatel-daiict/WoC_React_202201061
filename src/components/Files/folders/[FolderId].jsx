import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ParentFolderIdContext } from "../../../context/ParentFolderIdContext";
import { collection, query, where, onSnapshot, getFirestore } from "firebase/firestore";
import app from "../../../App";
import { useUser } from "../../../context/UserContext";
import FolderList from "../Folder/FolderList";
import FileList from "../File/FileList";

const FolderDetails = () => {
  const location = useLocation();
  const { id, name } = location.state || {}; // Folder ID and name from location state

  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext);
  const [folders, setFolders] = useState([]);
  const [fileList, setFileList] = useState([]);
  const db = getFirestore(app);
  const { user } = useUser();

  // Set parentFolderId and fetch subfolders
  useEffect(() => {
    if (!id || !user) return;

    setParentFolderId(id); // Update parentFolderId in context

    const q = query(
      collection(db, "Folder"),
      where("email", "==", user.email),
      where("parentFolderId", "==", id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const folderArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setFolders(folderArray);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [id, user, db, setParentFolderId]);

    // Fetch files for the current folder
    useEffect(() => {
        if (!id || !user) return;
      
        const q = query(
          collection(db, "Files"),
          where("createdBy", "==", user.email),
          where("parentFolderId", "==", id)
        );
      
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fileArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          console.log('Fetched files in details:', fileArray); // Log the files to confirm they are fetched
          setFileList(fileArray); // Update the fileList state
        });
      
        return () => unsubscribe(); // Cleanup listener
      }, [id, user, db]);
      

  return (
    <div className="p-1">
      <h2 className="text-[20px] font-bold mt-2">{name}</h2>

      <div className="bg-blue-50 p-5 rounded-md shadow-md mt-2">
        {/* <div className="text-lg font-semibold">Subfolders</div> */}
        <FolderList folders={folders} />
      </div>

      <div className="bg-white p-5 rounded-md shadow-md mt-2">
        {/* <div className="text-lg font-semibold">Files</div> */}
        <FileList fileList={fileList} />
      </div>
    </div>
  );
};

export default FolderDetails;








// import React from "react";
// import { useLocation } from "react-router-dom";

// const FolderDetails = () => {
//     const location = useLocation();
//     const { id, name } = location.state || {}; // Get only ID and name

//     return (
//         <div>
//             <h2>Folder Details</h2>
//             <p><strong>Folder ID:</strong> {id || "Not Found"}</p>
//             <p><strong>Folder Name:</strong> {name || "Unknown"}</p>
//         </div>
//     );
// };

// export default FolderDetails;

