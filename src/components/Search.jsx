import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { database } from '../../firebase';
import { getDoc, setDoc, doc } from 'firebase/firestore';

function Search({ email, setEmail, currentUser }) {
  const handelSubmit = async () => {
    const addChat = async () => {
      await setDoc(doc(database, 'chats', `${currentUser.email}-${email}`), {
        users: [currentUser.email, email],
      });
    };
    await getDoc(doc(database, 'users', `${email.trim()}`)).then((contact) => {
      if (contact.exists() && contact.data().email != currentUser.email) {
        let cnfrm = confirm(
          `Do you want to start the conversation with ${
            contact.data().email
          } (${contact.data().name}) `
        );
        if (cnfrm) {
          addChat();
        }
      } else if (contact.data().email == currentUser.email) {
        alert('You cant start chat with yourself');
      } else {
        alert('User not found!');
      }
    });
  };

  return (
    <>
      <div className="flex border mx-3 p-1 rounded-full">
        <button
          onClick={handelSubmit}
          disabled={email ? false : true}
          className=" disabled:opacity-60 ml-2 "
        >
          <SearchIcon className="w-5 h-5 mr-3" />
        </button>
        <input
          type="email"
          value={email}
          placeholder="Search user email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="px-3 w-full rounded-full bg-transparent"
        />
      </div>
    </>
  );
}

export default Search;
