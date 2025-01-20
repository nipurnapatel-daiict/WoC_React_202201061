import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const AuthRoute = (props) => {
    const { children } = props;
    const Auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(Auth, (user) => {
            if (user) {
                setLoading(false);

            } else {
                console.log("Unauthorized");
                setLoading(false);
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [Auth, navigate]);

    if (loading) return <p>Loading...</p>;  

    return <div>{children}</div>;
};

export default AuthRoute;
