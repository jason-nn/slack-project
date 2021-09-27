import React, { useState } from "react";
import Logout from "./Logout";
import Channels from "./Channels";
import Users from "./Users";
import Chat from "./Chat";

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

    return (
        <>
            <div>access-token</div>
            <div>{UserHeaders["access-token"]}</div>

            <br />

            <div>expiry</div>
            <div>{UserHeaders.expiry}</div>

            <br />

            <div>client</div>
            <div>{UserHeaders.client}</div>

            <br />

            <div>uid</div>
            <div>{UserData.uid}</div>

            <br />

            <div>id</div>
            <div>{UserData.id}</div>

            <br />
            <div>------------------------------</div>
            <br />

            <Channels
                UserData={UserData}
                UserHeaders={UserHeaders}
                setDisplayChat={(i) => setDisplayChat(i)}
                setDisplayChatName={(i) => setDisplayChatName(i)}
                setDisplayChatID={(i) => setDisplayChatID(i)}
                setDisplayChatClass={(i) => setDisplayChatClass(i)}
                DisplayChat={DisplayChat}
            />

            <br />
            <div>------------------------------</div>
            <br />

            <Users
                UserData={UserData}
                UserHeaders={UserHeaders}
                setDisplayChat={(i) => setDisplayChat(i)}
                setDisplayChatName={(i) => setDisplayChatName(i)}
                setMessage={(i) => setMessage(i)}
                setSuccess={(i) => setSuccess(i)}
                setError={(i) => setError(i)}
                setDisplayChatID={(i) => setDisplayChatID(i)}
                setDisplayChatClass={(i) => setDisplayChatClass(i)}
                DisplayChat={DisplayChat}
            />

            <br />
            <div>------------------------------</div>
            <br />

            <Chat
                UserData={UserData}
                UserHeaders={UserHeaders}
                DisplayChat={DisplayChat}
                DisplayChatName={DisplayChatName}
                DisplayChatID={DisplayChatID}
                UserHeaders={UserHeaders}
                DisplayChatClass={DisplayChatClass}
                setDisplayChat={(i) => setDisplayChat(i)}
            />

            <br />
            <div>------------------------------</div>
            <br />

            <Logout
                setUserData={(i) => setUserData(i)}
                setUserHeaders={(i) => setUserHeaders(i)}
                setDisplayLoading={(i) => setDisplayLoading(i)}
            />
        </>
    );
}
