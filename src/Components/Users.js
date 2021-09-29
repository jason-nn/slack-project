import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import User from "./User";

export default function Users({
    UserHeaders,
    setDisplayChat,
    setMessage,
    setSuccess,
    setError,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    DisplayChat,
    UserData,
}) {
    const [Users, setUsers] = useState(null);
    const [DisplayUsers, setDisplayUsers] = useState(null);
    const addUserRef = useRef(null);
    const [DisplayModal, setDisplayModal] = useState(false);

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
                setUsers(response?.data?.data);
                const output = [];
                for (let i = 0; i < 10; i++) {
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

        for (let i = 0; i < DisplayUsers.length; i++) {
            output.push(
                <User
                    UserHeaders={UserHeaders}
                    DisplayChat={DisplayChat}
                    key={DisplayUsers[i].id}
                    data={DisplayUsers[i]}
                    setDisplayChat={(i) => setDisplayChat(i)}
                    setDisplayChatName={(i) => setDisplayChatName(i)}
                    setDisplayChatID={(i) => setDisplayChatID(i)}
                    setDisplayChatClass={(i) => setDisplayChatClass(i)}
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
                    setDisplayModal(true);
                }}
            >
                Add
            </button>

            {DisplayModal ? (
                <div className="Modal">
                    <div>
                        <button
                            onClick={() => setDisplayModal(false)}
                            className="CloseModal"
                        >
                            Close
                        </button>

                        <div className="ChatName">Add a new user</div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                const addUser = addUserRef.current.value;
                                const uids = Users.map((User) => User.uid);
                                const index = uids.findIndex(
                                    (uid) => uid === addUser
                                );

                                if (index > -1) {
                                    const newUser = Users[index];

                                    const ids = DisplayUsers.map(
                                        (User) => User.id
                                    );
                                    const index2 = ids.findIndex(
                                        (id) => id === newUser.id
                                    );

                                    if (newUser.id === UserData.id) {
                                        setMessage(null);
                                        setSuccess(null);
                                        setError("Cannot add yourself");
                                        setTimeout(() => {
                                            setError(null);
                                        }, 2000);
                                        return;
                                    }

                                    if (index2 === -1) {
                                        setDisplayModal(false);
                                        const DisplayUsersCopy = [
                                            ...DisplayUsers,
                                        ];
                                        DisplayUsersCopy.unshift(newUser);
                                        DisplayUsersCopy.pop();
                                        setDisplayUsers(DisplayUsersCopy);
                                        addUserRef.current.value = null;
                                        setMessage(null);
                                        setSuccess("Added " + newUser.uid);
                                        setError(null);
                                        setTimeout(() => {
                                            setSuccess(null);
                                        }, 2000);
                                    } else {
                                        setMessage(null);
                                        setSuccess(null);
                                        setError("User already displayed");
                                        setTimeout(() => {
                                            setError(null);
                                        }, 2000);
                                    }
                                } else {
                                    setMessage(null);
                                    setSuccess(null);
                                    setError("User does not exist");
                                    setTimeout(() => {
                                        setError(null);
                                    }, 2000);
                                }
                            }}
                        >
                            <input
                                type="text"
                                ref={addUserRef}
                                placeholder="jason@bubble.com"
                            />
                            <button>Add</button>
                        </form>

                        <div className="SearchResults"></div>
                    </div>
                </div>
            ) : null}

            {DisplayUsers ? (
                renderUsers()
            ) : (
                <div className="Header">No Users</div>
            )}
        </>
    );
}
