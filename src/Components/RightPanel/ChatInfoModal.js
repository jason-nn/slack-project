import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResult from "../Shared/SearchResult";
import { Config } from "../../Utilities/Config";

export default function ChatInfoModal({
    UserHeaders,
    AllUsers,
    DisplayChatName,
    DisplayChatID,
    ChannelMembers,
    DisplayChatInfoModal,
    setChannelMembers,
    setMessage,
    setSuccess,
    setError,
    setDisplayChatInfoModal,
}) {
    const [UserInput, setUserInput] = useState("");
    const [FilteredUsers, setFilteredUsers] = useState(null);

    useEffect(() => {
        if (AllUsers)
            setFilteredUsers(
                AllUsers.filter((User) => User.uid.includes(UserInput))
            );
    }, [UserInput, AllUsers]);

    function renderSearchResults() {
        const output = [];

        for (let i = 0; i < FilteredUsers?.length; i++) {
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
        <div>
            {DisplayChatInfoModal ? (
                <div className="Modal">
                    <div>
                        <button
                            onClick={() => {
                                setDisplayChatInfoModal(false);
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
                                        let data = {
                                            id: DisplayChatID,
                                            member_id,
                                        };

                                        axios(
                                            Config.PostAddMember(
                                                data,
                                                UserHeaders
                                            )
                                        )
                                            .then((response) => {
                                                axios(
                                                    Config.GetChannelMembers(
                                                        DisplayChatID,
                                                        UserHeaders
                                                    )
                                                )
                                                    .then((response) => {
                                                        setChannelMembers(
                                                            response?.data
                                                                ?.data[
                                                                "channel_members"
                                                            ]
                                                        );
                                                        setMessage(null);
                                                        setSuccess(
                                                            "Invited " +
                                                                newUser.uid +
                                                                " to " +
                                                                DisplayChatName
                                                        );
                                                        setError(null);
                                                        setTimeout(() => {
                                                            setSuccess(null);
                                                        }, 2000);
                                                        setDisplayChatInfoModal(
                                                            false
                                                        );
                                                        setUserInput("");
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
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
                            {FilteredUsers ? renderSearchResults() : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
