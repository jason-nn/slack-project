# Slack Project

<br/>

## Installation

```
git clone git@github.com:jason-nn/slack-project.git
```

```
cd slack-project
```

```
npm install
```

```
npm start
```

<br/>

## Deployment

```
npm run deploy
```

## Demo

https://jason-nn.github.io/slack-project/

<br/>

## Sample Credentials\*

email: bubble@bubble.com
<br/>
password: bubble123
<br/>
<br/> \*_for the purpose of viewing what full chats would look like and testing the scroll feature without having to send multiple messages_
</br> \*_please do not send new messages with this account_

<br/>

## Features

### Main Features

- User is able to create account with email and password
- User is able to login with credentials
- User is able to create new channel
- User is able to add users to a channel
- User is able to send message to another user
- User is able to send message to a channel
- User is able to receive messages from other users
- User is able to receive messages from channels

<br/>

### Extra Features

- User is able to save credentials to local storage if _keep me logged in_ is checked on login
- Chat is scrolled down to latest message when channel or user is selected, when new message is sent, and when the scroll down button is clicked
- Scroll down button that appears if user is not viewing the latest chat messages
- User channels are polled so if a user is invited to a channel from another client, the channel will show up on the left panel
- Last messages for every channel and user on the left panel
- Last messages are polled so if a user sends you a new message from another client, you will see the new message under the channel or user name in the left panel
- Users added are saved in local storage
- Fully responsive, mobile view can be seen either by inspecting or viewing on a mobile phone
- Fun toggle on right panel when user chat is selected, allows you to switch between the default background color and a carousel of the user's profile picture :D
- Search all users when inviting a user to a channel or adding a user

<br/>

### Caveats

- Chat is not polled as there were bugs that occurred where the previously selected chat was persisting, which means if a user or channel sends you a new message, you will be able to see it on the left panel with the last message preview but will be unable to see it in the chat middle panel unless you click the user or channel again, or alternatively send a new message
- Channel members are not polled as a similar bug occurred where channel members of the previously selected channel were persisting, updated channel members can currently be seen once the channel is clicked again or if a new message is sent in the channel
