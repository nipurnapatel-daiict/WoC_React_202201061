import { doc, getFirestore, setDoc, query, collection, where, getDocs } from "firebase/firestore";
import React, { useState, useContext } from "react";
import app from "../../../App";
import { showToastContext } from "../../../context/ShowToastContext";
import { useUser } from "../../../context/UserContext";
import { ParentFolderIdContext } from "../../../context/ParentFolderIdContext";
import Toast from "../../../components/Notify";

const CreateFile = () => {
    const docId = Date.now().toString();

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const db = getFirestore(app);
    const { user, loading } = useUser();
    const { parentFolderId } = useContext(ParentFolderIdContext);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const allowedExtensions = {
        javascript: ".js",
        python: ".py",
        plaintext: ".txt",
        csharp: ".cs",
        typescript: ".ts",
        java: ".java",
        php: ".php",
    };

    // Validate file name (only alphanumeric, dashes, and underscores allowed)
    const validateFileName = (name) => {
        const trimmedName = name.trim(); // Trim spaces from the start and end
    
        if (!trimmedName) {
            alert("File name cannot be empty.");
            return false;
        }
    
        // Updated regex: Allow only letters, numbers, dashes, and underscores
        const regex = /^[a-zA-Z0-9-_]+(\.[a-zA-Z0-9]+)?$/;
        if (!regex.test(trimmedName)) {
            //alert("File name can only contain letters, numbers, dashes, underscores, and a single dot.");
            setToastMessage(`File name can only contain letters, numbers, dashes, underscores, and a single dot.`);
            setShowToast(true);
            setTimeout(() => {
            setShowToast(false);
            }, 3000);
            return false;
        }
    
        // Check that the file name doesn't start with a number
        if (trimmedName.startsWith('0') || !isNaN(trimmedName[0])) {
            //alert("File name cannot start with a number.");
            setToastMessage(`File name cannot start with a number.`);
            setShowToast(true);
            setTimeout(() => {
            setShowToast(false);
            }, 3000);
            return false;
        }

        const fileExtension = trimmedName.slice(((trimmedName.lastIndexOf(".") - 1) >>> 0) + 2);

        // Ensure the file extension is allowed
        if (!Object.values(allowedExtensions).includes(`.${fileExtension}`)) {
            //alert(`The file extension ".${fileExtension}" is not allowed. Allowed extensions are: ${Object.values(allowedExtensions).join(", ")}`);
            setToastMessage(`The file extension ".${fileExtension}" is not allowed. Allowed extensions are: ${Object.values(allowedExtensions).join(", ")}`);
            setShowToast(true);
            setTimeout(() => {
            setShowToast(false);
            }, 3000);
            return false;
        }
    
        return true;
    
    };
    
    

    //Check if the file name already exists in the folder
        const checkDuplicateFileName = async (name) => {
        const q = query(
            collection(db, "Files"), // The collection is correctly specified
            where("name", "==", name), // Check for matching file name
            where("parentFolderId", "==", parentFolderId || 0) // Ensure the parentFolderId is handled properly
        );
    
        // Execute the query
        const querySnapshot = await getDocs(q);
    
        // Return whether the query returned any documents (meaning the file exists)
        return !querySnapshot.empty;
    };

    // Validate file type (only allowed types)
    const allowedFileTypes = ["txt", "js", "py"];
    const getFileType = (fileName) => {
        if (!fileName.includes(".")) return "txt"; // Default if no extension
        return fileName.split('.').pop().toLowerCase();
    };

    const validateFileType = (file) => {
        const fileType = getFileType(file.name);
        if (!allowedFileTypes.includes(fileType)) {
            alert(`Invalid file type. Allowed types are: ${allowedFileTypes.join(", ")}`);
            return false;
        }
        return true;
    };

    // Handle file creation (either upload or create new text file)
    const onFileCreate = async () => {
        if (loading) {
            console.log("User state is still loading.");
            return;
        }

        if (!user || !user.email) {
            console.log("User is not logged in or email is not available.");
            return;
        }

        if (!file && !fileName.trim()) {
            //alert("Please provide a file or a filename.");
            setToastMessage(`Please provide a file or a filename.`);
            setShowToast(true);
            setTimeout(() => {
            setShowToast(false);
            }, 3000);
            return;
        }

        if (fileName.trim() && !validateFileName(fileName)) {
            return;
        }

        if (file && !validateFileType(file)) {
            return;
        }

        const isDuplicate = await checkDuplicateFileName(fileName);
        if (isDuplicate) {
            //alert("A file with this name already exists in the selected folder.");
            setToastMessage(`A file with this name already exists.`);
            setShowToast(true);
            setTimeout(() => {
            setShowToast(false);
            }, 3000);
            return;
        }

        const docId = Date.now().toString();

        const name = file ? file.name : fileName;
        const fileType = file ? getFileType(file.name) : getFileType(fileName);
        const fileURL = null;  // Placeholder for file URL (if uploaded to storage)
        const fileContent = ""; // Default empty content for a new text file

        await setDoc(doc(db, "Files", docId), {
            id: docId,
            name,
            type: fileType,
            size: file ? file.size : 0,
            modifiedAt: file ? file.lastModified : Date.now(),
            createdBy: user.email,
            parentFolderId: parentFolderId || 0,
            url: fileURL,
            content: file ? null : fileContent,
        });

        const fileData = {
            id: docId,
            name,
            type: fileType,
            size: file ? file.size : 0,
            modifiedAt: file ? file.lastModified : Date.now(),
            createdBy: user.email,
            parentFolderId: parentFolderId || 0,
            url: fileURL,
            content: file ? null : fileContent,
        };

        console.log("file created");
        document.getElementById('my_file_model').close();
        setFileName("");
        setFile(null);
    };

    return (
        <div>
            <form method="dialog" className="modal-box p-9 items-center">
                {/* Close Button */}
                <button 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => document.getElementById("file_modal").close()} 
                >
                    ✕
                </button>

                <div className="w-full items-center flex flex-col justify-center gap-3">
                    {/* File Name Input */}
                    <input
                        type="text"
                        placeholder="Enter File Name (Optional for Upload)"
                        className="p-2 border-[1px] outline-none rounded-md w-full"
                        onChange={(e) => setFileName(e.target.value)}
                    />
                    
                    {/* File Upload Input */}
                    <input
                        type="file"
                        className="p-2 border-[1px] outline-none rounded-md w-full"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    {/* Create or Upload Button */}
                    <button
                        type="button"
                        className="bg-blue-500 text-white rounded-md p-2 px-3 w-full"
                        onClick={onFileCreate}
                    >
                        Create / Upload
                    </button>
                </div>
            </form>

            {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}

        </div>
    );
};

export default CreateFile;


