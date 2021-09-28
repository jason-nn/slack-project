import React from "react";
import { avatars, calculateIndex } from "../Utilities/ImageGenerator";

export default function ChatMessage({ data }) {
    return (
        <>
            <div>
                <img
                    src={avatars[calculateIndex(data.sender.id, "User")]}
                    alt="avatar"
                />
            </div>
            <div>{data.body}</div>
            <div>{data.sender.uid}</div>
        </>
    );
}
