import { useRouter } from 'next/router';
import { database } from '../../firebase';
import Message from './Message';
import { useState } from 'react';
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  Timestamp,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Timeago from 'timeago-react';

export default function ChatScreen({ messages, chat }) {
  const [input, setInput] = useState('');
  const { currentUser } = useAuth();
  const [recipientEmail, setRecipientEmail] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const router = useRouter();
  const [messagesSnapShot, setMessagesSnapShot] = useState('');
  const [scroll, setScroll] = useState('');

  useEffect(() => {
    if (currentUser) {
      setRecipientEmail(chat.users.filter((u) => u != currentUser.email)[0]);
    }
  }, [currentUser, recipientEmail]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scroll]);

  const messagesQuery = query(
    collection(database, 'chats', `${router.query.id}`, 'messages'),
    orderBy('timestamp', 'asc')
  );

  onSnapshot(messagesQuery, (querySnapshot) => {
    setMessagesSnapShot(querySnapshot);
    if (querySnapshot.docs.length != 0 && scroll != querySnapshot.docs.length) {
      setScroll(querySnapshot.docs.length);
    }
  });

  const recipientQuery = query(
    collection(database, 'users'),
    where('email', '==', `${recipientEmail}`)
  );

  onSnapshot(recipientQuery, (querySnapshot) => {
    if (querySnapshot.docs.length != 0) {
      setRecipient(querySnapshot.docs[0].data());
    }
  });

  const sendMessage = async () => {
    await setDoc(
      doc(database, 'users', currentUser.email),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    await setDoc(
      doc(
        database,
        'chats',
        `${router.query.id}`,
        'messages',
        `${currentUser.email}-${Timestamp.now().nanoseconds}`
      ),
      {
        timestamp: serverTimestamp(),
        message: input,
        user: currentUser.email,
        photoURL: currentUser.photoURL,
      }
    ).catch((err) => alert(err.message));

    setInput('');
  };

  const scrollToBottom = () => {
    let element = document.getElementById('messages');
    element.scrollTop = element.scrollHeight;
  };

  return (
    <>
      <div className="chatName flex items-center ">
        <div className=" h-9 w-9 sm:h-12 sm:w-12 mx-3 relative">
          {recipient && (
            <Image
              src={recipient.photoURL}
              alt={recipient.name[0]}
              layout="fill"
              className=" rounded-full"
              loading="lazy"
            />
          )}
        </div>
        <div>
          {recipient && <h1>{recipient.name}</h1>}
          {recipient ? (
            <p>
              Last seen:{' '}
              {recipient.lastSeen ? (
                <span>
                  <Timeago datetime={recipient.lastSeen.toDate()} />
                </span>
              ) : (
                'Unavailable'
              )}
            </p>
          ) : (
            <p>Loading last seen...</p>
          )}
        </div>
      </div>

      <div id="messages" className="messages ">
        {messagesSnapShot && messagesSnapShot.docs.length != 0
          ? messagesSnapShot.docs.map((message) => (
              <Message
                key={message.id}
                user={message.data().user}
                message={{
                  ...message.data(),
                  timestamp: message.data().timestamp,
                }}
              />
            ))
          : JSON.parse(messages).map((message) => (
              <Message key={message.id} user={message.user} message={message} />
            ))}
        {messagesSnapShot && messagesSnapShot.docs.length == 0 && (
          <div className=" h-full flex justify-center items-center">
            No chat Found
          </div>
        )}
        {!messagesSnapShot && (
          <div className=" flex h-full justify-center items-center">
            loading...
          </div>
        )}
      </div>

      <div className="inputMessages border rounded-lg">
        <input
          value={input}
          className=" bg-transparent focus:outline-none px-2 w-full mr-1"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == 'Enter' && input) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          disabled={!input}
          className=" border-l px-1 disabled:opacity-50"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
}
