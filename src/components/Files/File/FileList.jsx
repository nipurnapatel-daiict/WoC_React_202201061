import React, { useState, useEffect } from 'react';
import FileItem from './FileItems'; // Assuming FileItem is another component
import { deleteDoc, doc, getFirestore, onSnapshot, collection } from 'firebase/firestore';
import app from "../../../App";
// import {Toast} from "../../Notify";

const FileList = ({ fileList, onFileDoubleClick}) => {
  const [files, setFiles] = useState(fileList);


  const db = getFirestore(app);

  const removeFile = async (fileId) => {
    try {
      await deleteDoc(doc(db, 'Files', fileId)); 

     //setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file.');
    }
  };

  const updateFileName = (updatedFile) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === updatedFile.id ? { ...file, name: updatedFile.name } : file
      )
    );
  };

  return (
    <div className="bg-white mt-2 p-2 rounded-lg">
      {fileList && fileList.length > 0 ? (
        fileList.map((item) => (
          <div key={item.id}>
            <FileItem
              file={item}
              onDoubleClick={() => onFileDoubleClick(item)}
              removeFile = {removeFile}
              updateFileName={updateFileName}
              //removeFile={() => handleDelete(item.id)} 
            />
          </div>
        ))
      ) : (
        <div>No files available.</div>
      )}

    </div>
  );
};

export default FileList;













// import React from 'react';
// import FileItem from './FileItems';

// const FileList = ({ fileList }) => {
//   console.log('File list:', fileList); // Check what's being passed in

//   return (
//     <div className="bg-white mt-2 p-2 rounded-lg">
//       {fileList && fileList.length > 0 ? (
//         fileList.map((item) => (
//           <div key={item.id}>
//             <FileItem file={item} />
//           </div>
//         ))
//       ) : (
//         <div>No files available.</div> // Display a message when there are no files
//       )}
//     </div>
//   );
// };

// export default FileList;



