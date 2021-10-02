import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "./Logo";
import Channels from "./Channels";
import Users from "./Users";
import Chat from "./Chat";
import ChatInfo from "./ChatInfo";
import Logout from "./Logout";
import UsersModal from "./UsersModal";
import ChannelsModal from "./ChannelsModal";
import LeftToggle from "./LeftToggle";
import RightToggle from "./RightToggle";
import ChatInfoModal from "./ChatInfoModal";

export default function Home({
    UserData,
    UserHeaders,
    setUserData,
    setUserHeaders,
    setDisplayLoading,
    setMessage,
    setSuccess,
    setError,
}) {
    const [DisplayChat, setDisplayChat] = useState([]);
    const [DisplayChatName, setDisplayChatName] = useState(null);
    const [DisplayChatID, setDisplayChatID] = useState(null);
    const [DisplayChatClass, setDisplayChatClass] = useState(null);
    const [AllUsers, setAllUsers] = useState(null);
    const [ChannelMembers, setChannelMembers] = useState(null);
    const [Fun, setFun] = useState(false);
    const [DisplayLeftPanel, setDisplayLeftPanel] = useState(false);
    const [DisplayRightPanel, setDisplayRightPanel] = useState(false);
    const [DisplayUsers, setDisplayUsers] = useState(null);
    const [DisplayUsersModal, setDisplayUsersModal] = useState(false);
    const [UserChannels, setUserChannels] = useState(null);
    const [DisplayUserChannelsModal, setDisplayUserChannelsModal] =
        useState(false);
    const [DisplayChatInfoModal, setDisplayChatInfoModal] = useState(false);

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

    let interval;

    useEffect(() => {
        interval = setInterval(() => {
            let config = {
                method: "get",
                url:
                    "messages?receiver_id=" +
                    DisplayChatID +
                    "&receiver_class=" +
                    DisplayChatClass,
                headers: {
                    "access-token": UserHeaders["access-token"],
                    client: UserHeaders.client,
                    expiry: UserHeaders.expiry,
                    uid: UserHeaders.uid,
                },
            };

            axios(config)
                .then((response) => {
                    setDisplayChat(response?.data?.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1500);

        return () => clearInterval(interval);
    }, [DisplayChatID, DisplayChatClass]);

    return (
        <div className="Home">
            <div
                className={
                    DisplayLeftPanel
                        ? "HomeLeftPanel ShowLeftPanel"
                        : "HomeLeftPanel"
                }
            >
                <div className="Fixed">
                    <Logo />
                </div>

                <div className="ChannelsAndUsers">
                    <Channels
                        UserHeaders={UserHeaders}
                        DisplayChat={DisplayChat}
                        UserChannels={UserChannels}
                        setDisplayChat={(i) => setDisplayChat(i)}
                        setDisplayChatName={(i) => setDisplayChatName(i)}
                        setDisplayChatID={(i) => setDisplayChatID(i)}
                        setDisplayChatClass={(i) => setDisplayChatClass(i)}
                        setChannelMembers={(i) => setChannelMembers(i)}
                        setDisplayLeftPanel={(i) => setDisplayLeftPanel(i)}
                        setUserChannels={(i) => setUserChannels(i)}
                        setDisplayUserChannelsModal={(i) =>
                            setDisplayUserChannelsModal(i)
                        }
                    />

                    <Users
                        UserHeaders={UserHeaders}
                        DisplayChat={DisplayChat}
                        DisplayUsers={DisplayUsers}
                        setDisplayChat={(i) => setDisplayChat(i)}
                        setDisplayChatName={(i) => setDisplayChatName(i)}
                        setDisplayChatID={(i) => setDisplayChatID(i)}
                        setDisplayChatClass={(i) => setDisplayChatClass(i)}
                        setDisplayLeftPanel={(i) => setDisplayLeftPanel(i)}
                        setDisplayUsers={(i) => setDisplayUsers(i)}
                        setDisplayUsersModal={(i) => setDisplayUsersModal(i)}
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

            <div
                className={
                    DisplayRightPanel
                        ? "HomeRightPanel ShowRightPanel"
                        : "HomeRightPanel"
                }
            >
                <ChatInfo
                    DisplayChatName={DisplayChatName}
                    DisplayChatID={DisplayChatID}
                    DisplayChatClass={DisplayChatClass}
                    AllUsers={AllUsers}
                    ChannelMembers={ChannelMembers}
                    Fun={Fun}
                    setDisplayChatInfoModal={(i) => setDisplayChatInfoModal(i)}
                />

                <Logout
                    Fun={Fun}
                    setDisplayLoading={(i) => setDisplayLoading(i)}
                    setUserData={(i) => setUserData(i)}
                    setUserHeaders={(i) => setUserHeaders(i)}
                    setFun={(i) => setFun(i)}
                />
            </div>

            <UsersModal
                UserData={UserData}
                AllUsers={AllUsers}
                DisplayUsers={DisplayUsers}
                DisplayUsersModal={DisplayUsersModal}
                setMessage={(i) => setMessage(i)}
                setSuccess={(i) => setSuccess(i)}
                setError={(i) => setError(i)}
                setDisplayUsers={(i) => setDisplayUsers(i)}
                setDisplayUsersModal={(i) => setDisplayUsersModal(i)}
            />

            <ChannelsModal
                UserHeaders={UserHeaders}
                DisplayUserChannelsModal={DisplayUserChannelsModal}
                setMessage={(i) => setMessage(i)}
                setSuccess={(i) => setSuccess(i)}
                setError={(i) => setError(i)}
                setUserChannels={(i) => setUserChannels(i)}
                setDisplayUserChannelsModal={(i) =>
                    setDisplayUserChannelsModal(i)
                }
            />

            <ChatInfoModal
                UserHeaders={UserHeaders}
                AllUsers={AllUsers}
                DisplayChatName={DisplayChatName}
                DisplayChatID={DisplayChatID}
                DisplayChatInfoModal={DisplayChatInfoModal}
                ChannelMembers={ChannelMembers}
                setChannelMembers={(i) => setChannelMembers(i)}
                setMessage={(i) => setMessage(i)}
                setSuccess={(i) => setSuccess(i)}
                setError={(i) => setError(i)}
                setDisplayChatInfoModal={(i) => setDisplayChatInfoModal(i)}
            />

            <LeftToggle
                DisplayLeftPanel={DisplayLeftPanel}
                DisplayRightPanel={DisplayRightPanel}
                setDisplayLeftPanel={(i) => setDisplayLeftPanel(i)}
            />
            <RightToggle
                DisplayLeftPanel={DisplayLeftPanel}
                DisplayRightPanel={DisplayRightPanel}
                setDisplayRightPanel={(i) => setDisplayRightPanel(i)}
            />
        </div>
    );
}
