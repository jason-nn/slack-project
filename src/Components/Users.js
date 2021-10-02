import React, { useEffect } from "react";
import axios from "axios";
import User from "./User";

export default function Users({
    UserHeaders,
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
        let config = {
            method: "get",
            url: "users",
            headers: {
                "access-token": UserHeaders["access-token"],
                client: UserHeaders.client,
                expiry: UserHeaders.expiry,
                uid: UserHeaders.uid,
            },
        };

        axios(config)
            .then((response) => {
                const output = [];
                for (let i = 14; i < 24; i++) {
                    output.push(response?.data?.data[i]);
                }
                setDisplayUsers(output);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
