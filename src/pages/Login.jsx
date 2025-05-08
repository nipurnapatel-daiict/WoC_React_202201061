import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence, 
  browserSessionPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // state for Remember Me checkbox

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Email validation checks
  const validateEmail = (email) => {
    // Check if email starts with a number
    const startsWithNumber = /^[0-9]/.test(email);
    if (startsWithNumber) {
      return "Email cannot start with a number.";
    }

    // Check if email contains special characters other than @ and .
    const hasSpecialChars = /[^a-zA-Z0-9@.]/.test(email);
    if (hasSpecialChars) {
      return "Email cannot contain special characters (except @ and .).";
    }

    // Check if it's a valid email format
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
      return "Please enter a valid email.";
    }

    return "";
  };

  // Password validation (at least 6 characters)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle submit (with validation)
  const handleSubmit = () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    setError(""); // Clear errors if validation is successful
    signInWithEmail();
  };

  // Set session persistence based on Remember Me state
  const setSessionPersistence = () => {
    const persistenceType = rememberMe
      ? browserLocalPersistence // If Remember Me is checked, set persistence to local
      : browserSessionPersistence; // If not, set persistence to session

    setPersistence(auth, persistenceType)
      .then(() => {
        console.log(`Session Persistence is set to ${rememberMe ? 'local' : 'session'}`);
      })
      .catch((error) => {
        console.error("Error setting session persistence:", error);
      });
  };
  
  // Sign in with email and password
  const signInWithEmail = async () => {
    setAuthing(true);
    setError("");
    setSessionPersistence();

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate("/files"); // Redirect to dashboard
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setAuthing(true);
    setSessionPersistence();
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/files");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      signInWithEmail();
    }
  };
  // Toggle password visibility
  //const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#EDF2F7]">
      <div className="flex w-full max-w-screen-lg h-[90vh] bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 flex items-center justify-center bg-[#2D3748]">
          <div className="text-white text-4xl font-semibold max-w-[70%] text-center p-8">
            <p>
              Welcome back to the most dynamic coding community! Create, code,
              and collaborate effortlessly.
            </p>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#4A90E2] mb-6">
              Log In to Your Account
            </h2>

            <div className="space-y-6">
              {/* Email Input */}
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="emailHelp"
                aria-required="true"
              />
              {/* Password Input */}
              {/* <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-10 text-sm text-[#4A90E2]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div> */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-[#4A90E2]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>


              {/* Error message */}
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                disabled={authing}
                className="w-full py-3 bg-[#4A90E2] text-white font-semibold rounded-lg shadow-lg hover:bg-[#357ABD] transition duration-300 transform hover:scale-105"
              >
                {authing ? "Logging In..." : "Log In with Email"}
              </button>

              {/* "Or" divider */}
              <div className="text-center py-2">
                <span className="text-gray-500">or</span>
              </div>

              {/* Google Login Button */}
              <button
                onClick={signInWithGoogle}
                disabled={authing}
                className="w-full py-3 bg-white text-[#4A90E2] font-semibold rounded-lg shadow-lg border-2 border-[#4A90E2] hover:bg-[#E3F2FD] transition duration-300 transform hover:scale-105"
              >
                {authing ? "Logging In..." : "Log In with Google"}
              </button>

              {/* Forgot password link */}
              <div className="mt-4 text-center">
                <a
                  href="/forgot-password"
                  className="text-sm text-gray-500 hover:text-[#4A90E2] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Remember Me Checkbox */}
              <div className="mt-4 flex items-center justify-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-500">
                  Remember Me
                </label>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Don’t have an account?{" "}
                  <a
                    href="/signup"
                    className="text-[#4A90E2] font-semibold hover:underline"
                  >
                    Sign Up
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

export default Login;
