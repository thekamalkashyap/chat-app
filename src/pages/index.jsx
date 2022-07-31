import Login from '../components/Login';
import UserDashboard from '../components/UserDashboard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { currentUser, loading } = useAuth();
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
