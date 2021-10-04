import React, { useState, useEffect } from "react";
import axios from "axios";
import { generateImage } from "../Utilities/ImageGenerator";

export default function User({
    data,
    UserHeaders,
    DisplayChat,
    setDisplayChat,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    setDisplayLeftPanel,
}) {
    let config = {
        method: "get",
        url: "messages?receiver_id=" + data.id + "&receiver_class=User",
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
                if (messages?.length > 0) {
                    setLastMessage(messages[messages?.length - 1].body);
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
                            setDisplayChatName(data.uid);
                            setDisplayChatID(data.id);
                            setDisplayChatClass("User");
                            setDisplayLeftPanel(false);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
            >
                <div>
                    <img
                        className="ChannelImage"
                        src={generateImage(data.id, "User")}
                        alt="avatar"
                    />
                </div>
                <div className="ChannelName">{data.uid}</div>
                <div className="ChannelLastMessage">
                    {LastMessage ? LastMessage : "No previous messages"}
                </div>
            </div>
        </>
    );
}
