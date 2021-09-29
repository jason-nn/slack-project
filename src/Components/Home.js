import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import Channels from "./Channels";
import Users from "./Users";
import Chat from "./Chat";
import ChatInfo from "./ChatInfo";
import axios from "axios";
import Logo from "./Logo";

export default function Home({
    setUserData,
    setUserHeaders,
    UserData,
    UserHeaders,
    setMessage,
    setSuccess,
    setError,
    setDisplayLoading,
}) {
    const [DisplayChat, setDisplayChat] = useState([]);
    const [DisplayChatName, setDisplayChatName] = useState(null);
    const [DisplayChatID, setDisplayChatID] = useState(null);
    const [DisplayChatClass, setDisplayChatClass] = useState(null);
    const [AllUsers, setAllUsers] = useState(null);
    const [ChannelMembers, setChannelMembers] = useState(null);
    const [Fun, setFun] = useState(false);

    useEffect(() => {
        let config = {
            method: "get",
            url: "users",
            headers: {
                "access-token": UserHeaders["access-token"],
                client: UserHeaders.client,
                expiry: UserHeaders.expiry,
                uid: UserHeaders.uid,
            },
        };

        axios(config)
            .then((response) => {
                setAllUsers(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="Home">
            <div className="HomeLeftPanel">
                <div className="Fixed">
                    <Logo />
                </div>

                <div className="ChannelsAndUsers">
                    <Channels
                        UserData={UserData}
                        UserHeaders={UserHeaders}
                        setDisplayChat={(i) => setDisplayChat(i)}
                        setDisplayChatName={(i) => setDisplayChatName(i)}
                        setDisplayChatID={(i) => setDisplayChatID(i)}
                        setDisplayChatClass={(i) => setDisplayChatClass(i)}
                        DisplayChat={DisplayChat}
                        DisplayChatID={DisplayChatID}
                        setChannelMembers={(i) => setChannelMembers(i)}
                        ChannelMembers={ChannelMembers}
                        setMessage={(i) => setMessage(i)}
                        setSuccess={(i) => setSuccess(i)}
                        setError={(i) => setError(i)}
                    />

                    <Users
                        UserData={UserData}
                        UserHeaders={UserHeaders}
                        AllUsers={AllUsers}
                        setDisplayChat={(i) => setDisplayChat(i)}
                        setDisplayChatName={(i) => setDisplayChatName(i)}
                        setMessage={(i) => setMessage(i)}
                        setSuccess={(i) => setSuccess(i)}
                        setError={(i) => setError(i)}
                        setDisplayChatID={(i) => setDisplayChatID(i)}
                        setDisplayChatClass={(i) => setDisplayChatClass(i)}
                        DisplayChat={DisplayChat}
                    />
                </div>
            </div>

            <div className="HomeMiddlePanel">
                <Chat
                    UserData={UserData}
                    UserHeaders={UserHeaders}
                    DisplayChat={DisplayChat}
                    DisplayChatName={DisplayChatName}
                    DisplayChatID={DisplayChatID}
                    DisplayChatClass={DisplayChatClass}
                    setDisplayChat={(i) => setDisplayChat(i)}
                />
            </div>

            <div className="HomeRightPanel">
                <ChatInfo
                    UserData={UserData}
                    UserHeaders={UserHeaders}
                    DisplayChatName={DisplayChatName}
                    DisplayChatID={DisplayChatID}
                    DisplayChatClass={DisplayChatClass}
                    AllUsers={AllUsers}
                    setMessage={(i) => setMessage(i)}
                    setSuccess={(i) => setSuccess(i)}
                    setError={(i) => setError(i)}
                    ChannelMembers={ChannelMembers}
                    setChannelMembers={(i) => setChannelMembers(i)}
                    Fun={Fun}
                />

                <Logout
                    setUserData={(i) => setUserData(i)}
                    setUserHeaders={(i) => setUserHeaders(i)}
                    setDisplayLoading={(i) => setDisplayLoading(i)}
                    setFun={(i) => setFun(i)}
                    Fun={Fun}
                />
            </div>
        </div>
    );
}
