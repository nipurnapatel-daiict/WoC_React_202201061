import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, language_extension, theme_extension, file_extensions } from "../constants";
import Output from "./Output";
import { executeCode } from "../api"; 
import { toast } from "react-toastify";
import InputSection from "./InputSection";
import Themes from "./Themes";
import Merge from "./Merge";
import { SquareChevronRight } from 'lucide-react';
import { Download } from 'lucide-react';
import FileNameModal from "./Filemodel";
import { CodeXml } from 'lucide-react';
import { Terminal } from 'lucide-react';
import Chatbot from "./Chatbot/Chatbot";
import { MessageCircle } from 'lucide-react';


const encodeToBase64 = (str) => {
    return btoa(str);
}

const decodeFromBase64 = (str) => {
    return atob(str);
}

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
    const [showOutput, setShowOutput] = useState(false);  
    const [codeRan, setCodeRan] = useState(false);  
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [customFileName, setCustomFileName] = useState(""); 
    const [isWrappingEnabled, setIsWrappingEnabled] = useState(false);  

    const [userID, setUserId] = useState(null);
    const [hasShownToast, setHasShownToast] = useState(false);

    // for chatbot
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () =>{
        setIsChatOpen(prevState => !prevState);
    }


    useEffect(() => {
        let storedUserID = localStorage.getItem('userID');
        if (!storedUserID) {
            storedUserID = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userID', storedUserID);
        }
        setUserId(storedUserID);
    }, []);

    useEffect(() => {
        const navigationEntries = window.performance.getEntriesByType("navigation");
        const isReload = navigationEntries && navigationEntries[0]?.type === "reload";
        
        if (isReload && !hasShownToast) {
            setHasShownToast(true);
        
            toast.info("Page reloaded", {
                position: "top-right",
                autoClose: 2000,
            });
        }
    
        const urlParams = new URLSearchParams(window.location.search);
        const langFromUrl = urlParams.get('language') || "javascript";  
        setLanguage(langFromUrl);  
    
        const encodedCodeFromUrl = urlParams.get('code');  
        if (encodedCodeFromUrl) {
            setValue(decodeFromBase64(encodedCodeFromUrl));  
        } else {
            setValue(CODE_SNIPPETS[langFromUrl] || "");
        }
    }, [hasShownToast]); 

    useEffect(() => {
        const savedCode = localStorage.getItem(`code_${userID}_${language}`);
        if (savedCode) {
            setValue(savedCode);  
        } else {
            setValue(CODE_SNIPPETS[language] || "");  
        }
    }, [language, userID]);

    const shortUrl = (longUrl) => {
        return btoa(longUrl).slice(0, 10);
    };

    const handleEditorChange = (newCode) => {
       // console.log("editor code changes : ", newCode);
        setValue(newCode);
        if (userID) {
            localStorage.setItem(`code_${userID}_${language}`, newCode);  
        }

        const encodedCode = encodeToBase64(newCode);
        const shortenURL = shortUrl(encodedCode);
        window.history.replaceState(
            null,
            "",
            `?userID=${userID}&language=${language}&code=${shortenURL}`  
        );
    };


    useEffect(() => {
        if (window.monaco) {
            if (theme === "dark") {
                window.monaco.editor.setTheme("vs-dark");
            } else if (theme === "light") {
                window.monaco.editor.setTheme("vs");
            } else if (theme === "hc-black") {
                window.monaco.editor.setTheme("hc-black");
            } else if (theme === "one-dark") {
                monaco.editor.defineTheme('one-dark', {
                    base: 'vs-dark', // Use 'vs-dark' as base
                    inherit: true,
                    rules: [
                        { token: 'keyword', foreground: 'C586C0', fontStyle: 'bold' },
                        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
                        // Add more rules for different token types as needed
                    ],
                    colors: {
                        'editor.background': '#2d2d2d',
                        'editor.foreground': '#d4d4d4',
                        // Customize other color settings as needed
                    }
                });
                window.monaco.editor.setTheme('one-dark');
            } else if (theme === "solarized-dark") {
                monaco.editor.defineTheme('solarized-dark', {
                    base: 'vs-dark',
                    inherit: true,
                    rules: [
                        { token: 'keyword', foreground: '859900', fontStyle: 'bold' },
                        { token: 'comment', foreground: '93a1a1', fontStyle: 'italic' },
                        // Define more token rules as needed
                    ],
                    colors: {
                        'editor.background': '#002b36',
                        'editor.foreground': '#839496',
                        // Customize other colors here
                    }
                });
                window.monaco.editor.setTheme('solarized-dark');
            } else if (theme === "one-light") {
                monaco.editor.defineTheme('one-light', {
                    base: 'vs', // Use 'vs' (light theme) as base
                    inherit: true,
                    rules: [
                        { token: 'keyword', foreground: '007acc', fontStyle: 'bold' },
                        { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
                        // Add more rules for different token types as needed
                    ],
                    colors: {
                        'editor.background': '#fafafa',
                        'editor.foreground': '#383a42',
                        // Customize other color settings as needed
                    }
                });
                window.monaco.editor.setTheme('one-light');
            } else if (theme === "solarized-light") {
                monaco.editor.defineTheme('solarized-light', {
                    base: 'vs',
                    inherit: true,
                    rules: [
                        { token: 'keyword', foreground: '268bd2', fontStyle: 'bold' },
                        { token: 'comment', foreground: '2aa198', fontStyle: 'italic' },
                        // Define more token rules as needed
                    ],
                    colors: {
                        'editor.background': '#fdf6e3',
                        'editor.foreground': '#586e75',
                        // Customize other colors here
                    }
                });
                window.monaco.editor.setTheme('solarized-light');
            }
        }
    }, [theme]);

    

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        document.body.classList.remove("light", "dark", "hc-black");
        document.body.classList.add(selectedTheme);
    };

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        console.log("Running code in language: ", language)
    
        setIsLoading(true);
        setOutput(""); 
    
        try {
            const { run: result } = await executeCode(language, sourceCode, inputData);
            result.stderr ? setIsError(true) : setIsError(false);
    
            if (result && result.output) {
                setOutput(result.output.split("\n"));
                setIsOutputVisible(true);  
            } else {
                setOutput(["No output returned"]);
            }
    
            setShowOutput(true);
            setCodeRan(true);  
    
        } catch (error) {
            toast.error(error.message || "Unable to run code", {
                position: "top-right",
                autoClose: 5000,
            });
            setOutput([
                <span style={{ color: 'red' }}>Error: {error.message}</span>
            ]);
          //  setOutput(["Error: " + error.message]);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const onInputChange = (newInput) => {
        setInputData(newInput);  
    };

    const toggleOutputVisibility = () => {
        setShowOutput((prev) => !prev);  
    };

    const downloadCode = () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        setIsModalOpen(true);
    };

    // Handle file name submission
    const handleFileNameSubmit = (fileName) => {
        const fileExtension = file_extensions.find(ext => ext[language])?.[language];
        const fullFileName = fileName.endsWith(fileExtension) ? fileName : fileName + fileExtension;

        const sourceCode = editorRef.current.getValue();
        const blob = new Blob([sourceCode], { type: "text/plain" });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = fullFileName;  
        link.click();
    };

    const toggleWrapping = () => {
        setIsWrappingEnabled((prev) => !prev);
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Editor controls */}
            <div className="flex flex-row space-x-4 items-center justify-between bg-gray-800 text-white p-0 m-0 z-10">
                {/* Left section */}
                <div className="flex items-center space-x-3">
                    <button onClick={toggleOutputVisibility} className="flex items-center space-x-2 bg-gray-600 hover:bg-purple-800 text-white px-3 py-0 rounded-md text-sm h-8">
                        <Terminal className="w-4 h-4"/>
                    </button>
                    <LanguageSelector language={language} onSelect={setLanguage} />
                </div>

                {/* Middle section (Run Code Button) */}
                <div className="flex items-center">
                    <button onClick={runCode} className=" bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-3xl transition duration-200 text-sm" disabled={isLoading || !editorRef.current}>
                        {isLoading ? "Running..." : "Run Code"}
                    </button>
                </div>

                {/* Right section */}

                <div className="relative">
                    <div className="flex items-center space-x-3">
                        <Themes theme={theme} onSelect={handleThemeChange} />
                        <button onClick={toggleWrapping} className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-800 text-white px-3 py-2 rounded-md text-sm">
                        <SquareChevronRight className="w-4 h-4" />
                        <span className="text-xs">{isWrappingEnabled ? "Disable Wrapping" : "Enable Wrapping"}</span>
                        </button>
                    </div>
                    <button
                        onClick={downloadCode}
                        className="absolute bottom-[-1] m-2 right-4 bg-gray-600 hover:bg-purple-800 text-white p-2 rounded-md shadow-lg flex items-center justify-center"
                    >
                        <Download className="w-6 h-6" />
                    </button>
                </div>

            </div>

            {/* Code editor */}
            <div className="flex-1 overflow-hidden">
                <Editor
                    className="h-full border-0 bg-neutral-50"
                    language={language}
                    theme="vs-light"
                    value={value}
                    onChange={(newValue) => handleEditorChange(newValue)}
                    onMount={(editor) => { 
                        editorRef.current = editor; 
                        editor.focus(); 
                    }}
                    options={{
                        wordWrap: isWrappingEnabled ? "on" : "off",  
                    }}
                />
            </div>

            {/* Output section */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: showOutput ? "300px" : "0",  
                    zIndex: 10,
                    maxHeight: "50vh",  
                    transition: "height 0.3s ease-out",  
                    overflow: "hidden",
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
                        inputData={inputData}
                        onInputChange={onInputChange}
                        showOutput={showOutput}
                        color={isError ? "red-400" : "gray-300"}
                        borderColor={isError ? "red-500" : "gray-300"}
                    />
                )}
            </div>

            {/* File Name Modal */}
            <FileNameModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFileNameSubmit}
               // defaultFileName={`code${file_extensions.find(ext => ext[language])?.[language]}`}
               defaultFileName=""
            />


{/* ----------------------Floating point------------------- */}

        <button
            onClick={() => setIsChatOpen((prev) => !prev)} // Toggle chat window visibility
            className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-800 transition duration-300"
        >
            <MessageCircle className="w-6 h-6" />
        </button>

        {/* ----------------------Chatbot Component------------------- */}
        {isChatOpen && (
            <div className="fixed bottom-6 right-6 z-50">
                <Chatbot closeChat={toggleChat} /> {/* Your Chatbot component */}
            </div>
        )}

        </div>
    );
};

export default CodeBoard;
