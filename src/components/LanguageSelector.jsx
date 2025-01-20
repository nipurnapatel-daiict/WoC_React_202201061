import React, { useEffect, useRef, useState } from "react";
import { supported_languages } from "../constants";
import { ChevronDown } from 'lucide-react';

import { language_extension } from "../constants";

const ACTIVE_COLOR = "text-blue-400";

const LanguageSelector = ({ language, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside); // for mouse clicks
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative ml-1 mb-1">
            {/* <span className="mb-2 text-lg">Language: </span> */}

            <button
                ref={buttonRef}
                className="flex items-center bg-gray-600 hover:bg-gray-800 text-white px-2 py-2 rounded-md focus:outline-none"
                onClick={toggleDropdown}
            >
                {language}
                <ChevronDown />
            </button>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 w-full bg-[#110c1b] rounded-md shadow-lg z-10"
                >
                    {supported_languages.map((lang) => (
                        <div
                            key={lang}
                            className={`px-1 py-1 text-white cursor-pointer ${
                                lang === language
                                    ? `${ACTIVE_COLOR} bg-gray-900`
                                    : "text-gray-300 hover:bg-gray-700"
                            }`}
                            onClick={() => {
                                onSelect(lang);
                                setIsOpen(false);
                            }}
                        >
                            {lang}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
