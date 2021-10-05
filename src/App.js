import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "./Components/Toast";
import Loading from "./Components/Loading";
import Home from "./Components/Home";
import Login from "./Components/Login";

export default function App() {
    // axios.defaults.baseURL = "http://206.189.91.54/api/v1/";
    axios.defaults.baseURL = "https://slackapi.avionschool.com/api/v1";

    const [UserData, setUserData] = useState(null);
    const [UserHeaders, setUserHeaders] = useState(null);
    const [DisplayLoading, setDisplayLoading] = useState(true);

    const [Message, setMessage] = useState(null);
    const [Success, setSuccess] = useState(null);
    const [Error, setError] = useState(null);

    setTimeout(() => {
        setDisplayLoading(false);
    }, 3300);

    useEffect(() => {
        if (localStorage.email && localStorage.password) {
            const email = localStorage.email;
            const password = localStorage.password;

            const data = {
                email,
                password,
            };

            const config = {
                method: "post",
                url: "auth/sign_in",
                data: data,
            };

            axios(config)
                .then((response) => {
                    setUserData(response?.data?.data);
                    setUserHeaders(response?.headers);
                    setError(null);
                    setMessage(null);
                    setSuccess("Logging in");
                    setTimeout(() => {
                        setSuccess(null);
                    }, 2000);
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
        }
    }, []);

    return (
        <>
            {Message ? (
                <>
                    <Toast className="Message Toast" text={Message} />
                </>
            ) : null}
            {Success ? (
                <>
                    <Toast className="Success Toast" text={Success} />
                </>
            ) : null}
            {Error ? (
                <>
                    <Toast className="Error Toast" text={Error} />
                </>
            ) : null}
            {DisplayLoading ? (
                <>
                    <Loading />
                </>
            ) : null}

            {UserData && UserHeaders ? (
                <>
                    <Home
                        UserData={UserData}
                        UserHeaders={UserHeaders}
                        setUserData={(i) => setUserData(i)}
                        setUserHeaders={(i) => setUserHeaders(i)}
                        setDisplayLoading={(i) => setDisplayLoading(i)}
                        setMessage={(i) => setMessage(i)}
                        setSuccess={(i) => setSuccess(i)}
                        setError={(i) => setError(i)}
                    />
                </>
            ) : (
                <>
                    <Login
                        setUserData={(i) => setUserData(i)}
                        setUserHeaders={(i) => setUserHeaders(i)}
                        setDisplayLoading={(i) => setDisplayLoading(i)}
                        setMessage={(i) => setMessage(i)}
                        setSuccess={(i) => setSuccess(i)}
                        setError={(i) => setError(i)}
                    />
                </>
            )}
        </>
    );
}
