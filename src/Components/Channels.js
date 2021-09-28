import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Channel from "./Channel";

export default function Channels({
    UserHeaders,
    setDisplayChat,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    DisplayChat,
    DisplayChatID,
    setChannelMembers,
    UserData,
    ChannelMembers,
}) {
    const [Channels, setChannels] = useState(null);
    const [DisplayModal, setDisplayModal] = useState(false);

    const newChannelRef = useRef();

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
                    UserHeaders={UserHeaders}
                    key={Channels[i].id}
                    data={Channels[i]}
                    setDisplayChat={(i) => setDisplayChat(i)}
                    setDisplayChatName={(i) => setDisplayChatName(i)}
                    setDisplayChatID={(i) => setDisplayChatID(i)}
                    setDisplayChatClass={(i) => setDisplayChatClass(i)}
                    DisplayChat={DisplayChat}
                    DisplayChatID={DisplayChatID}
                    setChannelMembers={(i) => setChannelMembers(i)}
                    UserData={UserData}
                    ChannelMembers={ChannelMembers}
                />
            );
        }

        return output;
    }

    return (
        <div className="Channels">
            <div className="header">Channels</div>

            {Channels ? (
                renderChannels()
            ) : (
                <div className="header">No channels</div>
            )}

            <button
                onClick={() => {
                    setDisplayModal(true);
                }}
            >
                Create
            </button>

            {DisplayModal ? (
                <div className="modal">
                    <div>
                        <button
                            onClick={() => setDisplayModal(false)}
                            className="closeModal"
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
                                        setDisplayModal(false);

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
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        setDisplayModal(false);

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
