import { SquareTerminal } from 'lucide-react';
import { Brush } from 'lucide-react';
import { CirclePlay } from 'lucide-react';
import { CloudUpload } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Search } from 'lucide-react';
import { User } from 'lucide-react';
import { Terminal } from 'lucide-react';
import { MessageSquareText } from 'lucide-react';

// import { javascript } from '@codemirror/lang-javascript';
// import { python } from '@codemirror/lang-python';
// import { cpp } from '@codemirror/lang-cpp';
// import { oneDark } from '@codemirror/theme-one-dark';

// import * as monaco from "monaco-editor";

export const navItems = [
    {label: "Features", href : "#"},
    {label : "Workflow", href: "#"},
    {label : "About", href: "#"},
];

export const FeatureItems = [
    {
        icon : <SquareTerminal />,
        text : "Run any programming language",
        description : 
            "Seamlessly execute code in over 10+ languages with blazing fast performance.",
    },
    {
        icon : <Brush />,
        text : "Multiple Themes",
        description : 
            "Choose from vibrant themes to create your perfect coding atmosphere." 
    },
    {
        icon : <CirclePlay />,
        text : "Advance code editor",
        description : 
            "Enjoy intilligent bracket matching, code wrapping and customizable setting."
    },
    {   
        icon : <CloudUpload />,
        text : "Flexible input options",
        description :
            "Upload files, drag and drop, or mannully input text with ease.",
    },
    {
        icon : <Settings />,
        text : "Customizable Workspace",
        description :
            "Organize your IDE with resizable file menu, terminal and editor sections.",
    },
    {
        icon : <Search />,
        text : "Enhanced Search Tools",
        description : 
            "Use advanced search, find and replace to navigate your code effortlessly.",
    },
    {
        icon : <User />,
        text : "Guest and Authenticated Access",
        description :
            "Explore as guest or unlock premium features as an authenticated user.",
    },
    {
        icon : <Terminal />,
        text : "Integrated Terminal",
        description : 
            "Run commands and debug your code within the browser.",
    },
    {
        icon : <MessageSquareText />,
        text : "AI Chatbot Support",
        description :
            "Chat with an AI powered assistant to recieve your coding doubts instantly.",
    },
];

export const FooterItems = [
    {label: "Terms", href : "#"},
    {label : "Privacy", href: "#"},
    {label : "Contact", href: "#"},
];

//<----------------------------code editor -------------------------------------->

export const supported_languages = ["javascript", "python", "cpp"];

export const supported_themes = ["light", "dark", "hc-black"];

export const file_extensions = [
    {javascript : ".js"},
    {python : ".py"},
    {cpp : ".cpp"}, 
];

export const language_extension = [
    {javascript: "18.15.0"},
    {python : "3.10.0"},
    {cpp : "cpp17"},
];

export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0", 
    python: "3.10.0",    
    cpp: "cpp17",            
};

export const theme_extension = [
    "light",
    "dark",
    "oneDark",
];

export const CODE_SNIPPETS = {
    javascript: `// JavaScript snippet\nconsole.log("Hello, World!");`,
    python: `# Python snippet\nprint("Hello, World!")`,
    cpp: `// C++ snippet\n#include <iostream>\nusing namespace std;\nint main() { cout << "Hello, World!"; return 0; }`
};
  