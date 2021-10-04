import React, { useEffect } from "react";
import axios from "axios";
import User from "./User";

export default function Users({
    UserHeaders,
    AllUsers,
    DisplayChat,
    DisplayUsers,
    setDisplayChat,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    setDisplayLeftPanel,
    setDisplayUsers,
    setDisplayUsersModal,
}) {
    useEffect(() => {
        if (AllUsers) {
            const output = [];
            for (let i = 25; i < 30; i++) {
                output.push(AllUsers[i]);
            }
            setDisplayUsers(output);
        }
    }, [AllUsers]);

    function renderUsers() {
        const output = [];

        for (let i = 0; i < DisplayUsers?.length; i++) {
            output.push(
                <User
                    key={DisplayUsers[i].id}
                    data={DisplayUsers[i]}
                    UserHeaders={UserHeaders}
                    DisplayChat={DisplayChat}
                    setDisplayChat={(i) => setDisplayChat(i)}
                    setDisplayChatName={(i) => setDisplayChatName(i)}
                    setDisplayChatID={(i) => setDisplayChatID(i)}
                    setDisplayChatClass={(i) => setDisplayChatClass(i)}
                    setDisplayLeftPanel={(i) => setDisplayLeftPanel(i)}
                />
            );
        }
        return output;
    }

    return (
        <>
            <div className="Header">Users</div>

            <button
                onClick={() => {
                    setDisplayUsersModal(true);
                }}
            >
                Add
            </button>

            {DisplayUsers ? (
                renderUsers()
            ) : (
                <div className="Header">No Users</div>
            )}
        </>
    );
}
