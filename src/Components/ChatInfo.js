import React, { useEffect, useState } from "react";
import axios from "axios";
import ChannelMember from "./ChannelMember";

export default function ChatInfo({
    UserHeaders,
    DisplayChatName,
    DisplayChatID,
    DisplayChatClass,
    AllUsers,
}) {
    // console.log(AllUsers);
    const icons = ["Icon_1.png", "Icon_2.png", "Icon_3.png"];
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

    function calculateIndex(ID) {
        let dividend;
        if (DisplayChatClass === "Channel") dividend = 3;
        if (DisplayChatClass === "User") dividend = 8;
        return ID % dividend;
    }

    const [ChannelMembers, setChannelMembers] = useState(null);

    useEffect(() => {
        let config = {
            method: "get",
            url: "channels/" + DisplayChatID,
            headers: {
                "access-token": UserHeaders["access-token"],
                client: UserHeaders.client,
                expiry: UserHeaders.expiry,
                uid: UserHeaders.uid,
            },
        };

        if (DisplayChatClass === "Channel") {
            axios(config)
                .then((response) => {
                    console.log("response", response);
                    setChannelMembers(response?.data?.data["channel_members"]);
                    console.log("ChannelMembers", ChannelMembers);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [DisplayChatClass]);

    function renderChannelMembers() {
        const output = [];

        for (let i = 0; i < ChannelMembers.length; i++) {
            output.push(
                <ChannelMember
                    key={ChannelMembers[i].id}
                    data={ChannelMembers[i]}
                    AllUsers={AllUsers}
                />
            );
        }

        return output;
    }

    return (
        <div>
            {DisplayChatClass ? (
                <>
                    <div>
                        <img
                            src={
                                "Images/" +
                                (DisplayChatClass === "Channel"
                                    ? icons[calculateIndex(DisplayChatID)]
                                    : avatars[calculateIndex(DisplayChatID)])
                            }
                            alt="icon/avatar"
                        />
                    </div>
                    <br />
                </>
            ) : null}

            {DisplayChatName ? (
                <>
                    <div>
                        <b>{DisplayChatName}</b>
                    </div>
                    <br />
                </>
            ) : null}

            {DisplayChatClass === "Channel" ? (
                <>
                    <div>Channel info</div>
                    <br />
                    {ChannelMembers ? (
                        <>
                            {renderChannelMembers()}
                            <br />
                        </>
                    ) : null}
                </>
            ) : null}
        </div>
    );
}
