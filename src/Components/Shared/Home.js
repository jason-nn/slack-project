import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from './Logo';
import Channels from '../LeftPanel/Channels';
import Users from '../LeftPanel/Users';
import Chat from '../MiddlePanel/Chat';
import ChatInfo from '../RightPanel/ChatInfo';
import Logout from '../RightPanel/Logout';
import UsersModal from '../LeftPanel/UsersModal';
import ChannelsModal from '../LeftPanel/ChannelsModal';
import ChatInfoModal from '../RightPanel/ChatInfoModal';
import LeftToggle from '../Toggles/LeftToggle';
import RightToggle from '../Toggles/RightToggle';
import { Config } from '../../Utilities/Config';

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
  const [DisplayScrollButton, setDisplayScrollButton] = useState(false);

  useEffect(() => {
    axios(Config.GetAllUsers(UserHeaders))
      .then((response) => {
        setAllUsers(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const id = Number(response?.config?.url.split("=")[1].split("&")[0]);

  useEffect(() => {
    let GetAllUsersInterval = setInterval(() => {
      axios(Config.GetAllUsers(UserHeaders))
        .then((response) => {
          setAllUsers(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 3000);
    return () => {
      clearInterval(GetAllUsersInterval);
    };
  }, []);

  return (
    <div className="Home">
      <div
        className={
          DisplayLeftPanel ? 'HomeLeftPanel ShowLeftPanel' : 'HomeLeftPanel'
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
            setDisplayUserChannelsModal={(i) => setDisplayUserChannelsModal(i)}
          />

          <Users
            UserData={UserData}
            UserHeaders={UserHeaders}
            AllUsers={AllUsers}
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

      <div
        className="HomeMiddlePanel"
        onScroll={() => {
          const scrollTop =
            document.getElementsByClassName('HomeMiddlePanel')[0].scrollTop;
          const scrollHeight =
            document.getElementsByClassName('HomeMiddlePanel')[0].scrollHeight;
          const screenHeight = window.innerHeight;
          if (scrollHeight - scrollTop === screenHeight) {
            setDisplayScrollButton(false);
          } else {
            setDisplayScrollButton(true);
          }
        }}
      >
        <Chat
          UserData={UserData}
          UserHeaders={UserHeaders}
          DisplayChat={DisplayChat}
          DisplayChatName={DisplayChatName}
          DisplayChatID={DisplayChatID}
          DisplayChatClass={DisplayChatClass}
          DisplayScrollButton={DisplayScrollButton}
          setDisplayChat={(i) => setDisplayChat(i)}
        />
      </div>

      <div
        className={
          DisplayRightPanel ? 'HomeRightPanel ShowRightPanel' : 'HomeRightPanel'
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
          DisplayChatClass={DisplayChatClass}
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
        setDisplayUserChannelsModal={(i) => setDisplayUserChannelsModal(i)}
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
