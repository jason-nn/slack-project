import React, { useState } from "react";
import axios from "axios";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Loading from "./Components/Loading";
import Toast from "./Components/Toast";

export default function App() {
    axios.defaults.baseURL = "http://206.189.91.54/api/v1/";

    const [UserData, setUserData] = useState(null);
    const [UserHeaders, setUserHeaders] = useState(null);
    const [DisplayLoading, setDisplayLoading] = useState(true);

    const [Message, setMessage] = useState(null);
    const [Success, setSuccess] = useState(null);
    const [Error, setError] = useState(null);

    // useEffect(() => {
    //     console.log("UserData", UserData);
    // }, [UserData]);
    // useEffect(() => {
    //     console.log("UserHeaders", UserHeaders);
    // }, [UserHeaders]);

    setTimeout(() => {
        setDisplayLoading(false);
    }, 3300);

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
                        setUserData={(i) => setUserData(i)}
                        setUserHeaders={(i) => setUserHeaders(i)}
                        UserData={UserData}
                        UserHeaders={UserHeaders}
                        setMessage={(i) => setMessage(i)}
                        setSuccess={(i) => setSuccess(i)}
                        setError={(i) => setError(i)}
                        setDisplayLoading={(i) => setDisplayLoading(i)}
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
