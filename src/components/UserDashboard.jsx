import Search from './Search';
import Chat from './Chat';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { database } from '../../firebase';
import { useAuth } from '../context/AuthContext';

function UserDashboard() {
  const { currentUser } = useAuth();
  const [inputEmail, setInputEmail] = useState();
  const [snapShot, setSnapShot] = useState();

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
      />
      <div className="mt-10">
        {snapShot &&
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
      </div>
    </>
  );
}

export default UserDashboard;
