import React, { useState } from "react";

const FileNameModal = ({ isOpen, onClose, onSubmit, defaultFileName }) => {
    const [fileName, setFileName] = useState(defaultFileName);

    const handleSubmit = () => {
        if (fileName.trim() === "") {
            alert("Please enter a valid file name.");
        } else {
            onSubmit(fileName);
            onClose();
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <h3 className="text-xl mb-4 text-center">Enter File Name</h3>
                    <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        placeholder="Enter file name"
                    />
                    <div className="flex justify-between">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default FileNameModal;
