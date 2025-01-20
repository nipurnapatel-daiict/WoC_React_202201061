import react, { useState } from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInWithGoogle = async () => {
        setAuthing(true);
        
        //for sign-up with google
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate("/code-editor");

            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            })
    }

    const signInWithEmail = async () =>{
        setAuthing(true);
        setError("");

        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate("/code-editor")
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            })
    }

    return (
        <div className="w-full h-screen flex">
            {/* left half */}
            <div className="w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center">
            </div>


            {/* right half */}
            <div className="w-1/2 h-full bg-[#1a1a1a] flex flex-col p-20 justify-center">
                <div className="w-full flex flex-col max-w-[450px] mx-auto">
                    <div className='w-full flex flex-col mb-10 text-white'>
                        <h3 className='text-4xl font-bold mb-2'>Sign Up</h3>
                        <p className='text-lg mb-4'>Welcome! Please enter your information below to begin.</p>
                    </div>

                </div>

                <div className='w-full flex flex-col mb-6'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                </div>
            
                <div className='w-full flex flex-col mb-4'>
                        <button
                            onClick={signInWithEmail}
                            disabled={authing}
                            className='w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                            Log in With Email and Password
                        </button>
                </div>

                {error && <div className='text-red-500 mb-4'>{error}</div>}

                <div className='w-full flex items-center justify-center relative py-4'>
                    <div className='w-full h-[1px] bg-gray-500'></div>
                    <p className='text-lg absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
                </div>

                <button
                        onClick={signInWithGoogle}
                        disabled={authing}
                        className='w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-7'>
                        Log in With Google
                </button>

                <div className='w-full flex items-center justify-center mt-10'>
                    <p className='text-sm font-normal text-gray-400'>Don't have an account? <span className='font-semibold text-white cursor-pointer underline'><a href='/signup'>Sign Up</a></span></p>
                </div>
            </div>
        </div>
    )
}

export default Login;