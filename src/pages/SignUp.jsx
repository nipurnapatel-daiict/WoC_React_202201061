// import React, { useState, useEffect } from "react";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const auth = getAuth();
//   const navigate = useNavigate();

//   const [authing, setAuthing] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [typedText, setTypedText] = useState("");
//   const [index, setIndex] = useState(0);

//   const typingEffectText =
//     "Join the most dynamic coding community! Create, code, and collaborate effortlessly.";


//     const validateEmail = (email) => {
//       // Check if email starts with a number
//       const startsWithNumber = /^[0-9]/.test(email);
//       if (startsWithNumber) {
//         return "Email cannot start with a number.";
//       }
  
//       // Check if email contains special characters other than @ and .
//       const hasSpecialChars = /[^a-zA-Z0-9@.]/.test(email);
//       if (hasSpecialChars) {
//         return "Email cannot contain special characters (except @ and .).";
//       }
  
//       // Check if it's a valid email format
//       const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//       if (!regex.test(email)) {
//         return "Please enter a valid email.";
//       }
  
//       return "";
//     };


//     const validatePassword = (password) => {
//       return password.length >= 6;
//     };

//   const signUpWithGoogle = async () => {
//     setAuthing(true);

//     signInWithPopup(auth, new GoogleAuthProvider())
//       .then((response) => {
//         console.log(response.user.uid);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.log(error);
//         setAuthing(false);
//       });
//   };

//   const signUpWithEmail = async () => {
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setAuthing(true);
//     setError("");

//     createUserWithEmailAndPassword(auth, email, password)
//       .then((response) => {
//         console.log(response.user.uid);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.log(error);
//         setError(error.message);
//         setAuthing(false);
//       });
//   };

//   // Typing Effect with Loop
//   useEffect(() => {
//     if (index < typingEffectText.length) {
//       const timeoutId = setTimeout(() => {
//         setTypedText(typedText + typingEffectText[index]);
//         setIndex(index + 1);
//       }, 100);
//       return () => clearTimeout(timeoutId);
//     } else {
//       // Reset typing effect
//       const resetTimeout = setTimeout(() => {
//         setTypedText("");
//         setIndex(0);
//       }, 2000); // Pause for 2 seconds before restarting
//       return () => clearTimeout(resetTimeout);
//     }
//   }, [typedText, index]);

//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-[#EDF2F7]">
//       {/* Main Container */}
//       <div className="flex w-full max-w-screen-lg h-[90vh] bg-white shadow-lg rounded-lg overflow-hidden">
//         {/* Left Side (Typing Animation) */}
//         <div className="w-1/2 flex items-center justify-center bg-[#2D3748]">
//           <div className="text-white text-4xl font-semibold max-w-[70%] text-center p-8">
//             <p>{typedText}</p>
//           </div>
//         </div>

//         {/* Right Side (Sign-Up Form) */}
//         <div className="w-1/2 flex items-center justify-center p-8">
//           <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
//             <h2 className="text-4xl font-bold text-center text-[#4A90E2] mb-6">
//               Create Your Account
//             </h2>

//             <div className="space-y-6">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />

//               {error && (
//                 <p className="text-red-500 text-center mt-2">{error}</p>
//               )}

//               <button
//                 onClick={signUpWithEmail}
//                 disabled={authing}
//                 className="w-full py-3 bg-[#4A90E2] text-white font-semibold rounded-lg shadow-lg hover:bg-[#357ABD] transition duration-300 transform hover:scale-105"
//               >
//                 {authing ? "Signing Up..." : "Sign Up with Email"}
//               </button>

//               <div className="text-center py-4">
//                 <span className="text-gray-500">or</span>
//               </div>

//               <button
//                 onClick={signUpWithGoogle}
//                 disabled={authing}
//                 className="w-full py-3 bg-white text-[#4A90E2] font-semibold rounded-lg shadow-lg border-2 border-[#4A90E2] hover:bg-[#E3F2FD] transition duration-300 transform hover:scale-105"
//               >
//                 {authing ? "Signing Up..." : "Sign Up with Google"}
//               </button>

//               <div className="mt-6 text-center">
//                 <p className="text-sm text-gray-500">
//                   Already have an account?{" "}
//                   <a
//                     href="/login"
//                     className="text-[#4A90E2] font-semibold hover:underline"
//                   >
//                     Log In
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  const typingEffectText =
    "Join the most dynamic coding community! Create, code, and collaborate effortlessly.";

  // Validate Email
  const validateEmail = (email) => {
    const startsWithNumber = /^[0-9]/.test(email);
    if (startsWithNumber) {
      return "Email cannot start with a number.";
    }

    const hasSpecialChars = /[^a-zA-Z0-9@.]/.test(email);
    if (hasSpecialChars) {
      return "Email cannot contain special characters (except @ and .).";
    }

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
      return "Please enter a valid email.";
    }

    return "";
  };

  // Validate Password
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  // Check Password Match
  const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  // Handle Google Sign-Up
  const signUpWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  // Handle Email Sign-Up
  const signUpWithEmail = async () => {
    // Validate form inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const passwordMatchError = validatePasswordMatch(password, confirmPassword);

    if (emailError || passwordError || passwordMatchError) {
      setError(emailError || passwordError || passwordMatchError);
      return;
    }

    setAuthing(true);
    setError(""); // Clear any previous errors

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      signUpWithEmail();
    }
  };
  
  // Typing Effect with Loop
  useEffect(() => {
    if (index < typingEffectText.length) {
      const timeoutId = setTimeout(() => {
        setTypedText(typedText + typingEffectText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      // Reset typing effect
      const resetTimeout = setTimeout(() => {
        setTypedText("");
        setIndex(0);
      }, 2000); // Pause for 2 seconds before restarting
      return () => clearTimeout(resetTimeout);
    }
  }, [typedText, index]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#EDF2F7]">
      {/* Main Container */}
      <div className="flex w-full max-w-screen-lg h-[90vh] bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side (Typing Animation) */}
        <div className="w-1/2 flex items-center justify-center bg-[#2D3748]">
          <div className="text-white text-4xl font-semibold max-w-[70%] text-center p-8">
            <p>{typedText}</p>
          </div>
        </div>

        {/* Right Side (Sign-Up Form) */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-4xl font-bold text-center text-[#4A90E2] mb-6">
              Create Your Account
            </h2>

            <div className="space-y-6">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyPress}
              />

              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}

              <button
                onClick={signUpWithEmail}
                disabled={authing}
                className="w-full py-3 bg-[#4A90E2] text-white font-semibold rounded-lg shadow-lg hover:bg-[#357ABD] transition duration-300 transform hover:scale-105"
              >
                {authing ? "Signing Up..." : "Sign Up with Email"}
              </button>

              <div className="text-center py-4">
                <span className="text-gray-500">or</span>
              </div>

              <button
                onClick={signUpWithGoogle}
                disabled={authing}
                className="w-full py-3 bg-white text-[#4A90E2] font-semibold rounded-lg shadow-lg border-2 border-[#4A90E2] hover:bg-[#E3F2FD] transition duration-300 transform hover:scale-105"
              >
                {authing ? "Signing Up..." : "Sign Up with Google"}
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-[#4A90E2] font-semibold hover:underline"
                  >
                    Log In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

