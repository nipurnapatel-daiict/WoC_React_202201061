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

  const signUpWithEmail = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setAuthing(true);
    setError("");

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


