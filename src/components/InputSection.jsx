import React, { useState, useEffect } from "react";

const InputSection = ({ inputData, onInputChange, isOutputVisible, border, color, showOutput }) => {
    const [opacity, setOpacity] = useState(1);  

    // handle file upload
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
            setOpacity(1);  
        } else {
            setOpacity(0);  
        }
    }, [isOutputVisible, showOutput]);

    return (
        <div
            className={`rounded ${border} overflow-hidden transition-all duration-500 ease-in-out`}
            style={{
                backgroundColor: '#2d3748', 
                opacity: opacity, 
                transition: "opacity 0.5s ease-in-out", 
                zIndex: 10,
                overflowY: 'hidden', 
                height: '100%',  
            }}
        >
            <div className="p-4">
                <div className="flex flex-row justify-between">
                    <h3 className="text-xl mb-2 text-white">Input Data</h3>

                    <div className="mb-2">
                        <input
                            type="file"
                            accept=".txt, .json" 
                            onChange={handleFileUpload}
                            className="bg-gray-600 hover:bg-gray-800 text-white px-1 py-1 rounded-md cursor-pointer"
                        />
                        {/* <span className="ml-2 text-white">Upload a file (txt/json)</span> */}
                    </div>

                </div>

                <textarea
                    className="p-2 bg-neutral-700 text-white rounded-md w-full placeholder-gray-400" 
                    placeholder="Enter input data for your code here"
                    value={inputData}  
                    onChange={(e) => onInputChange(e.target.value)}  
                    rows={6}  
                />

                {/* File input section */}

            </div>
        </div>
    );
};

export default InputSection; 