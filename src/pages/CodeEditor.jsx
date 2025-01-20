import React, { useState } from "react";
import CodeBoard from "../components/Editor";

const CodeEditor = () => {

    return (
        <div className="h-screen bg-[#0f0a19] px-1 text-gray-500 py-2">
            <CodeBoard />
        </div>
    );
};

export default CodeEditor;
