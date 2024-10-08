import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase"; 
import "./Login.css";

//simple login setup to allow for seperate user in db,
//sign up is simple for same purpose, would be more detailed in practice
//or make use of existing login/signup on Cushon page
const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            //add user to authentication db if not there already
            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    email: user.email,
                    investmentAmount: 0,
                });
            }

            setCurrentPage("getStarted");
        } catch (error) {
            setError("Failed to log in. Check credentials.");
            console.error("Login error:", error);
        }
    };

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                investmentAmount: 0,
            });

            setCurrentPage("getStarted");
        } catch (error) {
            setError("Failed to create account. Check credentials.");
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="title">Login to your account</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input"
            />
            <button onClick={handleLogin} className="button">Login &#8594;</button>
            <p className="signup-text" onClick={handleSignup}>Sign up</p>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;








