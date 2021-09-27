import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChannelMember from "./ChannelMember";
import { icons, avatars, calculateIndex } from "../Utilities/ImageGenerator";

export default function ChatInfo({
    UserHeaders,
    DisplayChatName,
    DisplayChatID,
    DisplayChatClass,
    AllUsers,
    setMessage,
    setSuccess,
    setError,
}) {
    // console.log(AllUsers);
    // console.log(DisplayChatID);

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
                    // console.log("response", response);
                    setChannelMembers(response?.data?.data["channel_members"]);
                    // console.log("ChannelMembers", ChannelMembers);
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

    const inviteUserRef = useRef(null);

    return (
        <div>
            {DisplayChatClass ? (
                <>
                    <div>
                        <img
                            src={
                                DisplayChatClass === "Channel"
                                    ? icons[
                                          calculateIndex(
                                              DisplayChatID,
                                              DisplayChatClass
                                          )
                                      ]
                                    : avatars[
                                          calculateIndex(
                                              DisplayChatID,
                                              DisplayChatClass
                                          )
                                      ]
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
                    <div>Members</div>
                    <br />
                    {ChannelMembers ? (
                        <>
                            {renderChannelMembers()}
                            <br />
                        </>
                    ) : null}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();

                            const inviteUser = inviteUserRef.current.value;
                            const uids = AllUsers.map((User) => User.uid);
                            const index = uids.findIndex(
                                (uid) => uid === inviteUser
                            );

                            if (index > -1) {
                                const newUser = AllUsers[index];
                                const member_id = newUser.id;
                                const user_ids = ChannelMembers.map(
                                    (Member) => Member["user_id"]
                                );
                                const index2 = user_ids.findIndex(
                                    (user_id) => user_id === member_id
                                );

                                if (index2 === -1) {
                                    inviteUserRef.current.value = null;

                                    let data = {
                                        id: DisplayChatID,
                                        member_id,
                                    };

                                    let config = {
                                        method: "post",
                                        url: "channel/add_member",
                                        headers: {
                                            "access-token":
                                                UserHeaders["access-token"],
                                            client: UserHeaders.client,
                                            expiry: UserHeaders.expiry,
                                            uid: UserHeaders.uid,
                                        },
                                        data: data,
                                    };

                                    axios(config)
                                        .then((response) => {
                                            // console.log("response", response);
                                            let config = {
                                                method: "get",
                                                url:
                                                    "channels/" + DisplayChatID,
                                                headers: {
                                                    "access-token":
                                                        UserHeaders[
                                                            "access-token"
                                                        ],
                                                    client: UserHeaders.client,
                                                    expiry: UserHeaders.expiry,
                                                    uid: UserHeaders.uid,
                                                },
                                            };

                                            if (
                                                DisplayChatClass === "Channel"
                                            ) {
                                                axios(config)
                                                    .then((response) => {
                                                        // console.log("response", response);
                                                        setChannelMembers(
                                                            response?.data
                                                                ?.data[
                                                                "channel_members"
                                                            ]
                                                        );
                                                        // console.log("ChannelMembers", ChannelMembers);
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                    });
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                } else {
                                    setMessage(null);
                                    setSuccess(null);
                                    setError(
                                        "User is already a member of this channel"
                                    );
                                    setTimeout(() => {
                                        setError(null);
                                    }, 2000);
                                }
                            } else {
                                setMessage(null);
                                setSuccess(null);
                                setError("User does not exist");
                                setTimeout(() => {
                                    setError(null);
                                }, 2000);
                            }
                        }}
                    >
                        <input
                            type="text"
                            placeholder="jason@bubble.com"
                            ref={inviteUserRef}
                        />
                        <button>Invite</button>
                    </form>
                </>
            ) : null}
        </div>
    );
}
