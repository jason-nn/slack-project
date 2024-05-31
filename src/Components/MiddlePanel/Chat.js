import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import ChatDate from './ChatDate';
import { Config } from '../../Utilities/Config';

export default function Chat({
  UserData,
  UserHeaders,
  DisplayChat,
  DisplayChatName,
  DisplayChatID,
  DisplayChatClass,
  DisplayScrollButton,
  setDisplayChat,
}) {
  function renderChat() {
    if (DisplayChat.length) {
      const output = [];

      let date = null;

      for (let i = 0; i < DisplayChat?.length; i++) {
        const messageDate = new Date(
          DisplayChat[i].created_at
        ).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        if (messageDate !== date) {
          output.push(<ChatDate key={messageDate} data={DisplayChat[i]} />);
          date = messageDate;
        }

        output.push(
          <ChatMessage
            key={DisplayChat[i].id}
            data={DisplayChat[i]}
            UserData={UserData}
          />
        );
      }

      return output;
    }
  }

  const sendMessageRef = useRef();
  const ChatMessagesEndRef = useRef(null);

  function scrollToBottom() {
    ChatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // useEffect(() => {
  //     scrollToBottom();
  // }, [DisplayChatID]);

  const [OldDisplayChat, setOldDisplayChat] = useState([]);

  useEffect(() => {
    if (JSON.stringify(DisplayChat) !== JSON.stringify(OldDisplayChat)) {
      scrollToBottom();
    }
    return () => {
      setOldDisplayChat(DisplayChat);
    };
  }, [DisplayChat]);

  return (
    <>
      <div className="ChatHeader">
        <div className="ChatName">
          {DisplayChatName ? DisplayChatName : 'No chat selected'}
        </div>
      </div>
      {/* <div>
                <i>
                    {DisplayChatClass ? DisplayChatClass : "No chat selected"}
                </i>
            </div> */}

      <div className="ChatMessages">
        {DisplayChat?.length > 0 ? (
          <>
            {renderChat()} <div ref={ChatMessagesEndRef} />
            <div
              className={
                DisplayScrollButton ? 'ScrollToBottom' : 'ScrollToBottom vanish'
              }
              onClick={() => scrollToBottom()}
            >
              &#11015;
            </div>
          </>
        ) : (
          <div className="EmptyChat">
            <div>
              {DisplayChatName ? 'No previous messages' : 'No chat selected'}
            </div>
          </div>
        )}
      </div>

      <div className="ChatInput">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const body = sendMessageRef.current.value;

            let data = {
              receiver_id: DisplayChatID,
              receiver_class: DisplayChatClass,
              body,
            };

            axios(Config.PostNewMessage(data, UserHeaders))
              .then((response) => {
                sendMessageRef.current.value = null;

                axios(
                  Config.GetMessages(
                    DisplayChatID,
                    DisplayChatClass,
                    UserHeaders
                  )
                )
                  .then((response) => {
                    setDisplayChat(response?.data?.data);
                    scrollToBottom();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <input
            type="text"
            ref={sendMessageRef}
            placeholder={DisplayChatName ? 'Message ' + DisplayChatName : null}
          />
          <button>Send</button>
        </form>
      </div>
    </>
  );
}
