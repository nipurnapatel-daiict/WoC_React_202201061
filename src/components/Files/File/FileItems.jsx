import React, { useState, useEffect } from "react";
import { File } from 'lucide-react';
import ContextMenu from "../../ContextMenu";
import Toast from "../../Notify";
import { updateDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../../../App";

function FileItem({ file, onDoubleClick, removeFile, updateFileName }) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const db = getFirestore(app);

  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setShowContextMenu(true);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.file-item')) {
      setShowContextMenu(false);
    }
  };

  const handleDelete = () => {
    removeFile(file.id);
    setShowContextMenu(false);
    setToastMessage(`${file.name} deleted!`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleRename = async () => {
    try {
      const fileRef = doc(db, "Files", file.id);
      await updateDoc(fileRef, {
        name: newName,
      });
      setIsEditing(false); // Close the input after renaming
      setToastMessage(`${file.name} renamed to ${newName}`);
      setShowToast(true);

      // Update the file list in the parent component
      updateFileName({ ...file, name: newName });

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error("Error renaming file:", error);
      alert("Failed to rename file.");
    }
  };

  const handleRenameFromContextMenu = () => {
    setIsEditing(true); // Show the input field
    setShowContextMenu(false); // Close the context menu
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRename(); // Save changes when Enter is pressed
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="file-item grid grid-cols-1 md:grid-cols-2 justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-md"
      onDoubleClick={onDoubleClick}
    >
      <div className="flex gap-2 items-center" onContextMenu={handleRightClick}>
        <File />
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyPress} // Listen for Enter key press
            onBlur={handleRename} // Save when user clicks away (blur)
            autoFocus
            className="text-[15px] truncate"
          />
        ) : (
          <h2 className="text-[15px] truncate">
            {file.name}
          </h2>
        )}
      </div>

      {showContextMenu && (
        <ContextMenu
          position={contextMenuPosition}
          file={file}
          onRename={handleRenameFromContextMenu} // Handle rename in context menu
          onDelete={handleDelete}
          onCopy={() => console.log('Copying file...')} // Example copy functionality
        />
      )}

      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
}

export default FileItem;




// import React, { useState, useEffect } from "react";
// import { File } from 'lucide-react';
// import ContextMenu from "../../ContextMenu";
// import Toast from "../../Notify";

// function FileItem({ file, onDoubleClick, removeFile }) {
//   const [showContextMenu, setShowContextMenu] = useState(false);
//   const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");

//   const [isEditing, setIsEditing] = useState(false);
//   const [newName, setNewName] = useState(file.name);

//   const handleRightClick = (event) => {
//     event.preventDefault();
//     setContextMenuPosition({ x: event.clientX, y: event.clientY });
//     setShowContextMenu(true);
//   };

//   const handleClickOutside = (event) => {
//     if (!event.target.closest('.file-item')) {
//       setShowContextMenu(false);
//     }
//   };

//   const handleDelete = () => {
//     removeFile(file.id); 
//     setShowContextMenu(false); 
//     setToastMessage(`${file.name} deleted!`);
//     setShowToast(true);

//     setTimeout(() => {
//       setShowToast(false);
//     }, 2000);
//   };

//   const handleRename = async () => {
//     try {
//       const fileRef = doc(db, "Files", file.id);
//       await updateDoc(fileRef, {
//         name: newName,
//       });
//       setIsEditing(false);
//       setToastMessage(`${file.name} renamed to ${newName}`);
//       setShowToast(true);
//     } catch (error) {
//       console.error("Error renaming file:", error);
//       alert("Failed to rename file.");
//     }
//   };
  
//   useEffect(() => {
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       className="file-item grid grid-cols-1 md:grid-cols-2 justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-md"
//       onDoubleClick={onDoubleClick}
//     >
//       <div className="flex gap-2 items-center" onContextMenu={handleRightClick}>
//         <File />
//         <h2 className="text-[15px] truncate">{file.name}</h2>
//       </div>

//       {showContextMenu && (
//         <ContextMenu
//           position={contextMenuPosition}
//           file={file}
//           onDelete={handleDelete}
//         />
//       )}

// {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />} 
//     </div>
//   );
// }

// export default FileItem;
