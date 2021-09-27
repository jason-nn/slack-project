import React from "react";

export default function CarouselRow({ className, images }) {
    return (
        <div className={className}>
            <img src={"Images/" + images[0]} alt="avatar" />
            <img src={"Images/" + images[1]} alt="avatar" />
            <img src={"Images/" + images[2]} alt="avatar" />
            <img src={"Images/" + images[3]} alt="avatar" />
            <img src={"Images/" + images[0]} alt="avatar" />
            <img src={"Images/" + images[1]} alt="avatar" />
            <img src={"Images/" + images[2]} alt="avatar" />
            <img src={"Images/" + images[3]} alt="avatar" />
            <img src={"Images/" + images[0]} alt="avatar" />
            <img src={"Images/" + images[1]} alt="avatar" />
            <img src={"Images/" + images[2]} alt="avatar" />
            <img src={"Images/" + images[3]} alt="avatar" />
        </div>
    );
}
