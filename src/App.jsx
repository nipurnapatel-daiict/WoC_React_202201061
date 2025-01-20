import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CodeEditor from "./pages/CodeEditor";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthRoute from "./components/AuthRoute";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBnMN6zvDB5SBaB9ajB3ELxuZnpJzL1k3A",
  authDomain: "authentication-135c9.firebaseapp.com",
  projectId: "authentication-135c9",
  storageBucket: "authentication-135c9.firebasestorage.app",
  messagingSenderId: "23136390890",
  appId: "1:23136390890:web:21bb4047f7667e52315193"
};
initializeApp(firebaseConfig);

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element= {<LandingPage/>} />
          <Route path="/code-editor" element={<CodeEditor />} />
          <Route path="/login" element={<AuthRoute> <Login /> </AuthRoute>} />
          <Route path ="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    );
}

export default App;
// import React from "react";
// import Navbar from "./components/Navbar";
// import HeroSection from "./components/HeroSection";
// import Features from "./components/Features";
// import Footer from "./components/Footer";

// const App = () => {
//   return (
//     <div>
//       <Navbar/>
//       <div className="max-w-7xl mx-auto pt-20 px-6">
//         <HeroSection />
//         <Features />
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default App;