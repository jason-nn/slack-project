import React, { useRef } from "react";
import axios from "axios";
import { Config } from "../../Utilities/Config";

export default function ChannelsModal({
    UserHeaders,
    DisplayUserChannelsModal,
    setMessage,
    setSuccess,
    setError,
    setUserChannels,
    setDisplayUserChannelsModal,
}) {
    const newChannelRef = useRef(null);

    return (
        <div className="ChannelsModal">
            {DisplayUserChannelsModal ? (
                <div className="Modal">
                    <div>
                        <button
                            onClick={() => {
                                setDisplayUserChannelsModal(false);
                                newChannelRef.current.value = null;
                            }}
                            className="CloseModal"
                        >
                            Close
                        </button>

                        <div className="ChatName">Create a new channel</div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                let data = {
                                    name: newChannelRef.current.value,
                                    user_ids: "[]",
                                };

                                axios(Config.PostNewChannel(data, UserHeaders))
                                    .then((response) => {
                                        axios(
                                            Config.GetAllChannels(UserHeaders)
                                        )
                                            .then((response) => {
                                                setUserChannels(
                                                    response?.data?.data
                                                );

                                                setMessage(null);
                                                setSuccess(null);
                                                setError(
                                                    "Channel name is already taken"
                                                );
                                                setTimeout(() => {
                                                    setError(null);
                                                }, 2000);
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        axios(
                                            Config.GetAllChannels(UserHeaders)
                                        )
                                            .then((response) => {
                                                setUserChannels(
                                                    response?.data?.data
                                                );

                                                newChannelRef.current.value =
                                                    null;
                                                setDisplayUserChannelsModal(
                                                    false
                                                );
                                                setMessage(null);
                                                setError(null);
                                                setSuccess(
                                                    "Successfully created a new channel"
                                                );
                                                setTimeout(() => {
                                                    setSuccess(null);
                                                }, 2000);
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    });
                            }}
                        >
                            <input
                                type="text"
                                ref={newChannelRef}
                                placeholder="New channel name"
                            />
                            <button>Create</button>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
