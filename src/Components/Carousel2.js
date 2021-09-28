import React from "react";
import { avatars, calculateIndex } from "../Utilities/ImageGenerator";
import CarouselRow from "./CarouselRow";

export default function Carousel2({ DisplayChatID, DisplayChatClass }) {
    return (
        <div className="Carousel2">
            <CarouselRow
                className={"CarouselRow CarouselRow1"}
                images={[
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                ]}
            />
            <CarouselRow
                className={"CarouselRow CarouselRow2"}
                images={[
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                ]}
            />
            <CarouselRow
                className={"CarouselRow CarouselRow1"}
                images={[
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                ]}
            />
            <CarouselRow
                className={"CarouselRow CarouselRow2"}
                images={[
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                    avatars[calculateIndex(DisplayChatID, DisplayChatClass)],
                ]}
            />
        </div>
    );
}
