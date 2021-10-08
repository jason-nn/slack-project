import React, { useState, useEffect } from "react";
import axios from "axios";
import { generateImage } from "../../Utilities/ImageGenerator";

export default function Channel({
    data,
    UserHeaders,
    DisplayChat,
    setDisplayChat,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    setChannelMembers,
    setDisplayLeftPanel,
}) {
    const [LastMessage, setLastMessage] = useState(null);
    const [LocalChat, setLocalChat] = useState(null);
    const [LocalMembers, setLocalMembers] = useState(null);

    useEffect(() => {
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

        axios(config)
            .then((response) => {
                const messages = response?.data?.data;
                setLocalChat(messages);
                if (messages?.length > 0) {
                    setLastMessage(messages[messages?.length - 1].body);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [DisplayChat]);

    useEffect(() => {
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
                setLocalMembers(response?.data?.data["channel_members"]);
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
                    setDisplayChat(LocalChat);
                    setDisplayChatName(data.name);
                    setDisplayChatID(data.id);
                    setDisplayChatClass("Channel");
                    setChannelMembers(null);
                    setDisplayLeftPanel(false);
                    setChannelMembers(LocalMembers);
                }}
            >
                <div>
                    <img
                        className="ChannelImage"
                        src={generateImage(data.id, "Channel")}
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
