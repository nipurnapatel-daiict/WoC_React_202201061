import React from "react";

const HeroSection = () =>{
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                Desing, create and  
                <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                   {" "} code <br /> endlessly
                </span> 
            </h1>

            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                Enter a world where your coding journey is defined by creativity, elegance, and endless possibilities. 
                Every line of code becomes a step towards bringing your most visionary ideas to life! 
            </p>
            <div className="flex justify-center my-10">
                <a href="#" className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md">Explore as guest</a>
                <a href="#" className="py-3 px-4 rounded-md border">Sign Up for free</a>
            </div>

        </div>
    );
}

export default HeroSection;