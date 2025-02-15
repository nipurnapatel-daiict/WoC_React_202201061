import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState, useContext } from "react";
import app from "../../../App";
import { showToastContext } from "../../../context/ShowToastContext";
import { useUser } from "../../../context/UserContext";
import { ParentFolderIdContext } from "../../../context/ParentFolderIdContext";

const CreateFile = () => {
    const docId = Date.now().toString();

    const [showToastMsg, setShowToastMsg] = useContext(showToastContext);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const db = getFirestore(app);
    const { user, loading } = useUser();
    const { parentFolderId } = useContext(ParentFolderIdContext);

    const validateFileName = (name) => {
        // No special characters or spaces allowed
        const regex = /^[a-zA-Z0-9-_]+$/;
        return regex.test(name);
    };

    const checkDuplicateFileName = async (name) => {
        const q = query(
            collection(db, "Files"),
            where("name", "==", name),
            where("parentFolderId", "==", parentFolderId || 0)
        );
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; 
    };

    const onFileCreate = async ({}) => {
        if (loading) {
            console.log("User state is still loading.");
            return;
        }
    
        if (!user || !user.email) {
            console.log("User is not logged in or email is not available.");
            return;
        }
    
        if (!file && !fileName.trim()) {
            alert("Please provide a file or a filename.");
            return;
        }

        // if (!validateFileName(fileName)) {
        //     alert("File name contains invalid characters! Only letters, numbers, dashes, and underscores are allowed.");
        //     return;
        // }

        // if (fileName.trim().startsWith('0') || !isNaN(fileName.trim()[0])) {
        //     alert("File name cannot start with a number.");
        //     return;
        // }

        // const isDuplicate = await checkDuplicateFileName(fileName);
        // if (isDuplicate) {
        //     alert("A file with this name already exists in the selected folder.");
        //     return;
       // }
    
      //  const docId = Date.now().toString();

        const getFileType = (fileName) => {
            if (!fileName.includes(".")) return "txt";  // Default if no extension
            return fileName.split('.').pop().toLowerCase(); // Extract last part after "."
        };

        const name = file ? file.name : fileName;
        const fileType = file ? getFileType(file.name) : getFileType(fileName);
        console.log("file type" , fileType);
        const fileURL = null;  // Since no file upload to Firebase Storage
        const fileContent = ""; // Default empty content for a new text file
    
        await setDoc(doc(db,"Files", docId), {
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
       // addNewFile(fileData);
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
        </div>
    );
};

export default CreateFile;


