import ChatScreen from '../../components/ChatScreen.jsx';
import { database } from '../../../firebase';
import {
  doc,
  query,
  collection,
  orderBy,
  getDocs,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import Router from 'next/router.js';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.js';

export default function Id({ messages, chat }) {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      Router.replace('/');
    }
  }, [currentUser]);

  return (
    <>
      <ChatScreen chat={chat} messages={messages} />
    </>
  );
}

export async function getServerSideProps(context) {
  const ref = doc(database, 'chats', `${context.query.id}`);
  const q = query(collection(ref, 'messages'), orderBy('timestamp', 'asc'));

  const messagesResponse = await getDocs(q);

  const messages = messagesResponse.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: serverTimestamp(),
    }));

  const chatResponse = await getDoc(ref);
  const chat = {
    id: chatResponse.id,
    ...chatResponse.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
