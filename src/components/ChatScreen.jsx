import { useRouter } from 'next/router';
import { database } from '../../firebase';
import Message from './Message';
import { useState, useRef } from 'react';
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ChatScreen({ messages, chat }) {
  const endOfMessageRef = useRef(null);
  const [input, setInput] = useState('');
  const { currentUser } = useAuth();
  const [recipientEmail, setRecipientEmail] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const router = useRouter();
  const [messagesSnapShot, setMessagesSnapShot] = useState('');

  useEffect(() => {
    if (currentUser) {
      setRecipientEmail(chat.users.filter((u) => u != currentUser.email)[0]);
    }
  }, [currentUser, recipientEmail]);

  const messagesQuery = query(
    collection(database, 'chats', `${router.query.id}`, 'messages'),
    orderBy('timestamp', 'asc')
  );
  onSnapshot(messagesQuery, (querySnapshot) => {
    setMessagesSnapShot(querySnapshot);
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

  const sendMessage = async (e) => {
    e.preventDefault();
    await setDoc(
      doc(database, 'users', currentUser.email),
      {
        lastSeen: Timestamp.now(),
      },
      { merge: true }
    );

    await setDoc(
      collection(database, 'chats', `${router.query.id}`, 'messages'),
      {
        timestamp: Timestamp.now(),
        message: input,
        user: currentUser.email,
        photoURL: currentUser.photoURL,
      }
    );

    setInput('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <div className="flex items-center mb-12">
        <div className=" h-7 w-7 sm:h-12 sm:w-12 mx-3 relative">
          {recipient && (
            <Image
              src={recipient.photoURL}
              alt="avatar"
              layout="fill"
              className=" rounded-full"
              loading="lazy"
            />
          )}
        </div>
        <div>
          <h1>{recipientEmail}</h1>
          {recipient ? (
            <p>
              Last active:{' '}
              {recipient.lastSeen ? (
                <span>{recipient.lastSeen.seconds}</span>
              ) : (
                'Unavailable'
              )}
            </p>
          ) : (
            <p>Loading last seen...</p>
          )}
        </div>
      </div>

      <div ref={endOfMessageRef}>
        {messagesSnapShot && messagesSnapShot.docs.length != 0
          ? messagesSnapShot.docs.map((message) => (
              <Message
                key={message.id}
                user={message.data().user}
                message={{
                  ...message.data(),
                  timestamp: message.data().timestamp.now(),
                }}
              />
            ))
          : JSON.parse(messages).map((message) => (
              <Message key={message.id} user={message.user} message={message} />
            ))}
      </div>

      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button
          disabled={!input}
          className=" disabled:opacity-50"
          type="submit"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
}
