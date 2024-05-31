import React from 'react';
import { generateImage } from '../../Utilities/ImageGenerator';

export default function ChannelMember({ data, AllUsers }) {
  const ids = AllUsers.map((User) => User.id);

  function convertToEmail(user_id) {
    const index = ids.findIndex((id) => id === user_id);
    return AllUsers[index].email;
  }

  return (
    <div className="ChannelMember">
      <div>
        <img
          className="ChannelMemberImage"
          src={generateImage(data['user_id'], 'User')}
          alt="avatar"
        />
      </div>
      <div className="ChannelMemberName">{convertToEmail(data['user_id'])}</div>
    </div>
  );
}
