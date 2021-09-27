import React from "react";

export default function ChannelMember({ data, AllUsers }) {
    const ids = AllUsers.map((User) => User.id);

    function convertToEmail(user_id) {
        const index = ids.findIndex((id) => id === user_id);
        return AllUsers[index].email;
    }

    return (
        <>
            <div>{convertToEmail(data["user_id"])}</div>
        </>
    );
}
