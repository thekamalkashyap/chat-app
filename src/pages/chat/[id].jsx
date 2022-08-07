import ChatScreen from '../../components/ChatScreen.jsx';
import { database } from '../../../firebase';
import {
  doc,
  query,
  collection,
  orderBy,
  limit,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export default function Id({ messages, chat }) {
  return (
    <div className="m-7">
      <ChatScreen chat={chat} messages={messages} />
    </div>
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
      timestamp: Timestamp.now(),
    }));

  const chatResponse = await getDoc(ref);
  const chat = {
    id: chatResponse.id,
    ...chatResponse.data(),
  };

  console.log(chat);
  if (messagesResponse && messages) {
    console.log(messages);
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
