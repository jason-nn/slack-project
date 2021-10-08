import React, { useEffect } from "react";
import axios from "axios";
import Channel from "./Channel";
import { Config } from "../../Utilities/Config";

export default function Channels({
    UserHeaders,
    DisplayChat,
    UserChannels,
    setDisplayChat,
    setDisplayChatName,
    setDisplayChatID,
    setDisplayChatClass,
    setChannelMembers,
    setDisplayLeftPanel,
    setUserChannels,
    setDisplayUserChannelsModal,
}) {
    useEffect(() => {
        axios(Config.GetAllChannels(UserHeaders))
            .then((response) => {
                setUserChannels(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function renderChannels() {
        const output = [];

        for (let i = 0; i < UserChannels?.length; i++) {
            output.push(
                <Channel
                    key={UserChannels[i].id}
                    data={UserChannels[i]}
                    UserHeaders={UserHeaders}
                    DisplayChat={DisplayChat}
                    setDisplayChat={(i) => setDisplayChat(i)}
                    setDisplayChatName={(i) => setDisplayChatName(i)}
                    setDisplayChatID={(i) => setDisplayChatID(i)}
                    setDisplayChatClass={(i) => setDisplayChatClass(i)}
                    setChannelMembers={(i) => setChannelMembers(i)}
                    setDisplayLeftPanel={(i) => setDisplayLeftPanel(i)}
                />
            );
        }

        return output;
    }

    return (
        <div className="Channels">
            <div className="Header">Channels</div>

            {UserChannels ? (
                renderChannels()
            ) : (
                <div className="Header">No channels</div>
            )}

            <button
                onClick={() => {
                    setDisplayUserChannelsModal(true);
                }}
            >
                Create
            </button>
        </div>
    );
}
