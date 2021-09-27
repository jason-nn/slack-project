import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Channel({
    data,
    UserHeaders,
    setDisplayChat,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    DisplayChat,
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
                onClick={() => {
                    // console.log(data.id);

                    axios(config)
                        .then((response) => {
                            // console.log("response", response);
                            setDisplayChat(response?.data?.data);
                            setDisplayChatName(data.name);
                            setDisplayChatID(data.id);
                            setDisplayChatClass("Channel");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
            >
                <div>{data.name}</div>
                <div>
                    <i>{LastMessage ? LastMessage : "No previous messages"}</i>
                </div>
            </div>
            <br />
        </>
    );
}
