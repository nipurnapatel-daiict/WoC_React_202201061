import React, { useState } from "react";
import ChatHeader from "./Chat-header.jsx";
import ChatBody from "./Chat-Body.jsx";
import ChatFooter from "./ChatFooter.jsx";

const API_KEY = "AIzaSyBfvcj8avJsmUrLaUHYlef-9wxlfY-HUQM";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

const Chatbot = ({closeChat}) => {
    const [messages, setMessages] = useState([]); // Store messages

    const generateBotResponse = async(message) => {
        console.log("at 17", message);
        const requestOptions = {
            method : "POST",
            headers : {"Content-type": "application/json"},
            body : JSON.stringify({
                // contents: [{text : userData.messages}]
                contents : [{
                    parts : [{text : message}]
                }]
            })
        }

        try{
            const respose = await fetch(API_URL, requestOptions);
            const data = await respose.json();
            if(!respose.ok) throw new Error(data.error.message);
            
            //const botReply = data?.contents?.[0]?.parts?.[0]?.text || "Sorry, I didn't understand that.";
            const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            setMessages((prevMessages) =>[
                ...prevMessages,
                {text : botReply}
            ])
            console.log(data);
        } catch(error) {
            console.log(error);
                    setMessages((prevMessages) => [
            ...prevMessages,
            { text: "Sorry, there was an error.", isUser: false }
        ]);

        }
    }

    // Function to handle sending a new message
    const handleSendMessage = async (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, isUser: true }
        ]); 
    
        await generateBotResponse(message); 
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[400px] h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
                {/* Chat Header */}
                <ChatHeader closeChat={closeChat}/>

                {/* Chat Body */}
                <ChatBody messages={messages} />

                {/* Chat Footer */}
                <ChatFooter onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default Chatbot;
