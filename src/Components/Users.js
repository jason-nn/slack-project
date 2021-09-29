import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
import SearchResult from "./SearchResult";

export default function Users({
    UserData,
    UserHeaders,
    DisplayChat,
    AllUsers,
    setDisplayChat,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    setMessage,
    setSuccess,
    setError,
}) {
    const [DisplayUsers, setDisplayUsers] = useState(null);
    const [DisplayModal, setDisplayModal] = useState(false);
    const [UserInput, setUserInput] = useState("");
    const [FilteredUsers, setFilteredUsers] = useState(null);

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

        for (let i = 0; i < DisplayUsers.length; i++) {
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
                />
            );
        }
        return output;
    }

    useEffect(() => {
        if (AllUsers)
            setFilteredUsers(
                AllUsers.filter((User) => User.uid.includes(UserInput))
            );
    }, [UserInput, AllUsers]);

    function renderSearchResults() {
        const output = [];

        for (let i = 0; i < FilteredUsers.length; i++) {
            output.push(
                <SearchResult
                    key={FilteredUsers[i].id}
                    data={FilteredUsers[i]}
                    setUserInput={(i) => {
                        setUserInput(i);
                    }}
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
                            onClick={() => {
                                setDisplayModal(false);
                                setUserInput("");
                            }}
                            className="CloseModal"
                        >
                            Close
                        </button>

                        <div className="ChatName">Add a new user</div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                const addUser = UserInput;
                                const uids = AllUsers.map((User) => User.uid);
                                const index = uids.findIndex(
                                    (uid) => uid === addUser
                                );

                                if (index > -1) {
                                    const newUser = AllUsers[index];

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
                                        setUserInput("");
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
                                value={UserInput}
                                onChange={(e) => {
                                    setUserInput(e.target.value);
                                }}
                                placeholder="jason@bubble.com"
                            />
                            <button>Add</button>
                        </form>

                        <div className="SearchResults">
                            {FilteredUsers ? renderSearchResults() : null}
                        </div>
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
