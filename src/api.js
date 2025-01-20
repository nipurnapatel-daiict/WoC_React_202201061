// import axios from "axios";
// import { LANGUAGE_VERSIONS } from "./constants";

// const API = axios.create({
//     baseURL : "https://emkc.org/api/v2/piston"
// })

// export const executeCode  = async (language, sourceCode) => {
//     console.log("sending request with lan: ", language);

//     const response = await API.post("execute", {
//         "language": language,
//         "version": LANGUAGE_VERSIONS[language],
//         "files": [
//             {
//                 content : sourceCode,
//             },
//         ],
//     });
//     console.log("API response : ", response);
//     return response.data;
// }

import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
    baseURL : "https://emkc.org/api/v2/piston"
});

export const executeCode = async (language, sourceCode, input) => {
    console.log("Sending request with language:", language);
    console.log("Input Data:", input); // Log the input data to check it

    const response = await API.post("execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
            {
                content: sourceCode,
            },
        ],
        stdin: input,  // Pass the input data here
    });

    console.log("API response:", response);
    return response.data;
};

