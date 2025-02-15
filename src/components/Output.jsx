import React, { useState, useEffect } from "react";
import { Copy } from 'lucide-react';

const Output = ({ isOutputVisible, output, isLoading,border, color, showOutput}) => {
    const [opacity, setOpacity] = useState(1);  
    useEffect(() => {
        if (isOutputVisible || showOutput) {
            setOpacity(1);  
        } else {
            setOpacity(0);  
        }
    }, [isOutputVisible, showOutput]);

    const copyToClipboard = () => {
        if (output && output.length > 0) {
            const content = output.join("\n");

            navigator.clipboard.writeText(content)
                .then(() => {
                    alert("Content copied to clipboard!");
                })
                .catch(err => {
                    console.error("Error copying text to clipboard:", err);
                });
        }
    };

    return (
        <div
            className={`overflow-y-auto rounded transition-all duration-500 ease-in-out ${border}`}  
            style={{
                backgroundColor: '#2d3748',  
                opacity: opacity,  
                transition: "opacity 0.5s ease-in-out",  
                zIndex: 10, 
                overflowY: 'hidden',  
                msOverflowX: "hidden",
                position: 'relative',  
                height: '100%',  
            }}
        >
            <div className="p-2">
                <div className="flex flex-row justify-between">
                <h3 className="text-xl mb-2 text-white">Output</h3>

                    <div className="flex justify-between mb-2">
                        <div className="text-white">
                            {/* copy button */}
                            <button
                                onClick={copyToClipboard}
                                className="bg-gray-600 hover:bg-gray-800 text-white px-3 py-1 rounded-md transition"
                            >
                                <Copy />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`p-1 text-white ${color} ${output && output.length > 0 ? 'bg-gray-900' : 'bg-gray-700'}`}
                    style={{color:color}}
                    >
                    {isLoading ? "Running..." : (
                        output && output.length > 0 ? (
                            output.map((line, i) => <p key={i}>{line}</p>)
                        ) : (
                            `Click "Run Code" to see the output here`
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Output;
