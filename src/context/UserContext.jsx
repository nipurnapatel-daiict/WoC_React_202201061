// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Create the UserContext
export const UserContext = createContext();

// Create the useUser hook
export const useUser = () => {
  return useContext(UserContext); // Custom hook to use user context
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const auth = getAuth();
    
    // Set persistence for the session
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Listen to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user); // User is logged in
            console.log("User is logged in:", user.email); // Log user email
          } else {
            setUser(null); // User is logged out
            console.log("User is logged out");
          }
          setLoading(false); // Set loading to false once state is resolved
        });

        // Clean up the listener when component unmounts
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error('Persistence Error:', error.message);
        setLoading(false); // Set loading to false even on error
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};







// import { createContext, useContext, useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from "../App";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const auth = getAuth(app);
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         setUser(firebaseUser); // Set the Firebase user object
//       } else {
//         setUser(null); // No user is logged in
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserContext.Provider value={user}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   return useContext(UserContext); // Access user context
// };


