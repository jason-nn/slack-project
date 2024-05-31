import React, { useState, useEffect } from 'react';
import SearchResult from '../Shared/SearchResult';

export default function UsersModal({
  UserData,
  AllUsers,
  DisplayUsers,
  DisplayUsersModal,
  setMessage,
  setSuccess,
  setError,
  setDisplayUsers,
  setDisplayUsersModal,
}) {
  const [UserInput, setUserInput] = useState('');
  const [FilteredUsers, setFilteredUsers] = useState(null);

  useEffect(() => {
    if (AllUsers)
      setFilteredUsers(AllUsers.filter((User) => User.uid.includes(UserInput)));
  }, [UserInput, AllUsers]);

  function renderSearchResults() {
    const output = [];

    for (let i = 0; i < FilteredUsers?.length; i++) {
      output.push(
        <SearchResult
          key={FilteredUsers[i].id}
          data={FilteredUsers[i]}
          setUserInput={(i) => {
            setUserInput(i);
          }}
        />
      );
    }
    return output;
  }

  return (
    <>
      {DisplayUsersModal ? (
        <div className="Modal">
          <div>
            <button
              onClick={() => {
                setDisplayUsersModal(false);
                setUserInput('');
              }}
              className="CloseModal"
            >
              Close
            </button>

            <div className="ChatName">Add a new user</div>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                const addUser = UserInput;
                const uids = AllUsers.map((User) => User.uid);
                const index = uids.findIndex((uid) => uid === addUser);

                if (index > -1) {
                  const newUser = AllUsers[index];

                  const ids = DisplayUsers.map((User) => User.id);
                  const index2 = ids.findIndex((id) => id === newUser.id);

                  if (newUser.id === UserData.id) {
                    setMessage(null);
                    setSuccess(null);
                    setError('Cannot add yourself');
                    setTimeout(() => {
                      setError(null);
                    }, 2000);
                    return;
                  }

                  if (index2 === -1) {
                    setDisplayUsersModal(false);
                    const DisplayUsersCopy = [...DisplayUsers];
                    DisplayUsersCopy.unshift(newUser);
                    // DisplayUsersCopy.pop();
                    setDisplayUsers(DisplayUsersCopy);
                    localStorage.DisplayUsers =
                      JSON.stringify(DisplayUsersCopy);
                    setUserInput('');
                    setMessage(null);
                    setSuccess('Added ' + newUser.uid);
                    setError(null);
                    setTimeout(() => {
                      setSuccess(null);
                    }, 2000);
                  } else {
                    setMessage(null);
                    setSuccess(null);
                    setError('User already displayed');
                    setTimeout(() => {
                      setError(null);
                    }, 2000);
                  }
                } else {
                  setMessage(null);
                  setSuccess(null);
                  setError('User does not exist');
                  setTimeout(() => {
                    setError(null);
                  }, 2000);
                }
              }}
            >
              <input
                type="text"
                value={UserInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
                placeholder="jason@bubble.com"
              />
              <button>Add</button>
            </form>

            <div className="SearchResults">
              {FilteredUsers ? renderSearchResults() : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
