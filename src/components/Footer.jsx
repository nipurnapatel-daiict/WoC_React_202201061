import React from "react";
import { Copyright } from 'lucide-react';
import { FooterItems } from "../constants";

const Footer = () => {
    return (
        <footer className=" bg-neutral-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center mb-6">
                    <h3 className="flex items-center space-x-2 text-center">
                        <Copyright className="text-sm" />
                        <span>2024 CodeBoard IDE. Elevate your coding experience.</span>
                    </h3>
                </div>

                <div className="flex justify-center space-x-8">
                    <ul className="flex space-x-6">
                        {FooterItems.map((item, index) => (
                            <li key={index} className="py-2">
                                <a href={item.href} className="hover:text-orange-500">{item.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;