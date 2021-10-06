import React from "react";
import CarouselRow from "./CarouselRow";
import { avatars } from "../../Utilities/ImageGenerator";

export default function Carousel() {
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
