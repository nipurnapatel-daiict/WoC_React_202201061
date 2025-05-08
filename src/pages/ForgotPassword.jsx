import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    // Send password reset email
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Error sending password reset email. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#EDF2F7]">
      <div className="flex w-full max-w-lg h-[70vh] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full flex items-center justify-center p-8">
          <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-4xl font-bold text-center text-[#4A90E2] mb-6">
              Reset Your Password
            </h2>

            <div className="space-y-6">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Displaying message or error */}
              {message && <p className="text-green-500 text-center mt-2">{message}</p>}
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}

              <button
                onClick={handlePasswordReset}
                disabled={loading}
                className="w-full py-3 bg-[#4A90E2] text-white font-semibold rounded-lg shadow-lg hover:bg-[#357ABD] transition duration-300 transform hover:scale-105"
              >
                {loading ? "Sending..." : "Send Password Reset Email"}
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Remembered your password?{" "}
                  <a
                    href="/login"
                    className="text-[#4A90E2] font-semibold hover:underline"
                  >
                    Go back to Login
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

export default ForgotPassword;
