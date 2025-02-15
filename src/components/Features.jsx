import React, { useEffect, useRef } from "react";
import { FeatureItems } from "../constants";

const Features = () => {
  const featureRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            entry.target.style.opacity = "1"; // Ensure visibility when animating
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px 50px 0px", // Slightly adjust to ensure trigger happens before element reaches viewport
      }
    );

    // Observe each feature card
    featureRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect(); // Clean up observer
  }, []);

  return (
    <div className="relative py-20 px-6 lg:px-12 overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-700 via-indigo-800 to-black opacity-30"
        style={{
          animation: "bg-flow 10s infinite alternate linear",
          backgroundSize: "200%",
        }}
      ></div>

      <div className="text-center mb-12">
        <h2
          className="text-4xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text uppercase"
          style={{ opacity: 0 }} // Initial opacity to hide before animation
          ref={(el) => (featureRefs.current[0] = el)}
        >
          Why Choose Us?
        </h2>
        <p
          className="mt-4 text-lg sm:text-xl lg:text-2xl text-neutral-100 max-w-2xl mx-auto leading-relaxed"
          style={{ opacity: 0 }}
          ref={(el) => (featureRefs.current[1] = el)}
        >
          Discover the unique features that make our platform the perfect choice
          for your coding journey.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FeatureItems.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center border border-neutral-300 rounded-lg bg-white shadow-lg p-6 transition-all transform group"
            style={{ opacity: 0 }}
            ref={(el) => (featureRefs.current[index + 2] = el)} // Index offset for heading and paragraph
          >
            {/* Icon */}
            <div className="flex h-16 w-16 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white justify-center items-center rounded-full mb-5 shadow-md group-hover:scale-110 transition-all">
              {feature.icon}
            </div>
            {/* Title */}
            <h5 className="text-lg font-semibold text-neutral-800 mb-3 text-center group-hover:text-yellow-500 transition-colors duration-300">
              {feature.text}
            </h5>
            {/* Description */}
            <p className="text-sm text-neutral-600 text-center group-hover:text-neutral-500 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Inline Keyframes for Animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Features;
