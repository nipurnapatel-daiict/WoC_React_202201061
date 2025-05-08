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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
    setShowDeleteConfirm(true); // Show confirmation modal when delete is clicked
    setShowContextMenu(false);  // Close the context menu
  };

  const handleConfirmDelete = () => {
    removeFile(file.id);
    setShowDeleteConfirm(false);
    setToastMessage(`${file.name} deleted!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      window.location.reload();
    }, 2000);
   // window.location.reload();
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
      className="file-item grid grid-cols-1 md:grid-cols-2 justify-between cursor-pointer bg-gray-100 hover:bg-gray-200 p-3 rounded-md"
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
          onDelete={handleDelete} // Show delete confirmation modal
          onCopy={() => console.log('Copying file...')} // Example copy functionality
        />
      )}

      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}

      {/* Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>
            <p className="text-gray-600 mt-2">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)} // Close modal without deleting
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete} // Confirm and delete
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileItem;



