import React, { useState, useEffect } from "react";
import axios from "axios";
import { icons, calculateIndex } from "../Utilities/ImageGenerator";

export default function Channel({
    data,
    UserHeaders,
    setDisplayChat,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    DisplayChat,
    DisplayChatID,
    setChannelMembers,
}) {
    let config = {
        method: "get",
        url: "messages?receiver_id=" + data.id + "&receiver_class=Channel",
        headers: {
            "access-token": UserHeaders["access-token"],
            client: UserHeaders.client,
            expiry: UserHeaders.expiry,
            uid: UserHeaders.uid,
        },
    };

    const [LastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        axios(config)
            .then((response) => {
                const messages = response?.data?.data;
                if (messages.length > 0) {
                    setLastMessage(messages[messages.length - 1].body);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [DisplayChat]);

    return (
        <>
            <div
                className="Channel"
                onClick={() => {
                    axios(config)
                        .then((response) => {
                            setDisplayChat(response?.data?.data);
                            setDisplayChatName(data.name);
                            setDisplayChatID(data.id);
                            setDisplayChatClass("Channel");
                            setChannelMembers(null);

                            let config = {
                                method: "get",
                                url: "channels/" + data.id,
                                headers: {
                                    "access-token": UserHeaders["access-token"],
                                    client: UserHeaders.client,
                                    expiry: UserHeaders.expiry,
                                    uid: UserHeaders.uid,
                                },
                            };

                            axios(config)
                                .then((response) => {
                                    setChannelMembers(
                                        response?.data?.data["channel_members"]
                                    );
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
            >
                <div>
                    <img
                        className="ChannelImage"
                        src={icons[calculateIndex(data.id, "Channel")]}
                        alt="icon"
                    />
                </div>
                <div className="ChannelName">{data.name}</div>
                <div className="ChannelLastMessage">
                    {LastMessage ? LastMessage : "No previous messages"}
                </div>
            </div>
        </>
    );
}
