import React, { useState } from "react";
import SplitPane from "react-split-pane";
import Output from "./Output";
import InputSection from "./InputSection";

const Merge = ({isOutputVisible, output, isLoading, inputData, onInputChange, showOutput}) => {
    const [input, setInput] = useState("");  
    
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <SplitPane 
                split="horizontal" 
                minSize={30}  
                defaultSize={50}  
                resizerStyle={{ height: '5px', backgroundColor: '#ccc' }} 
            >
                {/* Top section - Empty or any content you wish */}
                <div 
                    style={{ 
                        backgroundColor: "red", 
                        height: "100%",  
                    }}
                >
                    {/* Add content for the top section if needed */}
                </div>

                {/* Second SplitPane (Vertical split for left-right layout) */}
                <SplitPane
                    split="vertical" 
                    minSize={30}  
                    defaultSize="50%"
                    resizerStyle={{ width: '5px', backgroundColor: '#ccc' }} 
                >
                    {/* Left section - Input Section */}
                    <div style={{ backgroundColor: "green", height: "100%" }}>
                        <InputSection
                            inputData={inputData}
                            isOutputVisible={isOutputVisible}
                            border="border-r"
                            color="text-white"
                            onInputChange={onInputChange}
                            showOutput={showOutput}
                        />
                    </div>

                    {/* Right section - Output Section */}
                    <div style={{ backgroundColor: "blue", height: "100%" }}>
                        <Output
                            output={output}
                            isOutputVisible={isOutputVisible}
                            isLoading={isLoading}
                            showOutput={showOutput}
                            // inputData={inputData}
                        />
                    </div>
                </SplitPane>
            </SplitPane>
        </div>
    );
};

export default Merge;
