import React from "react";
import ChannelMember from "./ChannelMember";
import Carousel2 from "./Carousel2";
import Carousel from "./Carousel";
import { icons, avatars, calculateIndex } from "../Utilities/ImageGenerator";

export default function ChatInfo({
    DisplayChatName,
    DisplayChatID,
    DisplayChatClass,
    AllUsers,
    ChannelMembers,
    Fun,
    setDisplayChatInfoModal,
}) {
    function renderChannelMembers() {
        const output = [];

        for (let i = 0; i < ChannelMembers?.length; i++) {
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

                    {ChannelMembers ? <>{renderChannelMembers()}</> : null}

                    <button
                        onClick={() => {
                            setDisplayChatInfoModal(true);
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
