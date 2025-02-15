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
      <ul className="context-menu-list">
        <li onClick={() => onRename(file)}>Rename</li>
        <li onClick={() => onDelete(file)}>Delete</li>
        <li onClick={() => onCopy(file)}>Copy</li>
      </ul>
    </div>
  );
};

export default ContextMenu;

  