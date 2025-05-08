import React, { useState } from "react";
import { Smile } from 'lucide-react';
import { Paperclip } from 'lucide-react';
import { ArrowUp } from 'lucide-react';

const ChatFooter = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
    const [file, setFile] = useState(null);

    const emojiList = ['😊', '😂', '❤️', '👍', '🙏', '😎', '🥺', '😍', '🥰', '😜', '🤩', '😇', '🤔', '😅']; // Example emojis

    // Handle message input change
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    // Handle form submission (Enter key or send button)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message, file); // Pass message and file to parent (ChatBody)
            setMessage(""); // Clear input after sending
            setFile(null);  // Clear file after sending
        }
    };

    // Handle "Enter" key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e); // Submit message on "Enter" key
        }
    };

    // Toggle emoji picker visibility
    const toggleEmojiPicker = () => {
        setIsEmojiPickerVisible(prev => !prev);
    };

    // Handle emoji selection
    const handleEmojiSelect = (emoji) => {
        setMessage(prevMessage => prevMessage + emoji);
        setIsEmojiPickerVisible(false); // Close picker after selecting emoji
    };

    // Handle file selection
    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <div className="p-2 bg-white border-t border-gray-200 relative">
            <form onSubmit={handleSubmit} className="flex items-center gap-1">
                {/* Textarea */}
                <textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>

                {/* Action buttons */}
                <div className="flex items-center gap-1">
                    <button 
                        type="button" 
                        className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
                        onClick={toggleEmojiPicker}
                    >
                        <Smile className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Paperclip button that opens the file explorer */}
                    <button 
                        type="button" 
                        className="p-2 rounded-full hover:bg-gray-200 transition duration-200 relative"
                    >
                        <Paperclip className="w-6 h-6 text-gray-600" />
                        <input 
                            type="file" 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileSelect}
                        />
                    </button>

                    <button 
                        type="submit" 
                        className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-800 transition duration-200"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </button>
                </div>
            </form>

            {/* Emoji Picker */}
            {isEmojiPickerVisible && (
                <div className="absolute bg-white border rounded-lg shadow-lg w-full mt-2 max-h-40 overflow-y-auto">
                    <div className="grid grid-cols-7 gap-2 p-2">
                        {emojiList.map((emoji, index) => (
                            <button 
                                key={index}
                                onClick={() => handleEmojiSelect(emoji)}
                                className="text-2xl"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Display selected file */}
            {file && (
                <div className="mt-2 text-gray-600">
                    <div className="flex items-center gap-2">
                        <span>Selected file: {file.name}</span>
                        {/* If file is an image, show a preview */}
                        {file.type.startsWith('image') && (
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatFooter;
