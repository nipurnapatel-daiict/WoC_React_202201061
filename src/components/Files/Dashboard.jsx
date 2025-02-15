import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import FolderList from "./Folder/FolderList";
import FileList from "./File/FileList";
import Toast from "./Toast";
import { ShowToastProvider } from "../../context/ShowToastContext";
import { useUser } from "../../context/UserContext";
import { collection, getDocs, getFirestore, query, where, doc, getDoc, onSnapshot } from "firebase/firestore";
import app from "../../App";
import FolderDetails from "./folders/[FolderId]";  
import { ParentFolderIdContext } from "../../context/ParentFolderIdContext";
import ForAuthUsers from "../ForAuthUsers";

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [showToast, setShowToast] = useState("");
  const { user, loading } = useUser();
  const db = getFirestore(app);
  const navigate = useNavigate();
  const { folderId } = useParams(); // Get the folderId from the URL

  const [folderid, setFolderId] = useState(folderId || null);
  const [parentFolderId, setParentFolderId] = useState(0); 
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [openFiles, setOpenFiles] = useState([]); // Track open files



  useEffect(() => {
    if (loading || !user || parentFolderId === undefined) return;
  
    const unsubscribe = onSnapshot(
      query(
        collection(db, "Files"),
        where("createdBy", "==", user.email),
        where("parentFolderId", "==", parentFolderId)
      ),
      (snapshot) => {
        const fileArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFileList(fileArray);  // Set file list to the real-time data
        console.log("Real-time file updates:", fileArray);
      },
      (error) => {
        console.error("Error fetching real-time files:", error);
      }
    );
  
    return () => unsubscribe();  // Cleanup the listener on component unmount
  }, [user, db, loading, parentFolderId]);
  
  useEffect(() => {
    if (parentFolderId === undefined) {
      setParentFolderId(0); 
    }
  }, [parentFolderId]);
  
  useEffect(() => {
    setFileList([]);  // Clear file list when parentFolderId changes
  }, [parentFolderId]);


  const getCommentSyntex = (language) => {
    switch (language) {
      case "py":
          return "#";  
      case "javascript":
      case "java":
      case "c":
      case "cpp":
          return "//";  
      case "html":
          return "<!--"; 
      default:
          return "//";  
  }
  }

  const handleOpenFile = async (file) => {
   // console.log("File at 45: ", file.name);
    try {
      const fileRef = doc(db, "Files", file.id);
      
      const fileSnap = await getDoc(fileRef);

      
      if (fileSnap.exists()) {
        const fileData = fileSnap.data(); 
        console.log("File",file);

        const commentSyntex = getCommentSyntex(file.type);
        let contentWithComment = `${fileData.content || ""}`;

            
            const commentLine = `${commentSyntex} ${file.name}`;
            if (!contentWithComment.includes(commentLine)) {
                contentWithComment = `${commentLine}\n\n${contentWithComment}`; 
            }
        setSelectedFile({
          content: contentWithComment, 
          language: fileData.type || "js",
          fileId : fileRef.id ,
          fileName : file.name,
        });
      } else {
        console.error("File does not exist");
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };
  // const handleOpenFile = async (file) => {
  //   try {
  //     const fileRef = doc(db, "Files", file.id);
  //     const fileSnap = await getDoc(fileRef);
  
  //     if (fileSnap.exists()) {
  //       const fileData = fileSnap.data();
  
  //       // Create a new file object
  //       const newFile = {
  //         id: fileRef.id,
  //         name: file.name,
  //         content: fileData.content || "", // Default to empty content
  //         language: fileData.type || "js", // Default to JavaScript
  //       };
  
  //       // Check if the file is already opened, if not, add it
  //       if (!openFiles.some((f) => f.id === newFile.id)) {
  //         setOpenFiles((prevFiles) => [...prevFiles, newFile]);
  //       }
  //     } else {
  //       console.error("File does not exist");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching file content:", error);
  //   }
  // };
  

  // const handleCloseFile = (fileId) => {
  //   setOpenFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  // };  


  const handleFileDoubleClick = async (file) => {
    try {
      await handleOpenFile(file);  

     const fileNameWithComment = `${selectedFile?.content || ""}`;
     console.log("fileNameWithComment", fileNameWithComment);

      navigate(`/files/editor`, { 
        state: { 
          content: fileNameWithComment,  
          language: selectedFile.language || "js",
          fileId : selectedFile.id,  
          fileName : file.name,
        } 
        
      });
      console.log( "fileNameWithComment at 93", fileNameWithComment);
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  //---------------------folder handling ---------------------------------------//

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
    } else {
      const getFolderList = async () => {
        const q = query(
          collection(db, "Folder"),
          where("email", "==", user.email),
          where("parentFolderId", "==", 0)
        );

        const querySnapshot = await getDocs(q);
        const folderArray = [];

        querySnapshot.forEach((doc) => {
          folderArray.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched folders: ", folderArray);
        setFolders(folderArray);
      };

      getFolderList();
    }
  }, [user, db, navigate, loading]);

  useEffect(() => {
    if (loading || !user || parentFolderId === undefined) return;

    const getFileList = async () => {
      try {
        const q = query(
          collection(db, "Files"),
          where("createdBy", "==", user.email),
          where("parentFolderId", "==", parentFolderId)
        );

        const querySnapshot = await getDocs(q);
        const fileArray = [];

        querySnapshot.forEach((doc) => {
          fileArray.push({ id: doc.id, ...doc.data() });
        });

        setFileList(fileArray);
        console.log("Fetched files:", fileArray);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    getFileList();
  }, [user, db, loading, parentFolderId]);

  useEffect(() => {
    if (parentFolderId === undefined) {
      setParentFolderId(0); 
    }
  }, [parentFolderId]);

  useEffect(() => {
    setFileList([]); 
  }, [parentFolderId]);

  const handleFolderClick = (item) => {
    const folderId = item.id;
    setFolderId(folderId);
    setParentFolderId(folderId); 
    navigate(`/files/folders/${folderId}`, {
      state: { 
        name: item.name, 
        id: item.id 
      }
    });
  };

  const addNewFolder = (newFolder) => {
    setFolders((prevFolders) => [...prevFolders, newFolder]);
  };

  // const addNewFile = (fileData) => {
  //   setFileList((prevFiles) => [...prevFiles, fileData]);
  // };

  const goBackToDefaultLayout = () => {
    setFolderId(null);
    setParentFolderId(0); 
    navigate("/files");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col border-r-2 w-[18%]">
        <ParentFolderIdContext.Provider value={{ parentFolderId, setParentFolderId }}>
          <ShowToastProvider>
            <SideNavbar addNewFolder={addNewFolder} />

            <div className="flex-1 p-2 overflow-auto">
            {/* <div className="file-tabs">
                  {openFiles.map((file) => (
                    <div key={file.id} className="file-tab">
                      <span>{file.name}</span>
                      <button onClick={() => handleCloseFile(file.id)} className="close-tab">X</button>
                    </div>
                  ))}
                </div> */}
                

              {!folderid ? (
                <div className="flex flex-col space-y-6 w-full">
                  <div className="bg-blue-50 p-2 rounded-md shadow-md mt-5">
                    <div className="text-lg font-semibold">Folders</div>
                    <FolderList folders={folders} onFolderClick={handleFolderClick} />
                  </div>

                  <div className="bg-white p-2 rounded-md shadow-md mt-5">
                    <div className="text-lg font-semibold">Files</div>
                    <FileList fileList={fileList} onFileDoubleClick={handleFileDoubleClick} />
                   
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-row flex-grow">
                    <div className="flex-[0.8] p-5 bg-blue-50">
                      <FolderDetails folderId={folderid} />
                    </div>
                  </div>

                  <button onClick={goBackToDefaultLayout} className="btn btn-secondary mt-auto mb-5">
                    Go Back to Default Layout
                  </button>
                </div>
              )}

              {showToast && <Toast msg={showToast} />}
            </div>
          </ShowToastProvider>
        </ParentFolderIdContext.Provider>
      </div>

      <div className="flex-1 p-0 bg-gray-100">
        {/* {console.log("sending...",selectedFile)} */}
        <ForAuthUsers selectedFile={selectedFile} setSelectedFile={selectedFile}/>
      </div>
    </div>
  );
};

export default Dashboard;








































// import React, { useState, useEffect } from "react";
// import { useNavigate, Routes, Route, useParams } from "react-router-dom"; 
// import SideNavbar from "./SideNavbar";
// import FolderList from "./Folder/FolderList";
// import FileList from "./File/FileList";
// import Toast from "./Toast";
// import { ShowToastProvider } from "../../context/ShowToastContext";
// import { useUser } from "../../context/UserContext"; 
// import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
// import app from "../../App";
// import FolderDetails from "./folders/[FolderId]";  // FolderDetails page import
// import { ParentFolderIdContext } from "../../context/ParentFolderIdContext";

// import ForAuthUsers from "../ForAuthUsers"; 

// const Dashboard = () => {
//   const [folders, setFolders] = useState([]);
//   const [showToast, setShowToast] = useState("");
//   const { user, loading } = useUser(); 
//   const db = getFirestore(app);
//   const navigate = useNavigate();
//   const { folderId } = useParams(); // Get the folderId from the URL

//   const [folderid, setFolderId] = useState(folderId || null);
//   const [parentFolderId, setParentFolderId] = useState(0); // Default to 0, if not set

//   const [fileList, setFileList] = useState([]);

//   const [selectedFile, setSelectedFile] = useState(null);





//   // Fetch folders from Firebase
//   useEffect(() => {
//     if (loading) {
//       return; 
//     }

//     if (!user) {
//       navigate("/login"); 
//     } else {
//       const getFolderList = async () => {
//         const q = query(
//           collection(db, "Folder"),
//           where("email", "==", user.email),
//           where("parentFolderId", "==", 0) 
//         );

//         const querySnapshot = await getDocs(q);
//         const folderArray = [];

//         querySnapshot.forEach((doc) => {
//           folderArray.push({ id: doc.id, ...doc.data() });
//         });
//         console.log("fetched folders: ", folderArray);
//         setFolders(folderArray);
//       };

//       getFolderList();
//     }
//   }, [user, db, navigate, loading]);

//   // Fetch files from Firebase based on parentFolderId
//   useEffect(() => {
//     if (loading || !user || parentFolderId === undefined) return;

//     const getFileList = async () => {
//       try {
//         const q = query(
//           collection(db, "Files"),
//           where("createdBy", "==", user.email),
//           where("parentFolderId", "==", parentFolderId)
//         );

//         const querySnapshot = await getDocs(q);
//         const fileArray = [];

//         querySnapshot.forEach((doc) => {
//           fileArray.push({ id: doc.id, ...doc.data() });
//         });

//         setFileList(fileArray);
//         console.log("Fetched files:", fileArray);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//       }
//     };

//     getFileList();
//   }, [user, db, loading, parentFolderId]); // ✅ Make sure parentFolderId is in the dependency array


//   //-----------------------
//   useEffect(() => {
//     if (parentFolderId === undefined) {
//       setParentFolderId(0); // Set to default if undefined
//     }
//   }, [parentFolderId]);

//   useEffect(() => {
//     setFileList([]); // ✅ Clear file list when folder changes
//   }, [parentFolderId]);

//   const handleFolderClick = (item) => {
//     const folderId = item.id;
//     setFolderId(folderId);
//     setParentFolderId(folderId); // Update parentFolderId when folder is clicked
//     navigate(`/files/folders/${folderId}`, {
//       state: {
//         name: item.name, // Pass folder name
//         id: item.id      // Pass folder ID
//       }
//     });
//   };

//   const addNewFolder = (newFolder) => {
//     setFolders((prevFolders) => [...prevFolders, newFolder]);
//   };

//   const addNewFile = (fileData) => {
//     setFileList((prevFiles) => [...prevFiles, fileData]);
//   };

//   const goBackToDefaultLayout = () => {
//     setFolderId(null); // Reset folderId to null
//     setParentFolderId(0); // Reset parentFolderId to default
//     navigate("/files"); // Navigate to default dashboard view
//   };

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   return (
//     <div className="flex flex-row h-screen">
//       {/* Left Sidebar (Side Navbar) */}
//       <div className="flex flex-col border-r-2 w-[18%]">
//         <ParentFolderIdContext.Provider value={{ parentFolderId, setParentFolderId }}>
//           <ShowToastProvider>
//             {/* Side Navbar */}
//             <SideNavbar addNewFolder={addNewFolder} addNewFile={addNewFile} />
  
//             {/* Content area */}
//             <div className="flex-1 p-2 overflow-auto">
//               {/* Conditional rendering based on whether the user is viewing a folder */}
//               {!folderid ? (
//                 <div className="flex flex-col space-y-6 w-full">
//                   <div className="bg-blue-50 p-2 rounded-md shadow-md mt-5">
//                     <div className="text-lg font-semibold">Folders</div>
//                     <FolderList folders={folders} onFolderClick={handleFolderClick} />
//                   </div>
  
//                   <div className="bg-white p-2 rounded-md shadow-md mt-5">
//                     <div className="text-lg font-semibold">Files</div>
//                     <FileList fileList={fileList} />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col w-full h-full">
//                   <div className="flex flex-row flex-grow">
//                     <div className="flex-[0.8] p-5 bg-blue-50">
//                       <FolderDetails folderId={folderid} />
//                     </div>
//                   </div>
  
//                   <button
//                     onClick={goBackToDefaultLayout}
//                     className="btn btn-secondary mt-auto mb-5"
//                   >
//                     Go Back to Default Layout
//                   </button>
//                 </div>
//               )}
  
//               {showToast && <Toast msg={showToast} />}
//             </div>
//           </ShowToastProvider>
//         </ParentFolderIdContext.Provider>
//       </div>
  
//       {/* Right Section: CodeBoard Editor */}
//       <div className="flex-1 p-0 bg-gray-100">
//         <ForAuthUsers  /> {/* Ensure the editor has space to render */}
//       </div>
//     </div>
//   );
  
// };

// export default Dashboard;









