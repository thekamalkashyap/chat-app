import Login from '../components/Login';
import UserDashboard from '../components/UserDashboard';
import { useAuth } from '../context/AuthContext';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { database } from '../../firebase';
import { useEffect } from 'react';

export default function Home() {
  const { currentUser, loading } = useAuth();

  const addUser = async () => {
    await setDoc(
      doc(database, 'users', `${currentUser.email}`),
      {
        name: currentUser.displayName,
        email: currentUser.email,
        lastSeen: Timestamp.now(),
        photoURL: currentUser.photoURL,
      },
      { merge: true }
    ).catch((err) => console.warn(err.message));
  };
  useEffect(() => {
    if (currentUser) {
      addUser();
    }
  }, [currentUser]);
  return (
    <>
      {!currentUser ? <Login /> : <UserDashboard />}
      {loading && (
        <div className=" z-30 dark:bg-gray-800 fixed top-0 h-screen w-screen text-yellow-500 flex justify-center items-center">
          loading...
        </div>
      )}
    </>
  );
}
