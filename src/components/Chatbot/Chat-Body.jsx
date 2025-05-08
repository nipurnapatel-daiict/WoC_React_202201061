import React, { useState } from "react";
import { BotMessageSquare } from "lucide-react";

const ChatBody = ({ messages }) => {

    return (
        <div className="flex-1 p-4 overflow-auto bg-gray-100">
            {/* Render initial greeting message (AI's first message) */}
           
                <div className="flex items-start gap-1 mb-2">
                    <BotMessageSquare className="w-5 h-5 text-purple-500" />
                    <div className="bg-purple-500 text-white p-1 rounded-lg max-w-[75%]">
                        Hey there 👋 <br />How can I help you?
                    </div>
                </div>
            

            {/* Render user and bot messages */}
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-2`}
                >
                    {msg.isUser ? (
                        <div className="p-3 rounded-lg bg-purple-500 text-white">
                            {msg.text}
                        </div>
                    ) : (
                        // For bot messages, render with the same format as the initial greeting
                        <div className="flex items-start gap-1 mb-2">
                            <BotMessageSquare className="w-5 h-5 text-purple-500" />
                            <div className="bg-gray-300 text-gray-800 p-1 rounded-lg max-w-[75%]">
                                {msg.text}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatBody;

