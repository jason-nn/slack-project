import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Channel from "./Channel";

export default function Channels({
    UserHeaders,
    DisplayChat,
    setDisplayChat,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    setChannelMembers,
    setMessage,
    setSuccess,
    setError,
}) {
    const [Channels, setChannels] = useState(null);
    const [DisplayModal, setDisplayModal] = useState(false);

    const newChannelRef = useRef(null);

    useEffect(() => {
        let config = {
            method: "get",
            url: "channels",
            headers: {
                "access-token": UserHeaders["access-token"],
                client: UserHeaders.client,
                expiry: UserHeaders.expiry,
                uid: UserHeaders.uid,
            },
        };

        axios(config)
            .then((response) => {
                setChannels(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function renderChannels() {
        const output = [];

        for (let i = 0; i < Channels.length; i++) {
            output.push(
                <Channel
                    key={Channels[i].id}
                    data={Channels[i]}
                    UserHeaders={UserHeaders}
                    DisplayChat={DisplayChat}
                    setDisplayChat={(i) => setDisplayChat(i)}
                    setDisplayChatName={(i) => setDisplayChatName(i)}
                    setDisplayChatID={(i) => setDisplayChatID(i)}
                    setDisplayChatClass={(i) => setDisplayChatClass(i)}
                    setChannelMembers={(i) => setChannelMembers(i)}
                />
            );
        }

        return output;
    }

    return (
        <div className="Channels">
            <div className="Header">Channels</div>

            {Channels ? (
                renderChannels()
            ) : (
                <div className="Header">No channels</div>
            )}

            <button
                onClick={() => {
                    setDisplayModal(true);
                }}
            >
                Create
            </button>

            {DisplayModal ? (
                <div className="Modal">
                    <div>
                        <button
                            onClick={() => {
                                setDisplayModal(false);
                                newChannelRef.current.value = null;
                            }}
                            className="CloseModal"
                        >
                            Close
                        </button>

                        <div className="ChatName">Create a new channel</div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                let data = {
                                    name: newChannelRef.current.value,
                                    user_ids: "[]",
                                };
                                let config = {
                                    method: "post",
                                    url: "channels",
                                    headers: {
                                        "access-token":
                                            UserHeaders["access-token"],
                                        client: UserHeaders.client,
                                        expiry: UserHeaders.expiry,
                                        uid: UserHeaders.uid,
                                    },
                                    data: data,
                                };

                                axios(config)
                                    .then((response) => {
                                        let config = {
                                            method: "get",
                                            url: "channels",
                                            headers: {
                                                "access-token":
                                                    UserHeaders["access-token"],
                                                client: UserHeaders.client,
                                                expiry: UserHeaders.expiry,
                                                uid: UserHeaders.uid,
                                            },
                                        };

                                        axios(config)
                                            .then((response) => {
                                                setChannels(
                                                    response?.data?.data
                                                );

                                                setMessage(null);
                                                setSuccess(null);
                                                setError(
                                                    "Channel name is already taken"
                                                );
                                                setTimeout(() => {
                                                    setError(null);
                                                }, 2000);
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    })
                                    .catch((error) => {
                                        console.log(error);

                                        let config = {
                                            method: "get",
                                            url: "channels",
                                            headers: {
                                                "access-token":
                                                    UserHeaders["access-token"],
                                                client: UserHeaders.client,
                                                expiry: UserHeaders.expiry,
                                                uid: UserHeaders.uid,
                                            },
                                        };

                                        axios(config)
                                            .then((response) => {
                                                setChannels(
                                                    response?.data?.data
                                                );

                                                newChannelRef.current.value =
                                                    null;
                                                setDisplayModal(false);
                                                setMessage(null);
                                                setError(null);
                                                setSuccess(
                                                    "Successfully created a new channel"
                                                );
                                                setTimeout(() => {
                                                    setSuccess(null);
                                                }, 2000);
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    });
                            }}
                        >
                            <input
                                type="text"
                                ref={newChannelRef}
                                placeholder="New channel name"
                            />
                            <button>Create</button>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
