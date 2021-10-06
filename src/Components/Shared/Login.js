import React, { useRef, useState } from "react";
import axios from "axios";
import Carousel from "../Carousels/Carousel";
import Logo from "./Logo";

export default function Login({
    setUserData,
    setUserHeaders,
    setDisplayLoading,
    setMessage,
    setSuccess,
    setError,
}) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [Login, setLogin] = useState(true);
    const [KeepMeLoggedIn, setKeepMeLoggedIn] = useState(false);

    return (
        <div className="Login">
            <div className="LoginLeft">
                <Carousel />
            </div>
            <div className="LoginRight">
                <Logo />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const email = emailRef.current.value;
                        const password = passwordRef.current.value;

                        let data;
                        let config;

                        if (Login) {
                            data = {
                                email,
                                password,
                            };

                            config = {
                                method: "post",
                                url: "auth/sign_in",
                                data: data,
                            };
                        } else {
                            data = {
                                email,
                                password,
                                password_confirmation:
                                    confirmPasswordRef.current.value,
                            };

                            config = {
                                method: "post",
                                url: "auth",
                                data: data,
                            };
                        }

                        axios(config)
                            .then((response) => {
                                if (Login) {
                                    emailRef.current.value = null;
                                    passwordRef.current.value = null;
                                    setKeepMeLoggedIn(false);
                                    setDisplayLoading(true);
                                    setTimeout(() => {
                                        setDisplayLoading(false);
                                    }, 3300);
                                    setUserData(response?.data?.data);
                                    setUserHeaders(response?.headers);
                                    setError(null);
                                    setMessage(null);
                                    setSuccess("Successful login");
                                    setTimeout(() => {
                                        setSuccess(null);
                                    }, 2000);
                                    if (KeepMeLoggedIn) {
                                        localStorage.email = email;
                                        localStorage.password = password;
                                    }
                                } else {
                                    emailRef.current.value = null;
                                    passwordRef.current.value = null;
                                    confirmPasswordRef.current.value = null;
                                    setLogin(true);
                                    setError(null);
                                    setMessage(null);
                                    setSuccess("Successful signup");
                                    setTimeout(() => {
                                        setSuccess(null);
                                    }, 2000);
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                setMessage(null);
                                setSuccess(null);
                                setError("Error");
                                setTimeout(() => {
                                    setError(null);
                                }, 2000);
                            });
                    }}
                >
                    <label>
                        <div>Email</div>
                        <input
                            type="email"
                            ref={emailRef}
                            placeholder="jason@bubble.com"
                        />
                    </label>

                    <br />

                    <label>
                        <div>Password</div>
                        <input
                            type="password"
                            ref={passwordRef}
                            placeholder="bubble123"
                        />
                    </label>

                    {Login ? (
                        <>
                            <br />
                            <div className="KeepMeLoggedInCheckboxContainer">
                                <input
                                    type="checkbox"
                                    className="KeepMeLoggedInCheckbox"
                                    id="KeepMeLoggedInCheckbox"
                                    checked={KeepMeLoggedIn}
                                    onChange={() =>
                                        setKeepMeLoggedIn(!KeepMeLoggedIn)
                                    }
                                />
                                <label
                                    className="KeepMeLoggedInLabel"
                                    for="KeepMeLoggedInCheckbox"
                                >
                                    Keep me logged in
                                </label>
                            </div>
                        </>
                    ) : (
                        <>
                            <br />
                            <label>
                                <div>Confirm password</div>
                                <input
                                    type="password"
                                    ref={confirmPasswordRef}
                                    placeholder="bubble123"
                                />
                            </label>
                        </>
                    )}

                    <br />
                    <br />

                    <div>
                        <button>{Login ? "Log in" : "Sign up"}</button>
                    </div>
                </form>

                <br />

                <div>
                    <span className="HaveAnAccount">
                        {Login
                            ? "Don't have an account? "
                            : "Already have an account? "}
                    </span>
                    <span
                        className="SignupLoginHere"
                        onClick={() => {
                            if (Login) {
                                emailRef.current.value = null;
                                passwordRef.current.value = null;
                            } else {
                                emailRef.current.value = null;
                                passwordRef.current.value = null;
                                confirmPasswordRef.current.value = null;
                            }
                            setLogin(!Login);
                        }}
                    >
                        {Login ? "Sign up here" : "Log in here"}
                    </span>
                </div>
            </div>
        </div>
    );
}
