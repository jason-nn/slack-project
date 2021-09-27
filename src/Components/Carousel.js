import React from "react";
import CarouselRow from "./CarouselRow";

export default function Carousel() {
    const avatars = [
        "Avatar_1.png",
        "Avatar_2.png",
        "Avatar_3.png",
        "Avatar_4.png",
        "Avatar_5.png",
        "Avatar_6.png",
        "Avatar_7.png",
        "Avatar_8.png",
    ];

    return (
        <div className="Carousel">
            <CarouselRow
                className={"CarouselRow CarouselRow1"}
                images={[avatars[0], avatars[1], avatars[2], avatars[3]]}
            />
            <CarouselRow
                className={"CarouselRow CarouselRow2"}
                images={[avatars[4], avatars[5], avatars[6], avatars[7]]}
            />
            <CarouselRow
                className={"CarouselRow CarouselRow1"}
                images={[avatars[0], avatars[1], avatars[2], avatars[3]]}
            />
            <CarouselRow
                className={"CarouselRow CarouselRow2"}
                images={[avatars[4], avatars[5], avatars[6], avatars[7]]}
            />
        </div>
    );
}
