import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
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
import { useUser } from "../context/UserContext";
import { doc, collection, getFirestore, where } from "firebase/firestore";
import app from "../App";
import { useLocation } from "react-router-dom"; 
import { updateDoc } from "firebase/firestore";


const encodeToBase64 = (str) => {
    return btoa(str);
}

const decodeFromBase64 = (str) => {
    return atob(str);
}

const ForAuthUsers = ({selectedFile, setSelectedFile}) => {
    // console.log("AuthUser",selectedFile);
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

    const user = useUser();
    const db = getFirestore(app);
    const location = useLocation();

    const {content, language: fileLanguage, fileId, fileName} = selectedFile || {};
// console.log("name at auth: ", fileName);

    


    useEffect(() => {
        if (content && fileLanguage && fileId) {
          setValue(content);  // Set the file content with the file name as a comment
          setLanguage(fileLanguage);  // Set the language based on the passed state
          console.log("id at 70", fileId);
        }
      }, [content, fileLanguage, fileId]);
    
    
    const shortUrl = (longUrl) => {
        return btoa(longUrl).slice(0, 10);
    };

    const handleEditorChange = async (newCode) => {
        setValue(newCode);  // Update the editor with the new code
    
        // if (!user || !user.email || !selectedFile) {
        //     console.log("User not logged in or no file selected.");
        //     return;
        // }
    
        const fileRef = doc(db, "Files", selectedFile.fileId);
    
        try {
            // Update Firestore with the new code
            await updateDoc(fileRef, { content: newCode });
            console.log("Code successfully saved to Firestore");
    
            // Optional: Encode and update URL with code (for sharing purposes)
            const encodedCode = encodeToBase64(newCode);
            const shortenURL = shortUrl(encodedCode);
            window.history.replaceState(
                null,
                "",
                `?userID=${user.email}&language=${fileLanguage}&code=${shortenURL}`
            );
        } catch (error) {
            console.error("Error saving code:", error);
        }
    
    };

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

const mapLangugae = (fileLanguage) => {
    const languageMap = {
        py : "python",
        js : "javascript",
        cpp : "cpp",
    }

    return languageMap[fileLanguage] || fileLanguage;
}

const runCode = async () => {
   // console.log("runcode clicked!!!");
   const sourceCode = editorRef.current.getValue();
   if (!sourceCode) return;

   console.log("source code: ", sourceCode);
    setIsLoading(true);
    setOutput(""); 
   // console.log(content);
  
   const Lang = mapLangugae(fileLanguage);

    try {
        const { run: result } = await executeCode(Lang, sourceCode, inputData);  // Use the fileLanguage here
        console.log("res at 213: ", result);
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

        setOutput(["Error: " + error.message]);
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
    //console.log("FILENAME", fileName);
    const downloadCode = () => {
      //  console.log("filename in 88", fileName);
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;  

        const fileExtension = fileName.split(".").pop().toLowerCase();
        //console.log(fileExtension);
        const blob = new Blob([sourceCode], { type: 'text/plain' });
     
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
     
        link.download = fileName;  
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
                    {/* <LanguageSelector language={language} onSelect={setLanguage} /> */}
                </div>

                {/* Middle section (Run Code Button) */}
                <div className="flex items-center">
                    <button onClick={runCode} className=" bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-3xl transition duration-200 text-sm" disabled={isLoading || !editorRef.current}>
                        {isLoading ? "Running..." : "Run Code"}
                    </button>
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-3">
                    <Themes theme={theme} onSelect={handleThemeChange} />
                    <button onClick={toggleWrapping} className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-800 text-white px-3 py-2 rounded-md text-sm">
                        <SquareChevronRight className="w-4 h-4" />
                        <span className="text-xs">{isWrappingEnabled ? "Disable Wrapping" : "Enable Wrapping"}</span>
                    </button>
                    <button onClick={downloadCode} className="flex items-center space-x-2 bg-gray-600 hover:bg-purple-800 text-white px-3 py-0 rounded-md text-sm h-8">
                        <Download className="w-4 h-4" />
                    </button>
                </div>

            </div>

            

            {/* Code editor */}
            <div className="flex-1 overflow-hidden">
                {/* <div className="flex space-x-2 overflow-x-auto py-2 px-4 bg-gray-100 border-b-2">
                {openFiles.map((file) => (
                    <div key={file.id} className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                        // onClick={() => handleCloseFile(file.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        X
                    </button>
                    </div>
                ))}
                </div> */}


            <Editor
                language={mapLangugae(fileLanguage)}
                theme="vs-light" 
                value={value}
                onChange={handleEditorChange}
                onMount={(editor) => { 
                    editorRef.current = editor; 
                    editor.focus(); 
                    // monaco.editor.setModelLanguage(editor.getModel(), fileLanguage); // Ensure Monaco language is set correctly
                }}
                options={{
                    wordWrap: isWrappingEnabled ? "on" : "off",
                    suggest: {
                        showWords: true,
                        showWordsAsSuggestions: true,
                    }
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
            {/* <FileNameModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFileNameSubmit}
                defaultFileName={`code${file_extensions.find(ext => ext[language])?.[language]}`}
            /> */}
        </div>
    );
};

export default ForAuthUsers;






{/* <div className="flex space-x-2 overflow-x-auto py-2 px-4 bg-gray-100 border-b-2">
          {openFiles.map((file) => (
            <div key={file.id} className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-700">{file.name}</span>
              <button
                onClick={() => handleCloseFile(file.id)}
                className="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>
          ))}
        </div> */}






//     const runCode = async () => {
//     if (!language) {
//         toast.error("Please select a programming language before running the code.");
//         return;
//     }

//     const sourceCode = editorRef.current?.getValue();
//     if (!sourceCode) {
//         toast.error("Code editor is empty. Please write some code before running.");
//         return;
//     }

//     setIsLoading(true);
//     setOutput("");

//     try {
//         // Ensure the selected language is valid before executing
//         if (!Object.keys(CODE_SNIPPETS).includes(language)) {
//             toast.error("Unsupported language selected.");
//             setIsLoading(false);
//             return;
//         }

//         const { run: result } = await executeCode(language, sourceCode, inputData);
//         result.stderr ? setIsError(true) : setIsError(false);

//         if (result && result.output) {
//             setOutput(result.output.split("\n"));
//             setIsOutputVisible(true);
//         } else {
//             setOutput(["No output returned"]);
//         }

//         setShowOutput(true);
//         setCodeRan(true);
//     } catch (error) {
//         toast.error(error.message || "Unable to run code", {
//             position: "top-right",
//             autoClose: 5000,
//         });

//         setOutput(["Error: " + error.message]);
//         setIsError(true);
//     } finally {
//         setIsLoading(false);
//     }
// };





    // FETCH FILES FOR USER 
    // useEffect(() => {
    //     const fetchFiles = async () => {
    //         try {
    //             const userFiles = collection(db, "Files");
    //             const q = query(userFiles, where("createdBy", "==", user.email));
    //             const querySnapshot = await getDocs(q);

    //             const files = querySnapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 ...doc.data(),
    //             }));

    //             setOpenedFiles(files);
    //             if (files.length > 0) {
    //                 setValue(files[0].content);  // Set content of the first file
    //                 setLanguage(files[0].type);  // Set language of the first file
    //                 setCustomFileName(files[0].name);  // Set file name
    //             }

    //         } catch (error) {
    //             console.error("Error fetching files:", error);
    //             toast.error("Error loading files.");
    //         }
    //     };

    //     if (user?.email) { // Ensure user is logged in and has an email
    //         fetchFiles();
    //     }
    // }, [user?.email])

    // useEffect(() => {
    //     if (selectedFile) {
    //         const fileNameWithComment = `// ${selectedFile.name}\n\n${selectedFile.content}`;
    //         setValue( fileNameWithComment + selectedFile.content);
    //         setLanguage(selectedFile.language);
    //         setCustomFileName(selectedFile.fileName);
    //     }
    // }, [selectedFile]);

    // const handleEditorChange = (newCode) => {
    //     setValue(newCode);
    //     if (user?.email) {
    //         saveCodeToFirestore(newCode);  // Save code to Firestore when it changes
    //     }
    // };

    // const saveCodeToFirestore = async (code) => {
    //     if (!user?.email) return;
    
    //     const codeRef = doc(db, "Files", `${user.email}_${customFileName || 'Untitled'}`); // Use customFileName for document ID
    
    //     try {
    //         await setDoc(codeRef, {
    //             content: code,               // Save the code content
    //             language: language,          // Save the language used
    //             createdBy: user.email,       // Save the user's email
    //             name: customFileName || 'Untitled',  // Name field (can be 'Untitled' by default)
    //             type: "txt",                 // Save file type, you can adjust this based on actual file type
    //             size: code.length,           // Save the size (you can adjust if required)
    //             modifiedAt: Date.now(),      // Store the timestamp of the modification
    //         });
    //         console.log("Code saved to Firestore.");
    //     } catch (error) {
    //         toast.error("Error saving code to Firestore.");
    //         console.error("Error saving code:", error);
    //     }
    // };
    
    