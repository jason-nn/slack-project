import React from "react";

export default function ChatDate({ data }) {
    const date = new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="ChatDate">
            <div className="ChatDateLine"></div>
            <div className="ChatDateContent">{date}</div>
        </div>
    );
}
