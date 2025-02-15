import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import woc_medium from "../assets/woc_medium.mp4";
import Aos from "aos";

const HeroSection = () => {
  const navigate = useNavigate();  // Initialize the navigate function here

  // Inline styles for animations
  const gradientAnimation = `
    @keyframes bg-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  const particleAnimation = `
    @keyframes particle-float {
      0% { transform: translateY(0); opacity: 0.7; }
      50% { opacity: 1; }
      100% { transform: translateY(-100vh); opacity: 0.7; }
    }
  `;

  useEffect(() => {
    Aos.init({
      duration: 2000, // Animation duration
      easing: "ease-in-out", // Smooth and elegant easing
      once: true, // Animation triggers only once
    });
  }, []);

  const handleExploreFreeClick = () => {
    navigate("/code-editor");
  };

  const handleSignupClick = () => {
    navigate('/signup');
  }

  return (
    <div className="relative flex flex-col items-center py-16 lg:py-24 text-white overflow-hidden">
      {/* Inline styles for animations */}
      <style>
        {gradientAnimation}
        {particleAnimation}
      </style>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 bg-black">
        {/* Moving Gradient Waves */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-700 via-indigo-800 to-black opacity-50"
          style={{
            animation: "bg-flow 10s infinite alternate linear",
            backgroundSize: "200%",
          }}
        ></div>

        {/* Particle Animation */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-white rounded-full opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `particle-float ${Math.random() * 5 + 3}s infinite linear`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-center leading-tight z-10">
        Design, Create, and
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
          {" "}Code <br /> Endlessly
        </span>
      </h1>

      {/* Subheading */}
      <p className="mt-8 text-lg sm:text-xl lg:text-2xl text-center text-neutral-300 max-w-3xl leading-relaxed z-10">
        Unlock your creative potential with creativity and innovation. Transform your visionary ideas into reality with elegance and precision.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex justify-center mt-10 space-x-6 z-10">
        <a
          // href="#"
          onClick={handleExploreFreeClick}
          className="py-3 px-6 bg-gradient-to-r cursor-pointer from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300"
        >
          Explore for Free
        </a>
        <a
          onClick={handleSignupClick}
          // href="#"
          className="py-3 px-6 bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300"
        >
          Sign Up for Free
        </a>
      </div>

      {/* Decorative Section Divider */}
      <div className="mt-16 max-w-md flex justify-center"
          data-aos = "zoom-in-up"
          data-aos-delay = "500" 
        >
        <div className="w-2/3 h-1 bg-gradient-to-r from-yellow-400 via-indigo-500 to-purple-600 rounded-full"></div>
      </div>

      <div className="flex mt-10 justify-center">
            <video 
              autoPlay 
              loop 
              muted 
              className="rounded-lg w-4/5 md:w-3/4 lg:w-2/3 border border-purple-500 shadow-purple-400 mx-2 my-4" 
            >
              <source src={woc_medium} type="video/mp4"/>
                Your browser does not support the video tag!
            </video>
      </div>

    </div>
    
  );
};

export default HeroSection;
