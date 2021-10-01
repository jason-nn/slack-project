import React from "react";
import { avatars, calculateIndex } from "../Utilities/ImageGenerator";

export default function ChatMessage({ data, UserData }) {
    const outbound = UserData.id === data.sender.id;
    const time = new Date(data.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

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
                        src={avatars[calculateIndex(data.sender.id, "User")]}
                        alt="avatar"
                    />
                </div>
            </div>
        </div>
    );
}
