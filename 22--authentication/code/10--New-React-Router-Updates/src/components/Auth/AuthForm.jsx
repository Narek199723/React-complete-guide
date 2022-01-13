import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/store/authContext";
import Spinner from "../Spinner";

import classes from "./AuthForm.module.css";

const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaZj9gOygJpg6gzW7zer9ScQHJIuXJFrs`;
const signUpUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaZj9gOygJpg6gzW7zer9ScQHJIuXJFrs";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const onAuthHandler = async (url, email, password) => {
        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            if (!data.email) {
                toast.error(data.error?.message);
                return;
            }
            toast.success("Authentication succeeded");
            return data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        let userData;
        if (isLogin) {
            userData = await onAuthHandler(
                signInUrl,
                enteredEmail,
                enteredPassword
            );
        } else {
            userData = await onAuthHandler(
                signUpUrl,
                enteredEmail,
                enteredPassword
            );
        }
        const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
        );
        login(userData.idToken, expirationTime.toISOString());
        navigate("/");
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <button>{isLogin ? "Login" : "Create Account"}</button>
                    )}

                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
