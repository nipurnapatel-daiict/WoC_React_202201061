import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, language_extension, theme_extension, file_extensions } from "../constants";
import Output from "./Output";
import { executeCode } from "../api"; 
import { toast } from "react-toastify";
import InputSection from "./InputSection";
import Themes from "./Themes";
import ReBox from "./ReBox";
import Merge from "./Merge";
import { SquareChevronRight } from 'lucide-react';
import { Download } from 'lucide-react';
import FileNameModal from "./Filemodel";
import { CodeXml } from 'lucide-react';
import { Terminal } from 'lucide-react';

const CodeBoard = () => {
    const editorRef = useRef();
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [mode, setMode] = useState(language_extension[0]);
    const [output, setOutput] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [inputData, setInputData] = useState("");
    const [theme, setTheme] = useState("light");
    const [isOutputVisible, setIsOutputVisible] = useState(false);
    const [showOutput, setShowOutput] = useState(false);  // Controls I/O section visibility
    const [codeRan, setCodeRan] = useState(false);  // Determines if code has been run
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [customFileName, setCustomFileName] = useState(""); // Store the custom file name
    const [isWrappingEnabled, setIsWrappingEnabled] = useState(false);  // Controls word wrapping

    // Update initial code based on the language
    useEffect(() => {
        setValue(CODE_SNIPPETS[language]);
    }, [language]);

    useEffect(() => {
        const langMode = language_extension.find(
            (lang) => Object.keys(lang)[0] === language
        );
        if (langMode) {
            setMode(Object.values(langMode)[0]);
        }
    }, [language]);

    // Handle language selection
    const onSelect = (selectedLanguage) => {
        setLanguage(selectedLanguage);
    };

    // Apply Monaco editor theme based on the selected theme
    useEffect(() => {
        if (window.monaco) {
            if (theme === "dark") {
                window.monaco.editor.setTheme("vs-dark");
            } else if (theme === "light") {
                window.monaco.editor.setTheme("vs");
            } else if (theme === "hc-black") {
                window.monaco.editor.setTheme("hc-black");
            }
        }
    }, [theme]);

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        document.body.classList.remove("light", "dark", "hc-black");
        document.body.classList.add(selectedTheme);
    };

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    // Run code and show the I/O section
    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
    
        setIsLoading(true);
        setOutput(""); 
    
        try {
            // Pass inputData to executeCode
            const { run: result } = await executeCode(language, sourceCode, inputData);
            console.log("runcode input: ", inputData);
            console.log("Execution result:", result);
    
            if (result && result.output) {
                setOutput(result.output.split("\n"));
                setIsOutputVisible(true);  // Output is available after code runs
            } else {
                setOutput(["No output returned"]);
            }
    
            if (result && result.stderr) {
                setIsError(true);
            } else {
                setIsError(false);
            }

            // Ensure the output section is shown after the code runs
            setShowOutput(true);
            setCodeRan(true);  // Mark that the code has been run
        } catch (error) {
            toast.error(error.message || "Unable to run code", {
                position: "top-right",
                autoClose: 5000,
            });
    
            setOutput(["Error: " + error.message]);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    const onInputChange = (newInput) => {
        setInputData(newInput);  
    };

    // Toggle I/O section visibility from the terminal button click
    const toggleOutputVisibility = () => {
        setShowOutput((prev) => !prev);  // Toggle visibility when clicked
    };

    // Function to download the code as a file
    const downloadCode = () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        // Show the modal to ask for a file name
        setIsModalOpen(true);
    };

    // Handle file name submission
    const handleFileNameSubmit = (fileName) => {
        const fileExtension = file_extensions.find(ext => ext[language])?.[language];
        const fullFileName = fileName.endsWith(fileExtension) ? fileName : fileName + fileExtension;

        const sourceCode = editorRef.current.getValue();
        const blob = new Blob([sourceCode], { type: "text/plain" });
        const link = document.createElement("a");

        // Set up the download link and trigger the download
        link.href = URL.createObjectURL(blob);
        link.download = fullFileName;  // Use the user-defined or default file name
        link.click();
    };

    // Toggle the word wrapping functionality
    const toggleWrapping = () => {
        setIsWrappingEnabled((prev) => !prev);
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Top Section: Editor controls */}
            <div className="flex flex-row space-x-4 items-center justify-between bg-gray-800 text-white p-0 m-0 z-10">
                {/* Section 1: Left side (Terminal and Language Selector) */}
                <div className="flex items-center space-x-3">
                    {/* Terminal Button */}
                    <button
                        onClick={toggleOutputVisibility}
                        className="flex items-center space-x-2 bg-gray-600 hover:bg-purple-800 text-white px-3 py-0 rounded-md text-sm h-8"
                    >
                        <Terminal className="w-4 h-4"/>
                    </button>

                    {/* Language Selector */}
                    <div className="flex items-center h-8">
                        <LanguageSelector 
                            language={language} 
                            onSelect={onSelect} 
                            className="h-full flex items-center"  // Ensure full height and centered items
                        />
                    </div>
                </div>


    {/* Section 2: Middle (Run Code Button) */}
        <div className="flex items-center">
            <button
                onClick={runCode}
                className=" bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-3xl transition duration-200 text-sm"
                disabled={isLoading || !editorRef.current}
            >
                {isLoading ? "Running..." : "Run Code"}
            </button>
        </div>

    {/* Section 3: Right side (Theme Selector, Download Button, Wrapping Toggle) */}
    <div className="flex items-center space-x-3">
        <Themes theme={theme} onSelect={handleThemeChange} />

        <button
            onClick={toggleWrapping}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-800 text-white px-3 py-2 rounded-md text-sm"
        >
            <SquareChevronRight className="w-4 h-4" />
            <span className="text-xs">{isWrappingEnabled ? "Disable Wrapping" : "Enable Wrapping"}</span>
        </button>

        <button 
            onClick={downloadCode} 
            className="flex items-center space-x-2 bg-gray-600 hover:bg-purple-800 text-white px-3 py-0 rounded-md text-sm h-8"
        >
            <Download className="w-4 h-4" />
        </button>

    </div>
</div>


            {/* Editor Section */}
            <div className="flex-1 overflow-hidden">
                <Editor
                    className="h-full border-0 bg-neutral-50"
                    language={language}
                    defaultValue="// some comment"
                    theme="vs-light"
                    value={value}
                    onMount={onMount}
                    onChange={(newValue) => setValue(newValue)}
                    options={{
                        wordWrap: isWrappingEnabled ? "on" : "off",  // Enable/Disable word wrapping based on state
                    }}
                />
            </div>

            {/* Output Section (only visible when showOutput is true and code has been run) */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: showOutput ? "300px" : "0",  // Expand when showOutput is true
                    zIndex: 10,
                    maxHeight: "50vh",  // Prevent it from expanding past 50% of the screen height
                    transition: "height 0.3s ease-out",  // Smooth transition when expanding/collapsing
                    overflow: "hidden", // Hide the content when collapsed
                }}
            >
                {showOutput && (
                    <Merge
                        output={output}
                        isLoading={isLoading}
                        isOutputVisible={isOutputVisible}
                        setOutput={setOutput}
                        setIsLoading={setIsLoading}
                        setIsOutputVisible={setIsOutputVisible}
                        input={inputData}
                        onInputChange={onInputChange}
                        showOutput={showOutput}
                    />
                )}
            </div>

            {/* File Name Modal */}
            <FileNameModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFileNameSubmit}
                defaultFileName={`code${file_extensions.find(ext => ext[language])?.[language]}`}
            />
        </div>
    );
};

export default CodeBoard;
