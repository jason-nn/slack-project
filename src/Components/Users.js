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
}) {
    const [Users, setUsers] = useState(null);
    const [DisplayUsers, setDisplayUsers] = useState(null);
    const addUserRef = useRef(null);

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
                // console.log("response", response);
                setUsers(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (Users) {
            const output = [];

            for (let i = 0; i < 10; i++) {
                output.push(
                    <User
                        UserHeaders={UserHeaders}
                        DisplayChat={DisplayChat}
                        key={Users[i].id}
                        data={Users[i]}
                        setDisplayChat={(i) => setDisplayChat(i)}
                        setDisplayChatName={(i) => setDisplayChatName(i)}
                        setDisplayChatID={(i) => setDisplayChatID(i)}
                        setDisplayChatClass={(i) => setDisplayChatClass(i)}
                    />
                );
            }

            setDisplayUsers(output);
        }
    }, [Users]);

    return (
        <>
            <div>
                <b>Users</b>
            </div>

            <br />

            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    const addUser = addUserRef.current.value;
                    const uids = Users.map((User) => User.uid);
                    const index = uids.findIndex((uid) => uid === addUser);

                    if (index > -1) {
                        const newUser = Users[index];

                        const DisplayUsersCopy = [...DisplayUsers];
                        DisplayUsersCopy.unshift(
                            <User
                                UserHeaders={UserHeaders}
                                DisplayChat={DisplayChat}
                                key={newUser.id}
                                data={newUser}
                                setDisplayChat={(i) => setDisplayChat(i)}
                                setDisplayChatName={(i) =>
                                    setDisplayChatName(i)
                                }
                                setDisplayChatID={(i) => setDisplayChatID(i)}
                                setDisplayChatClass={(i) =>
                                    setDisplayChatClass(i)
                                }
                            />
                        );
                        DisplayUsersCopy.pop();
                        setDisplayUsers(DisplayUsersCopy);

                        addUserRef.current.value = null;
                    } else {
                        setMessage(null);
                        setSuccess(null);
                        setError("Error");
                        setTimeout(() => {
                            setError(null);
                        }, 2000);
                    }
                }}
            >
                <input type="text" ref={addUserRef} />
                <button>Add</button>
            </form>

            <br />

            {DisplayUsers ? DisplayUsers : <div>No Users</div>}
        </>
    );
}
