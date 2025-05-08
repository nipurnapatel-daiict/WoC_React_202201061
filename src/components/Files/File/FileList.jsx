import React, { useState, useEffect } from 'react';
import FileItem from './FileItems'; // Assuming FileItem is another component
import { deleteDoc, doc, getFirestore, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import app from "../../../App";
import { useUser } from "../../../context/UserContext";

const FileList = ({ fileList, onFileDoubleClick }) => {
  const { user } = useUser();

  const defaultFile = {
    id: 'default-js',  // A unique ID for the default file
    name: 'default.js',
    type: 'js',
    size: 0,
    modifiedAt: Date.now(),
    createdBy: user.email,
    parentFolderId: 0,
    url: null,
    content: "// Default JS content\nconsole.log('Welcome to CodeBoard!');"
  };

  const [files, setFiles] = useState(fileList);

  const db = getFirestore(app);

  useEffect(() => {
    // If no files are passed, append the default file to the list
    if (fileList && fileList.length === 0) {
      setFiles([defaultFile]);
    } else {
      setFiles(fileList);  // Use the passed fileList
    }

    // If there are no files for this user in the database, add the default file
    const checkAndAddDefaultFile = async () => {
      const filesRef = collection(db, 'Files');
      const q = query(filesRef, where('createdBy', '==', user.email));
      const querySnapshot = await getDocs(q);

      // If no files exist for this user, insert the default file
      if (querySnapshot.empty) {
        try {
          // Add default file to Firestore
          await setDoc(doc(db, 'Files', defaultFile.id), defaultFile);
          setFiles((prevFiles) => [defaultFile, ...prevFiles]);  // Ensure default file is first in list
        } catch (error) {
          console.error('Error adding default file:', error);
          alert('Failed to add default file.');
        }
      }
    };

    checkAndAddDefaultFile();
  }, [fileList, db, user.email]);

  const removeFile = async (fileId) => {
    // Prevent removal of the default file
    if (fileId === defaultFile.id) {
      alert('The default file cannot be deleted.');
      return; // Don't proceed with deletion
    }

    try {
      await deleteDoc(doc(db, 'Files', fileId));
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
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

  // Sort files lexicographically (excluding the default file)
  const sortedFiles = files
    .filter((file) => file.id !== defaultFile.id) // Remove the default file from sorting
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort remaining files by name

  // Combine default file with sorted files
  const finalFiles = [defaultFile, ...sortedFiles];

  return (
    <div className="bg-white mt-1 p-2 rounded-lg">
      {finalFiles && finalFiles.length > 0 ? (
        finalFiles.map((item) => (
          <div key={item.id}>
            <FileItem
              file={item}
              onDoubleClick={() => onFileDoubleClick(item)}
              removeFile={removeFile}
              updateFileName={updateFileName}
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



