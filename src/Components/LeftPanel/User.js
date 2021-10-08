import React, { useState, useEffect } from "react";
import axios from "axios";
import { generateImage } from "../../Utilities/ImageGenerator";
import { Config } from "../../Utilities/Config";

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
    const [LastMessage, setLastMessage] = useState(null);
    const [LocalChat, setLocalChat] = useState(null);

    // useEffect(() => {
    //     axios(Config.GetMessages(data.id, "User", UserHeaders))
    //         .then((response) => {
    //             const messages = response?.data?.data;
    //             setLocalChat(messages);
    //             if (messages?.length > 0) {
    //                 setLastMessage(messages[messages?.length - 1].body);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [DisplayChat]);

    useEffect(() => {
        let GetUserMessagesInterval = setInterval(() => {
            axios(Config.GetMessages(data.id, "User", UserHeaders))
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
        }, 1500);
        return () => {
            clearInterval(GetUserMessagesInterval);
        };
    }, []);

    return (
        <>
            <div
                className="Channel"
                onClick={() => {
                    setDisplayChat(LocalChat);
                    setDisplayChatName(data.uid);
                    setDisplayChatID(data.id);
                    setDisplayChatClass("User");
                    setDisplayLeftPanel(false);
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
