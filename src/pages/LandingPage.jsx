import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Footer from "../components/Footer";

const LandingPage = () => {
    return (
        <div>
          <Navbar/>
          <div>
            <HeroSection />
            <Features />
          </div>
          <Footer />
        </div>
    );
}

export default LandingPage;