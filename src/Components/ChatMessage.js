import React from "react";
import { generateImage } from "../Utilities/ImageGenerator";

export default function ChatMessage({ data, UserData }) {
    const outbound = UserData.id === data.sender.id;
    const time = new Date(data.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    // const date = new Date(data.created_at).toLocaleDateString("en-US", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    // });

    return (
        <div
            className={
                outbound
                    ? "ChatMessageContainerOutbound"
                    : "ChatMessageContainer"
            }
        >
            <div className={outbound ? "ChatMessageOutbound" : "ChatMessage"}>
                <div
                    className={
                        outbound
                            ? "ChatMessageBodyContainerOutbound"
                            : "ChatMessageBodyContainer"
                    }
                >
                    <div
                        className={
                            outbound
                                ? "ChatMessageBodyOutbound"
                                : "ChatMessageBody"
                        }
                    >
                        <div>{data.body}</div>
                    </div>
                </div>
                <div
                    className={
                        outbound
                            ? "ChatMessageSenderOutbound"
                            : "ChatMessageSender"
                    }
                >
                    <div className="Sender">{data.sender.uid}</div>
                    <div className="Time">{time}</div>
                </div>
                <div>
                    <img
                        className={
                            outbound
                                ? "ChatMessageImageOutbound"
                                : "ChatMessageImage"
                        }
                        src={generateImage(data.sender.id, "User")}
                        alt="avatar"
                    />
                </div>
            </div>
        </div>
    );
}
