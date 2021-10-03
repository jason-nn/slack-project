import React from "react";

export default function Logout({
    Fun,
    DisplayChatClass,
    setDisplayLoading,
    setUserData,
    setUserHeaders,
    setFun,
}) {
    return (
        <div className="Logout">
            {DisplayChatClass === "User" ? (
                <button
                    onClick={() => {
                        setFun(!Fun);
                    }}
                >
                    Fun
                </button>
            ) : null}
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
