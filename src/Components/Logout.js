import React from "react";

export default function Logout({
    setUserData,
    setUserHeaders,
    setDisplayLoading,
    Fun,
    setFun,
}) {
    return (
        <div className="Logout">
            <button
                onClick={() => {
                    setFun(!Fun);
                }}
            >
                Fun
            </button>
            <button
                onClick={() => {
                    setUserData(null);
                    setUserHeaders(null);
                    setDisplayLoading(true);
                    setTimeout(() => {
                        setDisplayLoading(false);
                    }, 3300);
                }}
            >
                Log out
            </button>
        </div>
    );
}
