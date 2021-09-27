import React, { useRef } from "react";
import ChatMessage from "./ChatMessage";
import axios from "axios";

export default function Chat({
    DisplayChat,
    DisplayChatName,
    DisplayChatID,
    UserHeaders,
    DisplayChatClass,
    setDisplayChat,
}) {
    // console.log(DisplayChat);
    // console.log(DisplayChatID);

    function renderChat() {
        const output = [];

        for (let i = 0; i < DisplayChat.length; i++) {
            output.push(
                <ChatMessage key={DisplayChat[i].id} data={DisplayChat[i]} />
            );
        }

        return output;
    }

    const sendMessageRef = useRef();

    return (
        <>
            <div>
                <b>{DisplayChatName ? DisplayChatName : "No chat selected"}</b>
            </div>
            {/* <div>
                <i>
                    {DisplayChatClass ? DisplayChatClass : "No chat selected"}
                </i>
            </div> */}

            <br />

            {DisplayChat.length > 0 ? (
                renderChat()
            ) : (
                <>
                    <div>
                        {DisplayChatName
                            ? "No chat history"
                            : "No chat selected"}
                    </div>
                </>
            )}

            <br />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const body = sendMessageRef.current.value;

                    let data = {
                        receiver_id: DisplayChatID,
                        receiver_class: DisplayChatClass,
                        body,
                    };

                    let config = {
                        method: "post",
                        url: "messages",
                        headers: {
                            "access-token": UserHeaders["access-token"],
                            client: UserHeaders.client,
                            expiry: UserHeaders.expiry,
                            uid: UserHeaders.uid,
                        },
                        data: data,
                    };

                    axios(config)
                        .then((response) => {
                            sendMessageRef.current.value = null;

                            let config = {
                                method: "get",
                                url:
                                    "messages?receiver_id=" +
                                    DisplayChatID +
                                    "&receiver_class=" +
                                    DisplayChatClass,
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
                                    setDisplayChat(response?.data?.data);
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
                <input type="text" ref={sendMessageRef} />
                <button>Send</button>
            </form>
        </>
    );
}
