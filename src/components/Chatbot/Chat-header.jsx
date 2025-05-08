import React from "react";
import { BotMessageSquare } from 'lucide-react';
import ChatBody from "./Chat-Body";
import { ChevronDown } from 'lucide-react';
import { useState } from "react";

const ChatHeader = ({closeChat}) => {
    const [isBotOpen, setIsBotOpen] = useState(true);

    const toggleChatVisibility = () => {
        setIsBotOpen(!isChatOpen);
    };

    return (
        <div className="flex justify-between h-13 items-center p-4 bg-gradient-to-r from-purple-600 to-purple-900 text-white rounded-t-lg shadow-lg">
            <div className="flex items-center gap-1">
                <BotMessageSquare className="w-8 h-8 text-white" />
                <span className="text-xl font-semibold">AI Assistance</span>
            </div>

            <button 
                className="p-2 rounded-full hover:bg-blue-700 transition duration-200"
                aria-label="Toggle Chat Options"
                // onClick={toggleChatVisibility}
                onClick={closeChat}
            >
                <ChevronDown className="w-6 h-6 text-white" />
            </button>

        </div>
    );
};

export default ChatHeader;

