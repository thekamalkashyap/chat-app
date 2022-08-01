import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { database } from '../../firebase';
import { useAuth } from '../context/AuthContext';

function Chats() {
  const { currentUser } = useAuth();
  const chats = async () => {
    const docRef = collection(database, 'chats');
    const q = query(
      docRef,
      where('users', 'array-contains', `${currentUser.email}`)
    );
    const getChats = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.warn(doc.data());
      });
    };
    getChats();
  };
  chats();

  return <></>;
}

export default Chats;
