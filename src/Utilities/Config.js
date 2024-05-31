export const Config = {
  SignIn: (data) => {
    return {
      method: 'post',
      url: 'auth/sign_in',
      data: data,
    };
  },

  GetAllUsers: (UserHeaders) => {
    return {
      method: 'get',
      url: 'users',
      headers: {
        'access-token': UserHeaders['access-token'],
        client: UserHeaders.client,
        expiry: UserHeaders.expiry,
        uid: UserHeaders.uid,
      },
    };
  },

  GetAllChannels: (UserHeaders) => {
    return {
      method: 'get',
      url: 'channels',
      headers: {
        'access-token': UserHeaders['access-token'],
        client: UserHeaders.client,
        expiry: UserHeaders.expiry,
        uid: UserHeaders.uid,
      },
    };
  },

  GetMessages: (ID, Class, UserHeaders) => {
    return {
      method: 'get',
      url: 'messages?receiver_id=' + ID + '&receiver_class=' + Class,
      headers: {
        'access-token': UserHeaders['access-token'],
        client: UserHeaders.client,
        expiry: UserHeaders.expiry,
        uid: UserHeaders.uid,
      },
    };
  },

  GetChannelMembers: (ID, UserHeaders) => {
    return {
      method: 'get',
      url: 'channels/' + ID,
      headers: {
        'access-token': UserHeaders['access-token'],
        client: UserHeaders.client,
        expiry: UserHeaders.expiry,
        uid: UserHeaders.uid,
      },
    };
  },

  PostNewChannel: (data, UserHeaders) => {
    return {
      method: 'post',
      url: 'channels',
      headers: {
        'access-token': UserHeaders['access-token'],
        client: UserHeaders.client,
        expiry: UserHeaders.expiry,
        uid: UserHeaders.uid,
      },
      data: data,
    };
  },

  PostNewMessage: (data, UserHeaders) => {
    return {
      method: 'post',
      url: 'messages',
      headers: {
        'access-token': UserHeaders['access-token'],
        client: UserHeaders.client,
        expiry: UserHeaders.expiry,
        uid: UserHeaders.uid,
      },
      data: data,
    };
  },

  PostAddMember: (data, UserHeaders) => {
    return {
      method: 'post',
      url: 'channel/add_member',
      headers: {
        'access-token': UserHeaders['access-token'],
        client: UserHeaders.client,
        expiry: UserHeaders.expiry,
        uid: UserHeaders.uid,
      },
      data: data,
    };
  },
};
