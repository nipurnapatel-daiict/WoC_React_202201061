import React from 'react';

const ContextMenu = ({ position, file, onRename, onDelete, onCopy }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'white',
        border: '1px solid #ccc',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        zIndex: 1000,
      }}
      className="context-menu"
    >
      <ul className="context-menu-list bg-white shadow-lg rounded-lg border border-gray-200 w-40 mt-2 absolute z-10">
  <li 
    onClick={() => onRename(file)} 
    className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer rounded-tl-lg rounded-tr-lg"
  >
    Rename
  </li>
  <li 
    onClick={() => onDelete(file)} 
    className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-800 cursor-pointer"
  >
    Delete
  </li>
  <li 
    onClick={() => onCopy(file)} 
    className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer rounded-bl-lg rounded-br-lg"
  >
    Copy
  </li>
</ul>

    </div>
  );
};

export default ContextMenu;

  