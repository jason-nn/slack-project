import React, { useState, useEffect } from "react";
import axios from "axios";
import ChannelMember from "./ChannelMember";
import SearchResult from "./SearchResult";
import Carousel2 from "./Carousel2";
import Carousel from "./Carousel";
import { icons, avatars, calculateIndex } from "../Utilities/ImageGenerator";

export default function ChatInfo({
    UserHeaders,
    DisplayChatName,
    DisplayChatID,
    DisplayChatClass,
    AllUsers,
    ChannelMembers,
    Fun,
    setChannelMembers,
    setMessage,
    setSuccess,
    setError,
}) {
    const [DisplayModal, setDisplayModal] = useState(false);
    const [UserInput, setUserInput] = useState("");
    const [FilteredUsers, setFilteredUsers] = useState(null);

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

    useEffect(() => {
        if (AllUsers)
            setFilteredUsers(
                AllUsers.filter((User) => User.uid.includes(UserInput))
            );
    }, [UserInput, AllUsers]);

    function renderSearchResults() {
        const output = [];

        for (let i = 0; i < FilteredUsers.length; i++) {
            output.push(
                <SearchResult
                    key={FilteredUsers[i].id}
                    data={FilteredUsers[i]}
                    setUserInput={(i) => {
                        setUserInput(i);
                    }}
                />
            );
        }
        return output;
    }

    return (
        <div className="ChatInfo">
            {DisplayChatClass ? (
                <div className="Fixed">
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
                    {DisplayChatName ? (
                        <>
                            <div className="ChatName">{DisplayChatName}</div>
                        </>
                    ) : null}
                </div>
            ) : null}

            {DisplayChatClass === "Channel" ? (
                <div className="ChannelInfo">
                    <div className="Header">Members</div>

                    {DisplayModal ? (
                        <div className="Modal">
                            <div>
                                <button
                                    onClick={() => {
                                        setDisplayModal(false);
                                        setUserInput("");
                                    }}
                                    className="CloseModal"
                                >
                                    Close
                                </button>

                                <div className="ChatName">
                                    Invite a user to {DisplayChatName}
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();

                                        const inviteUser = UserInput;
                                        const uids = AllUsers.map(
                                            (User) => User.uid
                                        );
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
                                                (user_id) =>
                                                    user_id === member_id
                                            );

                                            if (index2 === -1) {
                                                setUserInput("");

                                                let data = {
                                                    id: DisplayChatID,
                                                    member_id,
                                                };

                                                let config = {
                                                    method: "post",
                                                    url: "channel/add_member",
                                                    headers: {
                                                        "access-token":
                                                            UserHeaders[
                                                                "access-token"
                                                            ],
                                                        client: UserHeaders.client,
                                                        expiry: UserHeaders.expiry,
                                                        uid: UserHeaders.uid,
                                                    },
                                                    data: data,
                                                };

                                                axios(config)
                                                    .then((response) => {
                                                        let config = {
                                                            method: "get",
                                                            url:
                                                                "channels/" +
                                                                DisplayChatID,
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

                                                        axios(config)
                                                            .then(
                                                                (response) => {
                                                                    setChannelMembers(
                                                                        response
                                                                            ?.data
                                                                            ?.data[
                                                                            "channel_members"
                                                                        ]
                                                                    );
                                                                    setMessage(
                                                                        null
                                                                    );
                                                                    setSuccess(
                                                                        "Invited " +
                                                                            newUser.uid +
                                                                            " to " +
                                                                            DisplayChatName
                                                                    );
                                                                    setError(
                                                                        null
                                                                    );
                                                                    setTimeout(
                                                                        () => {
                                                                            setSuccess(
                                                                                null
                                                                            );
                                                                        },
                                                                        2000
                                                                    );
                                                                    setDisplayModal(
                                                                        false
                                                                    );
                                                                    setUserInput(
                                                                        ""
                                                                    );
                                                                }
                                                            )
                                                            .catch((error) => {
                                                                console.log(
                                                                    error
                                                                );
                                                            });
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
                                        value={UserInput}
                                        onChange={(e) => {
                                            setUserInput(e.target.value);
                                        }}
                                    />
                                    <button>Invite</button>
                                </form>

                                <div className="SearchResults">
                                    {FilteredUsers
                                        ? renderSearchResults()
                                        : null}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {ChannelMembers ? <>{renderChannelMembers()}</> : null}

                    <button
                        onClick={() => {
                            setDisplayModal(true);
                        }}
                    >
                        Invite
                    </button>
                </div>
            ) : (
                <>
                    <div className="EmptyRightPanel">
                        {DisplayChatClass === "User" ? (
                            Fun ? (
                                <>
                                    <Carousel2
                                        DisplayChatID={DisplayChatID}
                                        DisplayChatClass={DisplayChatClass}
                                    />
                                </>
                            ) : (
                                <>
                                    <img
                                        className="BackgroundColor"
                                        src={
                                            avatars[
                                                calculateIndex(
                                                    DisplayChatID,
                                                    DisplayChatClass
                                                )
                                            ]
                                        }
                                        alt="background color"
                                    />
                                </>
                            )
                        ) : (
                            <Carousel />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
