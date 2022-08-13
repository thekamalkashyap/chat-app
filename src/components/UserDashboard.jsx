import Search from './Search';
import Chat from './Chat';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { database } from '../../firebase';
import { useAuth } from '../context/AuthContext';

function UserDashboard() {
  const { currentUser } = useAuth();
  const [inputEmail, setInputEmail] = useState('');
  const [snapShot, setSnapShot] = useState(null);

  const q = query(
    collection(database, 'chats'),
    where('users', 'array-contains', `${currentUser.email}`)
  );

  onSnapshot(q, (querySnapshot) => {
    setSnapShot(querySnapshot);
  });

  return (
    <>
      <Search
        email={inputEmail}
        setEmail={setInputEmail}
        currentUser={currentUser}
        snapShot={snapShot}
      />
      <div className=" chatlist mt-7">
        {snapShot &&
          snapShot.docs.length != 0 &&
          currentUser &&
          snapShot.docs.map((chat) => {
            return (
              <Chat
                key={chat.id}
                currentUser={currentUser}
                id={chat.id}
                users={chat.data().users}
              />
            );
          })}
        {snapShot && snapShot.docs.length == 0 && (
          <div className=" h-[70vh]  w-full flex justify-center items-center">
            No chat found
          </div>
        )}
      </div>
    </>
  );
}

export default UserDashboard;
