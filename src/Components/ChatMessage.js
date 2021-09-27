import React from "react";

export default function ChatMessage({ data }) {
    return (
        <>
            <div>{data.body}</div>
            <div>
                <i>{data.sender.uid}</i>
            </div>
            <br />
        </>
    );
}
