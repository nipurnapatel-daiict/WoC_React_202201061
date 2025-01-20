import React, { useState, useEffect } from "react";
import { Copy } from 'lucide-react';

const Output = ({ isOutputVisible, output, isLoading, border, color, showOutput}) => {
    const [opacity, setOpacity] = useState(1);  // Initially visible with opacity 1

    useEffect(() => {
        // Fade effect based on isOutputVisible
        if (isOutputVisible || showOutput) {
            setOpacity(1);  // Fade in
        } else {
            setOpacity(0);  // Fade out
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
            className={`overflow-y-auto rounded transition-all duration-500 ease-in-out ${border}`}  // Apply border dynamically
            style={{
                backgroundColor: '#2d3748',  // Gray background
                opacity: opacity,  // Smooth opacity change
                transition: "opacity 0.5s ease-in-out",  // Fade effect
                zIndex: 10,  // Always above other elements
                overflowY: 'hidden',  // Handle overflow
                msOverflowX: "hidden",
                position: 'relative',  // Not fixed, based on the parent container's space
                height: '100%',  // Use 100% height so it takes full available space in its container
            }}
        >
            <div className="p-2">
                <div className="flex flex-row justify-between">
                <h3 className="text-xl mb-2 text-white">Output</h3>

                    <div className="flex justify-between mb-2">
                        <div className="text-white">
                            {/* Display the copy button */}
                            <button
                                onClick={copyToClipboard}
                                className="bg-gray-600 hover:bg-gray-800 text-white px-3 py-1 rounded-md transition"
                            >
                                <Copy />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`p-1 text-white ${color} ${output && output.length > 0 ? 'bg-gray-900' : 'bg-gray-700'}`}>
                    {/* If it's loading, show loading text */}
                    {isLoading ? "Running..." : (
                        output && output.length > 0 ? (
                            // Display each line of the output
                            output.map((line, i) => <p key={i}>{line}</p>)
                        ) : (
                            // Display message when no output is available
                            `Click "Run Code" to see the output here`
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Output;
