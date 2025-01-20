import React from "react";
import { navItems } from "../constants";
import {Menu, X} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [mobileScreen, setMobileScreen] = useState(false);
    const toggleNav = () => {
        setMobileScreen(!mobileScreen);
    }

    return (
        <nav className="sticky top-0 z-50 py-3 backdop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <span className="text-xl tracking-widest">ThinkBoard</span>
                    </div>

                    <ul className="hidden lg:flex ml-14 space-x-12">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <a href="#" className="py-2 px-3 border rounded-md">
                            Sign In
                        </a>
                        <a href="#" className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md">
                            Explore for free
                        </a>
                    </div>

                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNav}>
                            {mobileScreen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobileScreen && (
                    <div className="fixed right-0 z-20 bg-neutral-980 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={index} className="py-4">
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex space-x-6">
                            <a href="#" className="py-2 px-3 border rounded-md"> Sign In</a>
                            <a href="#" className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800">
                                Explore
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;