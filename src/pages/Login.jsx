import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    setAuthing(true);

    // Sign-in with Google
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

  const signInWithEmail = async () => {
    setAuthing(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        // navigate("/code-editor");
        navigate("/files");

      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#EDF2F7]">
      {/* Main Container */}
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
          <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-4xl font-bold text-center text-[#4A90E2] mb-6">
              Log In to Your Account
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

              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}

              <button
                onClick={signInWithEmail}
                disabled={authing}
                className="w-full py-3 bg-[#4A90E2] text-white font-semibold rounded-lg shadow-lg hover:bg-[#357ABD] transition duration-300 transform hover:scale-105"
              >
                {authing ? "Logging In..." : "Log In with Email"}
              </button>

              <div className="text-center py-4">
                <span className="text-gray-500">or</span>
              </div>

              <button
                onClick={signInWithGoogle}
                disabled={authing}
                className="w-full py-3 bg-white text-[#4A90E2] font-semibold rounded-lg shadow-lg border-2 border-[#4A90E2] hover:bg-[#E3F2FD] transition duration-300 transform hover:scale-105"
              >
                {authing ? "Logging In..." : "Log In with Google"}
              </button>

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
