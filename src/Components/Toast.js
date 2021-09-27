import React from "react";

export default function Toast({ className, text }) {
    return (
        <div className={className}>
            <div>
                <span>{text}</span>
            </div>
        </div>
    );
}
