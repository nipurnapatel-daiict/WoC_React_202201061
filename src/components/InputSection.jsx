import React, { useState, useEffect } from "react";

const InputSection = ({ input, isOutputVisible, border, color, onInputChange, showOutput }) => {
    const [opacity, setOpacity] = useState(1);  // Keep opacity visible

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result;
                onInputChange(fileContent); 
            };
            reader.readAsText(file); 
        }
    };

    useEffect(() => {
        if (isOutputVisible || showOutput) {
            setOpacity(1);  // Fade in when output is visible
        } else {
            setOpacity(0);  // Fade out when output is not visible
        }
    }, [isOutputVisible, showOutput]);

    return (
        <div
            className={`rounded ${border} overflow-hidden transition-all duration-500 ease-in-out`}
            style={{
                backgroundColor: '#2d3748',  // Gray background
                opacity: opacity, // Smooth opacity transition
                transition: "opacity 0.5s ease-in-out", // Fade effect
                zIndex: 10, // Ensure input section stays above other content when visible
                overflowY: 'hidden', // Handle overflow of content
                height: '100%',  // Use 100% height so it takes full available space in its container
            }}
        >
            <div className="p-4">
                <div className="flex flex-row justify-between">
                    <h3 className="text-xl mb-2 text-white">Input Data</h3>

                    <div className="mb-2">
                        <input
                            type="file"
                            accept=".txt, .json" // You can specify the file types you want to allow
                            onChange={handleFileUpload}
                            className="bg-gray-600 hover:bg-gray-800 text-white px-1 py-1 rounded-md cursor-pointer"
                        />
                        {/* <span className="ml-2 text-white">Upload a file (txt/json)</span> */}
                    </div>

                </div>

                <textarea
                    className="p-2 bg-neutral-700 text-white rounded-md w-full placeholder-gray-400"  // Tailwind utility classes
                    placeholder="Enter input data for your code here"
                    value={input}  // Ensure `input` is being passed correctly
                    onChange={(e) => onInputChange(e.target.value)}  // Ensure the onChange handler updates state
                    rows={6}  // 6 visible lines for the textarea
                />

                {/* File input section */}

            </div>
        </div>
    );
};

export default InputSection;
